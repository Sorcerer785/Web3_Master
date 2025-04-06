import { OpenAI } from 'openai';
import { NextRequest, NextResponse } from 'next/server';
import { searchKnowledge } from '@/app/utils/web3Knowledge';
import { getAddressInfo, getGasPrices, isValidEthereumAddress } from '@/app/utils/web3Utils';

// Initialize OpenAI client
// In production, use environment variables for API keys
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'YOUR_OPENAI_API_KEY',
});

// Default RPC URLs for different networks
const RPC_URLS = {
  ethereum: 'https://eth.llamarpc.com',
  polygon: 'https://polygon.llamarpc.com',
  arbitrum: 'https://arbitrum.llamarpc.com',
  optimism: 'https://optimism.llamarpc.com',
};

export async function POST(req: NextRequest) {
  try {
    const { message, history = [] } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Get relevant Web3 knowledge based on the user's query
    const relevantKnowledge = searchKnowledge(message);
    
    // Check if the query might be about checking an address
    const addressMatch = message.match(/0x[a-fA-F0-9]{40}/);
    let addressInfo = null;
    
    if (addressMatch && isValidEthereumAddress(addressMatch[0])) {
      // Get address information from the Ethereum network
      addressInfo = await getAddressInfo(
        addressMatch[0],
        RPC_URLS.ethereum
      );
    }
    
    // Check if the query is about gas prices
    const gasInfo = message.toLowerCase().includes('gas') || 
                    message.toLowerCase().includes('fee') ? 
                    await getGasPrices(RPC_URLS.ethereum) : null;

    // Prepare context from Web3 knowledge base
    const knowledgeContext = relevantKnowledge.length > 0
      ? `I have the following information that might help answer the question:\n${
          relevantKnowledge.map(entry => `Topic: ${entry.topic}\n${entry.content}`).join('\n\n')
        }`
      : '';
      
    // Prepare context from blockchain data if available
    const blockchainContext = [];
    
    if (addressInfo) {
      blockchainContext.push(`Regarding the Ethereum address ${addressMatch[0]}:
      - Balance: ${addressInfo.balance} ETH`);
    }
    
    if (gasInfo) {
      blockchainContext.push(`Current Ethereum gas prices:
      - Slow: ${gasInfo.slow} Gwei
      - Average: ${gasInfo.average} Gwei
      - Fast: ${gasInfo.fast} Gwei`);
    }
    
    const combinedBlockchainContext = blockchainContext.length > 0
      ? `I also have the following real-time blockchain data:\n${blockchainContext.join('\n\n')}`
      : '';

    // Prepare the system message with instructions for the AI
    const systemMessage = {
      role: 'system',
      content: `You are PaalAI, a helpful Web3 customer support assistant that provides accurate information about blockchain, 
      cryptocurrencies, wallets, NFTs, DeFi, and other Web3 topics. Be concise, accurate, and helpful.
      
      ${knowledgeContext}
      
      ${combinedBlockchainContext}
      
      If you don't know the answer to a question, admit it rather than making up information.
      For blockchain interactions and real-time data like token prices, explain that you would need 
      to connect to the user's wallet or relevant API to provide that information.
      
      Always prioritize educating users about security best practices when relevant.`,
    };

    // Convert chat history to the format expected by OpenAI
    const formattedHistory = history.map((msg: any) => ({
      role: msg.role,
      content: msg.content,
    }));

    // Add the new user message
    const messages = [
      systemMessage,
      ...formattedHistory,
      { role: 'user', content: message },
    ];

    // Call the OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    // Extract the AI's response
    const reply = completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
} 