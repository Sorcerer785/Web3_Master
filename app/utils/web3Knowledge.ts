export interface KnowledgeEntry {
  topic: string;
  content: string;
  tags: string[];
}

// Knowledge base of common Web3 concepts and questions
export const web3Knowledge: KnowledgeEntry[] = [
  {
    topic: "What is Web3",
    content: 
      "Web3 refers to the vision of a decentralized internet built on blockchain technology. " +
      "Unlike Web2 (the current internet), Web3 aims to reduce reliance on centralized platforms " +
      "by empowering users with ownership of their data and digital assets through blockchain " +
      "networks, cryptocurrencies, and decentralized applications (dApps).",
    tags: ["web3", "blockchain", "decentralization", "basic"]
  },
  {
    topic: "What is a Wallet",
    content: 
      "A Web3 wallet is a digital tool that allows users to store, manage, and interact with " +
      "cryptocurrencies and blockchain-based assets. Unlike traditional wallets, Web3 wallets " +
      "store private keys that prove ownership of digital assets on the blockchain. Popular " +
      "wallets include MetaMask, Trust Wallet, and Coinbase Wallet. Wallets can be custodial " +
      "(managed by a third party) or non-custodial (where you control your private keys).",
    tags: ["wallet", "metamask", "basic", "security"]
  },
  {
    topic: "Connecting Wallet",
    content: 
      "To connect your wallet to a dApp (decentralized application), follow these steps: " +
      "1. Install a Web3 wallet like MetaMask as a browser extension or mobile app. " +
      "2. Set up your wallet by creating a new account or importing an existing one. " +
      "3. Visit the dApp website and find a 'Connect Wallet' button. " +
      "4. Click this button and select your wallet from the options. " +
      "5. Approve the connection request in your wallet. " +
      "Always verify you're on the correct website before connecting to avoid phishing attacks.",
    tags: ["wallet", "connection", "dapp", "metamask", "basic"]
  },
  {
    topic: "Gas Fees",
    content: 
      "Gas fees are payments made by users to compensate for the computing energy required to " +
      "process and validate transactions on the Ethereum blockchain. They are paid in Ether (ETH) " +
      "and consist of a base fee (burned) and a priority fee (tip to validators). Gas fees vary " +
      "based on network congestion—when many people use the network simultaneously, fees increase. " +
      "To reduce gas costs, consider transacting during periods of low network activity or using " +
      "Layer 2 scaling solutions like Optimism or Arbitrum.",
    tags: ["gas", "fees", "ethereum", "transactions", "intermediate"]
  },
  {
    topic: "Smart Contracts",
    content: 
      "Smart contracts are self-executing programs stored on a blockchain that run when predetermined " +
      "conditions are met. They automate agreements so that all participants can be immediately certain " +
      "of the outcome, without any intermediary's involvement. Smart contracts are used for creating " +
      "tokens, developing decentralized applications (dApps), establishing governance systems, and " +
      "automating financial transactions. They're primarily written in languages like Solidity (Ethereum) " +
      "or Rust (Solana) and are immutable once deployed to the blockchain.",
    tags: ["smart contracts", "automation", "dapps", "intermediate"]
  },
  {
    topic: "NFTs",
    content: 
      "Non-Fungible Tokens (NFTs) are unique digital assets that represent ownership of specific items " +
      "on the blockchain. Unlike cryptocurrencies such as Bitcoin or Ethereum, each NFT has distinct " +
      "properties that make it non-interchangeable. NFTs are commonly used for digital art, collectibles, " +
      "gaming items, and access passes. They provide proof of authenticity and ownership through blockchain " +
      "technology. To buy or sell NFTs, you typically need a wallet compatible with the blockchain they're " +
      "built on and access to an NFT marketplace like OpenSea, Magic Eden, or Rarible.",
    tags: ["nft", "collectibles", "digital art", "ownership", "intermediate"]
  },
  {
    topic: "DeFi",
    content: 
      "Decentralized Finance (DeFi) refers to financial services built on blockchain technology that " +
      "operate without centralized intermediaries like banks. DeFi applications enable users to lend, " +
      "borrow, trade, earn interest, and more—all through smart contracts. Popular DeFi activities " +
      "include providing liquidity to decentralized exchanges (DEXs), yield farming, staking, and " +
      "taking out collateralized loans. Major DeFi platforms include Uniswap, Aave, Compound, and " +
      "MakerDAO. While DeFi offers financial inclusion and innovation, it carries risks including " +
      "smart contract vulnerabilities, market volatility, and impermanent loss.",
    tags: ["defi", "finance", "lending", "staking", "advanced"]
  },
  {
    topic: "Common Security Issues",
    content: 
      "Common Web3 security concerns include: " +
      "1. Phishing attacks - Fake websites or communications that trick users into sharing wallet keys or approving malicious transactions. " +
      "2. Smart contract vulnerabilities - Code flaws that can be exploited to drain funds. " +
      "3. Rug pulls - When developers abandon a project and take investor funds. " +
      "4. Seed phrase theft - When your wallet recovery phrase is compromised. " +
      "5. Approval exploits - When users give unlimited token approvals to potentially malicious contracts. " +
      "Always verify website URLs, use hardware wallets for large holdings, research projects thoroughly, " +
      "never share your seed phrase, and regularly review token approvals on tools like Revoke.cash.",
    tags: ["security", "phishing", "scams", "protection", "intermediate"]
  },
  {
    topic: "Governance",
    content: 
      "Web3 governance refers to the decision-making processes in decentralized protocols. It typically " +
      "involves token holders voting on proposals that affect the protocol's development and operations. " +
      "Governance mechanisms vary across projects but often include on-chain voting where votes are " +
      "weighted by token holdings. Governance tokens grant holders voting rights, and Decentralized " +
      "Autonomous Organizations (DAOs) are organizations governed by smart contracts and community " +
      "voting. Popular governance systems include Compound's Governor Bravo, Snapshot for off-chain " +
      "voting, and Tally for governance management.",
    tags: ["governance", "dao", "voting", "advanced"]
  },
  {
    topic: "Layer 2 Solutions",
    content: 
      "Layer 2 (L2) solutions are scaling technologies built on top of blockchain networks (Layer 1) " +
      "that improve transaction speed and reduce costs. They process transactions off the main chain " +
      "while inheriting the security of the underlying blockchain. Major types include: " +
      "1. Rollups (like Optimism and Arbitrum) that execute transactions off-chain but post data to Ethereum. " +
      "2. State channels that enable off-chain transactions between participants. " +
      "3. Sidechains that run parallel to the main blockchain with their own consensus mechanisms. " +
      "L2s help address blockchain scalability limitations by increasing throughput while maintaining " +
      "decentralization and security.",
    tags: ["layer2", "scaling", "rollups", "optimism", "arbitrum", "advanced"]
  }
];

// Function to search the knowledge base for relevant entries
export function searchKnowledge(query: string): KnowledgeEntry[] {
  const normalizedQuery = query.toLowerCase();
  
  // Score each knowledge entry based on relevance to the query
  const scoredEntries = web3Knowledge.map(entry => {
    // Check for exact topic match (highest priority)
    if (entry.topic.toLowerCase() === normalizedQuery) {
      return { entry, score: 100 };
    }
    
    // Check if query is contained in topic
    if (entry.topic.toLowerCase().includes(normalizedQuery)) {
      return { entry, score: 50 };
    }
    
    // Check for tag matches
    const tagMatches = entry.tags.filter(tag => 
      normalizedQuery.includes(tag) || tag.includes(normalizedQuery)
    ).length;
    
    // Check for content keyword matches
    const contentMatches = entry.content.toLowerCase().split(' ').filter(word => 
      normalizedQuery.includes(word) && word.length > 3
    ).length;
    
    // Calculate final score
    const score = (tagMatches * 10) + (contentMatches * 2);
    
    return { entry, score };
  });
  
  // Sort by score and return the top 3 most relevant entries
  return scoredEntries
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(item => item.entry);
} 