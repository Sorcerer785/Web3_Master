import { ethers } from 'ethers';

// Simple ERC-20 token ABI for basic operations
export const ERC20_ABI = [
  // Read-only functions
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
  'function name() view returns (string)',
  // Transfer functions
  'function transfer(address to, uint amount) returns (bool)',
  'function transferFrom(address from, address to, uint amount) returns (bool)',
  // Events
  'event Transfer(address indexed from, address indexed to, uint amount)',
];

export interface Web3Error {
  code: string;
  message: string;
}

export interface TokenInfo {
  name: string;
  symbol: string;
  decimals: number;
  balance: string;
}

/**
 * Get basic information about an Ethereum address
 */
export async function getAddressInfo(address: string, rpcUrl: string): Promise<{ 
  balance: string;
  error?: Web3Error;
}> {
  try {
    // Create a provider
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    
    // Get the Ethereum balance
    const balanceWei = await provider.getBalance(address);
    const balanceEth = ethers.formatEther(balanceWei);
    
    return { 
      balance: balanceEth,
    };
  } catch (error: any) {
    console.error("Error fetching address info:", error);
    return { 
      balance: '0',
      error: {
        code: error.code || 'UNKNOWN_ERROR',
        message: error.message || 'An unknown error occurred'
      }
    };
  }
}

/**
 * Get information about an ERC-20 token
 */
export async function getTokenInfo(
  tokenAddress: string,
  walletAddress: string,
  rpcUrl: string
): Promise<TokenInfo & { error?: Web3Error }> {
  try {
    // Create a provider and contract instance
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
    
    // Get token details
    const [name, symbol, decimals, balanceWei] = await Promise.all([
      tokenContract.name(),
      tokenContract.symbol(),
      tokenContract.decimals(),
      tokenContract.balanceOf(walletAddress)
    ]);
    
    // Format the balance
    const balance = ethers.formatUnits(balanceWei, decimals);
    
    return { name, symbol, decimals, balance };
  } catch (error: any) {
    console.error("Error fetching token info:", error);
    return { 
      name: 'Unknown',
      symbol: 'Unknown',
      decimals: 18,
      balance: '0',
      error: {
        code: error.code || 'UNKNOWN_ERROR',
        message: error.message || 'An unknown error occurred'
      }
    };
  }
}

/**
 * Helper function to validate Ethereum addresses
 */
export function isValidEthereumAddress(address: string): boolean {
  return ethers.isAddress(address);
}

/**
 * Get gas prices on the Ethereum network
 */
export async function getGasPrices(rpcUrl: string): Promise<{
  slow: string;
  average: string;
  fast: string;
  error?: Web3Error;
}> {
  try {
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const feeData = await provider.getFeeData();
    
    if (!feeData.gasPrice) {
      throw new Error('No gas price data available');
    }

    // Convert to Gwei
    const gasPriceGwei = parseFloat(ethers.formatUnits(feeData.gasPrice, 'gwei'));
    
    return {
      slow: (gasPriceGwei * 0.9).toFixed(2),
      average: gasPriceGwei.toFixed(2),
      fast: (gasPriceGwei * 1.2).toFixed(2),
    };
  } catch (error: any) {
    console.error("Error fetching gas prices:", error);
    return { 
      slow: '0',
      average: '0',
      fast: '0',
      error: {
        code: error.code || 'UNKNOWN_ERROR',
        message: error.message || 'An unknown error occurred'
      }
    };
  }
} 