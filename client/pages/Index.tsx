import { SparklingBackground } from '@/components/sparkling-background';
import { Zap } from 'lucide-react';

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      <SparklingBackground />

      {/* Navbar */}
      <nav className="relative z-20 px-6 py-6 flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/50">
            <Zap className="w-6 h-6 text-black" />
          </div>
          <span className="text-2xl font-bold text-white">Spark</span>
        </div>

        {/* Nav Links */}
        <div className="flex items-center gap-8">
          <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">
            Features
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">
            Pricing
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">
            About
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">
            Docs
          </a>
        </div>

        {/* CTA Button */}
        <button className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-green-400 to-green-600 text-black font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-105">
          Get Started
        </button>
      </nav>
    </div>
  );
}
