import { SparklingBackground } from "@/components/sparkling-background";
import { Zap, ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MyChannels() {
  const location = useLocation();

  console.log(location.state?.user);
  const chray = location.state?.user?.channels || [];
  console.log(chray);

  const [channelsData, setChannelsData] = useState<any[]>([]);

  const getchannel = async (id: string) => {
    const res = await fetch(`http://localhost:8000/api/channel/getchannel/${id}`);
    const data = await res.json();
    return data.data;
  };

  useEffect(() => {
    const fetchAll = async () => {
      const results = await Promise.all(
        chray.map((id: string) => getchannel(id))
      );
      setChannelsData(results);
      console.log(results);
      console.log("Fetched all channel data");
    };

    if (chray.length > 0) fetchAll();
  }, [chray]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      <SparklingBackground />

      {/* Navbar */}
      <nav className="relative z-20 px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between max-w-7xl mx-auto animate-in fade-in slide-in-from-top duration-700">
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/50">
            <Zap className="w-4 sm:w-6 h-4 sm:h-6 text-black" />
          </div>
          <span className="text-lg sm:text-2xl font-bold text-white">
            chatsin
          </span>
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
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            My Channels
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Your joined and created channels will appear here.
          </p>
        </div>

        <div
          className="mt-12 sm:mt-16 flex flex-col items-center justify-center animate-scale-in"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="flex gap-4 overflow-x-auto">
            {channelsData.length > 0 ? (
              channelsData.map((channelData: any) => (
                <div
                  key={channelData._id}
                  className="min-w-[160px] p-3 sm:p-4 rounded-lg border border-green-500/20 
                  bg-gradient-to-br from-green-500/5 to-transparent backdrop-blur-sm 
                  hover:border-green-500/50 transition-all duration-300 group cursor-pointer"
                >
                  <img
                    src={channelData.profilePicture}
                    alt="group icon"
                    className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg object-cover mb-2 sm:mb-3"
                  />

                  <h3 className="text-white font-semibold text-xs sm:text-sm mb-1">
                    {channelData.channelname}
                  </h3>

                  <p className="text-gray-400 text-xs">
                    {channelData.members?.length || 0} members
                  </p>

                  <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                    {channelData.description}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm text-center w-full">
                No channels yet. Join or create a channel to get started!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}