import { SparklingBackground } from '@/components/sparkling-background';
import { Zap, Bell, User, Plus, LogIn } from 'lucide-react';

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

      {/* Top Channels Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Top Channels</h2>

          {/* Channels Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {/* Channel Card 1 */}
            <div className="p-4 rounded-lg border border-green-500/20 bg-gradient-to-br from-green-500/5 to-transparent backdrop-blur-sm hover:border-green-500/50 transition-all duration-300 group cursor-pointer">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-400 to-green-600 mb-3 group-hover:shadow-lg group-hover:shadow-green-500/50 transition-all" />
              <h3 className="text-white font-semibold text-sm mb-1">General</h3>
              <p className="text-gray-400 text-xs">1,234 members</p>
            </div>

            {/* Channel Card 2 */}
            <div className="p-4 rounded-lg border border-green-500/20 bg-gradient-to-br from-green-500/5 to-transparent backdrop-blur-sm hover:border-green-500/50 transition-all duration-300 group cursor-pointer">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 mb-3 group-hover:shadow-lg group-hover:shadow-green-500/50 transition-all" />
              <h3 className="text-white font-semibold text-sm mb-1">Random</h3>
              <p className="text-gray-400 text-xs">892 members</p>
            </div>

            {/* Channel Card 3 */}
            <div className="p-4 rounded-lg border border-green-500/20 bg-gradient-to-br from-green-500/5 to-transparent backdrop-blur-sm hover:border-green-500/50 transition-all duration-300 group cursor-pointer">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-lime-400 to-lime-600 mb-3 group-hover:shadow-lg group-hover:shadow-green-500/50 transition-all" />
              <h3 className="text-white font-semibold text-sm mb-1">Dev</h3>
              <p className="text-gray-400 text-xs">567 members</p>
            </div>

            {/* Channel Card 4 */}
            <div className="p-4 rounded-lg border border-green-500/20 bg-gradient-to-br from-green-500/5 to-transparent backdrop-blur-sm hover:border-green-500/50 transition-all duration-300 group cursor-pointer">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-300 to-green-500 mb-3 group-hover:shadow-lg group-hover:shadow-green-500/50 transition-all" />
              <h3 className="text-white font-semibold text-sm mb-1">Gaming</h3>
              <p className="text-gray-400 text-xs">2,145 members</p>
            </div>

            {/* Channel Card 5 */}
            <div className="p-4 rounded-lg border border-green-500/20 bg-gradient-to-br from-green-500/5 to-transparent backdrop-blur-sm hover:border-green-500/50 transition-all duration-300 group cursor-pointer">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 mb-3 group-hover:shadow-lg group-hover:shadow-green-500/50 transition-all" />
              <h3 className="text-white font-semibold text-sm mb-1">Music</h3>
              <p className="text-gray-400 text-xs">456 members</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button className="flex items-center gap-2 px-6 py-3 rounded-lg border border-green-500/30 bg-green-500/10 text-green-300 font-semibold hover:bg-green-500/20 hover:border-green-500/50 transition-all duration-300 backdrop-blur-sm">
            <LogIn className="w-5 h-5" />
            Join Channel
          </button>
          <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-green-400 to-green-600 text-black font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-105">
            <Plus className="w-5 h-5" />
            Create Channel
          </button>
        </div>
      </div>
    </div>
  );
}
