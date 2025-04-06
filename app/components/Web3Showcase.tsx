'use client';

import { useState } from 'react';
import { isValidEthereumAddress } from '../utils/web3Utils';
import GasPriceMonitor from './GasPriceMonitor';

export default function Web3Showcase() {
  const [address, setAddress] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [addressInfo, setAddressInfo] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    setIsValid(null);
    setAddressInfo(null);
    setError(null);
  };

  const checkAddress = () => {
    setError(null);
    const valid = isValidEthereumAddress(address);
    setIsValid(valid);
    
    if (!valid) {
      setError('Invalid Ethereum address format');
      return;
    }
    
    setIsLoading(true);
    
    // Call our API to get address info
    fetch(`/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Check this address: ${address}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setAddressInfo(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError('Error fetching address information');
        setIsLoading(false);
        console.error(err);
      });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Web3 Integration Demo</h2>
          <p className="text-sm text-gray-500 mb-4">
            Enter an Ethereum address to see our Web3 integration in action.
          </p>
          
          <div className="form-control">
            <div className="input-group">
              <input
                type="text"
                placeholder="0x..."
                value={address}
                onChange={handleAddressChange}
                className="input input-bordered flex-1"
              />
              <button 
                className="btn btn-primary" 
                onClick={checkAddress}
                disabled={!address || isLoading}
              >
                {isLoading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  'Check'
                )}
              </button>
            </div>
            
            {isValid === false && (
              <p className="text-error mt-2 text-sm">{error}</p>
            )}
            
            {isValid === true && addressInfo && (
              <div className="mt-4 p-4 bg-base-200 rounded-lg">
                <h3 className="font-bold mb-2">Address Details:</h3>
                <pre className="whitespace-pre-wrap text-sm overflow-x-auto">
                  {JSON.stringify(addressInfo, null, 2)}
                </pre>
              </div>
            )}
            
            <div className="divider">Try these examples</div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <button 
                className="btn btn-outline btn-sm"
                onClick={() => setAddress('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045')}
              >
                Vitalik's Address
              </button>
              <button 
                className="btn btn-outline btn-sm"
                onClick={() => setAddress('0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326')}
              >
                Uniswap Treasury
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <GasPriceMonitor />
    </div>
  );
} 