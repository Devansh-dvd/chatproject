import { SparklingBackground } from "@/components/sparkling-background";
import { Zap, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function MyChannels() {

  const location = useLocation();

  console.log(location.state?.user); 

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      <SparklingBackground />

      {/* Navbar */}
      <nav className="relative z-20 px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between max-w-7xl mx-auto animate-in fade-in slide-in-from-top duration-700">
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/50">
            <Zap className="w-4 sm:w-6 h-4 sm:h-6 text-black" />
          </div>
          <span className="text-lg sm:text-2xl font-bold text-white">chatsin</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 sm:px-4 py-2 text-gray-300 hover:text-white hover:bg-green-500/10 rounded-lg transition-all duration-300 font-medium text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Page Title */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="animate-slide-in-up">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">My Channels</h1>
          <p className="text-gray-400 text-sm sm:text-base">Your joined and created channels will appear here.</p>
        </div>

        {/* Empty state placeholder */}
        <div className="mt-12 sm:mt-16 flex flex-col items-center justify-center animate-scale-in" style={{ animationDelay: "0.3s" }}>
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 flex items-center justify-center mb-6">
            <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-green-500/40" />
          </div>
          <p className="text-gray-500 text-sm sm:text-base text-center max-w-sm">
            No channels yet. Join or create a channel to get started!
          </p>
        </div>
      </div>
    </div>
  );
}
