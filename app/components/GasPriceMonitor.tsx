'use client';

import { useState, useEffect } from 'react';

interface GasPrices {
  slow: string;
  average: string;
  fast: string;
}

export default function GasPriceMonitor() {
  const [gasPrices, setGasPrices] = useState<GasPrices | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGasPrices = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'What are the current Ethereum gas prices?',
        }),
      });
      
      const data = await response.json();
      
      // Extract gas prices from AI response
      // Using individual matches instead of the 's' flag for compatibility
      const slowMatch = data.reply.match(/Slow: ([\d.]+) Gwei/);
      const averageMatch = data.reply.match(/Average: ([\d.]+) Gwei/);
      const fastMatch = data.reply.match(/Fast: ([\d.]+) Gwei/);
      
      if (slowMatch && averageMatch && fastMatch) {
        setGasPrices({
          slow: slowMatch[1],
          average: averageMatch[1],
          fast: fastMatch[1],
        });
      } else {
        setError('Unable to parse gas prices from response');
      }
    } catch (err) {
      setError('Failed to fetch gas prices');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGasPrices();
    
    // Refresh gas prices every 30 seconds
    const interval = setInterval(fetchGasPrices, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card bg-base-100 shadow-xl w-full">
      <div className="card-body p-4">
        <h2 className="card-title text-base flex justify-between">
          Ethereum Gas Prices
          <button 
            onClick={fetchGasPrices} 
            className="btn btn-ghost btn-xs"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            )}
          </button>
        </h2>
        
        {error && (
          <div className="text-error text-sm">{error}</div>
        )}
        
        {loading && !gasPrices && (
          <div className="flex justify-center py-4">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        )}
        
        {gasPrices && (
          <div className="grid grid-cols-3 gap-2 mt-2">
            <div className="stat bg-base-200 p-2 rounded-box">
              <div className="stat-title text-xs">Slow</div>
              <div className="stat-value text-lg">{gasPrices.slow}</div>
              <div className="stat-desc text-xs">Gwei</div>
            </div>
            <div className="stat bg-base-200 p-2 rounded-box">
              <div className="stat-title text-xs">Average</div>
              <div className="stat-value text-lg">{gasPrices.average}</div>
              <div className="stat-desc text-xs">Gwei</div>
            </div>
            <div className="stat bg-base-200 p-2 rounded-box">
              <div className="stat-title text-xs">Fast</div>
              <div className="stat-value text-lg">{gasPrices.fast}</div>
              <div className="stat-desc text-xs">Gwei</div>
            </div>
          </div>
        )}
        
        <div className="text-xs text-gray-500 mt-2">
          Refreshes automatically every 30s
        </div>
      </div>
    </div>
  );
} 