import { SparklingBackground } from "@/components/sparkling-background";
import { Zap, ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";


export default function MyChannels() {
  const location = useLocation();

  const chray = location.state?.user?.channels || [];
  const [channelsData, setChannelsData] = useState<any[]>([]);

  const getchannel = async (id: string) => {
    const res = await fetch(
      `http://localhost:8000/api/channel/getchannel/${id}`
    );
    const data = await res.json();
    return data.data;
  };

  useEffect(() => {
    const fetchAll = async () => {
      const results = await Promise.all(
        chray.map((id: string) => getchannel(id))
      );
      setChannelsData(results);
      console.log(channelsData);
    };

    if (chray.length > 0) fetchAll();
  }, [chray]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      <SparklingBackground />

      {/* Navbar */}
      <nav className="relative z-20 px-6 py-6 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/50">
            <Zap className="w-6 h-6 text-black" />
          </div>
          <span className="text-2xl font-bold text-white">chatsin</span>
        </div>

        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-green-500/10 rounded-lg transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </nav>

      {/* Page Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        {/* Title */}
        <h1 className="text-3xl font-bold text-white mb-2">My Channels</h1>
        <p className="text-gray-400 mb-8">
          Your joined and created channels will appear here.
        </p>

        {/* CHANNEL GRID (FIXED) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {channelsData.length > 0 ? (
            channelsData.map((channelData: any) => (
              <Link
                to={`/chat/${channelData._id}`}
                state={{
                  user: location.state?.user,
                  channel: channelData,
                }}
                key={channelData._id}
                className="w-full p-5 rounded-xl border border-green-500/20 
                bg-gradient-to-br from-green-500/5 to-transparent backdrop-blur-sm 
                hover:border-green-500/50 transition-all duration-300
                hover:shadow-lg hover:shadow-green-500/10 hover:scale-[1.03]"
              >
                <img
                  src={channelData.profilePicture}
                  alt="group icon"
                  className="w-14 h-14 rounded-lg object-cover mb-3"
                />

                <h3 className="text-white font-semibold text-sm mb-1">
                  {channelData.name}
                </h3>

                <p className="text-gray-400 text-xs">
                  {channelData.members?.length || 0} members
                </p>

                <p className="text-gray-500 text-xs mt-2 line-clamp-2">
                  {channelData.description}
                </p>
              </Link>
            ))
          ) : (
            <p className="text-gray-500 text-sm">
              No channels yet. Join or create a channel to get started!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}