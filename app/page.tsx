import Image from "next/image";
import ChatInterface from './components/ChatInterface';
import Web3Showcase from './components/Web3Showcase';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 lg:p-12 bg-gradient-to-b from-blue-950 to-black text-white">
      <header className="w-full max-w-5xl flex flex-col items-center justify-center py-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
          PaalAI - Web3 Support Agent
        </h1>
        <p className="text-lg sm:text-xl text-center max-w-2xl text-gray-300 mb-8">
          Your 24/7 automated customer support assistant for all Web3 related questions
        </p>
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          <span className="badge badge-lg badge-primary">Blockchain</span>
          <span className="badge badge-lg badge-secondary">Crypto</span>
          <span className="badge badge-lg badge-accent">NFTs</span>
          <span className="badge badge-lg badge-primary">DeFi</span>
          <span className="badge badge-lg badge-secondary">Wallets</span>
          <span className="badge badge-lg badge-accent">Security</span>
        </div>
      </header>

      <section className="w-full max-w-5xl mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ChatInterface />
          </div>
          <div className="lg:col-span-1">
            <Web3Showcase />
          </div>
        </div>
      </section>

      <footer className="w-full max-w-5xl mt-12 flex flex-col sm:flex-row items-center justify-between text-gray-400 text-sm">
        <div className="mb-4 sm:mb-0">
          <p>© 2025 PaalAI - Powered by AI & Web3</p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <a href="#" className="hover:text-white hover:underline">Terms</a>
          <a href="#" className="hover:text-white hover:underline">Privacy</a>
          <a href="#" className="hover:text-white hover:underline">GitHub</a>
        </div>
      </footer>
    </main>
  );
}
