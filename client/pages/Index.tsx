import { SparklingBackground } from '@/components/sparkling-background';
import { Zap, Bell, User, MoreVertical } from 'lucide-react';

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
          <span className="text-2xl font-bold text-white">chatsin</span>
        </div>


        {/* Right Side Icons */}
        <div className="flex items-center gap-4">
          {/* My Channels */}
          <a href="#" className="px-4 py-2 text-gray-300 hover:text-white hover:bg-green-500/10 rounded-lg transition-all duration-300 font-medium text-sm">
            My Channels
          </a>

          {/* Notifications */}
          <button className="relative p-2.5 text-gray-300 hover:text-white hover:bg-green-500/10 rounded-lg transition-all duration-300">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </button>

          {/* User Profile */}
          <button className="flex items-center gap-2 p-2 hover:bg-green-500/10 rounded-lg transition-all duration-300">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
              <User className="w-4 h-4 text-black" />
            </div>
            <span className="text-gray-300 text-sm font-medium">Profile</span>
          </button>

          {/* CTA Button */}
          <button className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-green-400 to-green-600 text-black font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-105">
            Get Started
          </button>
        </div>
      </nav>
    </div>
  );
}
