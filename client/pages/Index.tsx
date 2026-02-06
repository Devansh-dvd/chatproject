import { SparklingBackground } from '@/components/sparkling-background';
import { ArrowRight, Zap, Star } from 'lucide-react';

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      <SparklingBackground />

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-6 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
            <Zap className="w-5 h-5 text-black" />
          </div>
          <span className="text-xl font-bold text-white">Spark</span>
        </div>
        <div className="flex items-center gap-8">
          <button className="text-gray-300 hover:text-white transition-colors">
            Features
          </button>
          <button className="text-gray-300 hover:text-white transition-colors">
            Pricing
          </button>
          <button className="text-gray-300 hover:text-white transition-colors">
            About
          </button>
          <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-green-400 to-green-600 text-black font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 flex flex-col items-center justify-center text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/5 mb-8 backdrop-blur-sm">
          <Star className="w-4 h-4 text-green-400" />
          <span className="text-sm text-green-300">Introducing the future</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Everything You
          <br />
          <span className="bg-gradient-to-r from-green-400 via-green-500 to-emerald-600 bg-clip-text text-transparent animate-glow">
            Need to Spark
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed">
          Experience the power of live, dynamic technology. Start your journey with a platform that sparks creativity and drives innovation forward.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4 justify-center flex-wrap mb-20">
          <button className="group px-8 py-4 rounded-lg bg-gradient-to-r from-green-400 to-green-600 text-black font-semibold flex items-center gap-2 hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105">
            Get Started Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 rounded-lg border border-green-500/30 text-white font-semibold hover:bg-green-500/5 transition-all duration-300 backdrop-blur-sm">
            Watch Demo
          </button>
        </div>

        {/* Animated Grid Background Element */}
        <div className="relative w-full max-w-4xl h-96 mb-12">
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 to-transparent rounded-2xl border border-green-500/20 backdrop-blur-sm" />
          
          {/* Animated orbs */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-green-500/20 rounded-full mix-blend-screen blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-400/15 rounded-full mix-blend-screen blur-3xl animate-pulse animation-delay-2000" />

          {/* Content inside grid */}
          <div className="relative h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-green-300 font-mono text-lg mb-4 opacity-75">
                ✨ Live & Responsive
              </div>
              <p className="text-gray-300 max-w-sm">
                Built for performance. Designed for impact.
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {[
            {
              icon: '⚡',
              title: 'Lightning Fast',
              description: 'Optimized for speed with instant load times',
            },
            {
              icon: '🎨',
              title: 'Beautiful Design',
              description: 'Modern, sleek interface that captivates',
            },
            {
              icon: '🚀',
              title: 'Scalable',
              description: 'Grows with your needs, no limits',
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="p-6 rounded-lg border border-green-500/20 bg-gradient-to-br from-green-500/5 to-transparent backdrop-blur-sm hover:border-green-500/50 transition-all duration-300 group hover:bg-green-500/10"
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-green-500/10 bg-black/50 backdrop-blur-sm mt-24">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center text-gray-500">
          <p>© 2024 Spark. Built with ✨ and green energy.</p>
        </div>
      </footer>
    </div>
  );
}
