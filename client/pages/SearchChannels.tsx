import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SparklingBackground } from "@/components/sparkling-background";
import { ArrowLeft, Search, Users, LogIn, Check } from "lucide-react";


export default function SearchChannels() {
  const [query, setQuery] = useState("");
  const [channels, setChannels] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [requestedIds, setRequestedIds] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const id = localStorage.getItem("userid");
      if (!id) return;
      try {
        const res = await fetch("http://localhost:8000/api/users/currentuser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userid: id }),
        });
        const data = await res.json();
        setUser(data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  const searchChannels = async (value: string) => {
    setQuery(value);
    if (!value.trim()) {
      setChannels([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8000/api/channel/search?name=${value}&userId=${user?._id}`
      );
      const data = await res.json();
      setChannels(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const sendJoinRequest = async (channelId: string) => {
    if (!user) {
      alert("Please login first");
      return;
    }
    try {
      const res = await fetch("http://localhost:8000/api/channel/joinrequest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, channelId }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to send request");
        return;
      }
      setRequestedIds((prev) => [...prev, channelId]);
      alert("Join request sent!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
      <SparklingBackground />

      {/* TOP BAR */}
      <div className="relative z-20 flex items-center gap-4 px-6 py-4 border-b border-green-500/10 backdrop-blur-sm">
        <Link to="/" className="flex items-center gap-2 text-gray-300 hover:text-white">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
        <h1 className="text-lg font-semibold text-white">Search Channels</h1>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8">

        {/* Search Input */}
        <div className="flex items-center gap-3 p-3 border border-green-500/20 rounded-xl bg-black/40 backdrop-blur-sm mb-6">
          <Search className="w-5 h-5 text-green-400 flex-shrink-0" />
          <input
            value={query}
            onChange={(e) => searchChannels(e.target.value)}
            placeholder="Search channels by name..."
            className="flex-1 bg-transparent outline-none text-white text-sm placeholder-gray-500"
          />
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-400 text-sm">Searching...</p>
        )}

        {/* Results */}
        <div className="space-y-3">
          {channels.map((channel) => {
            const alreadyRequested = requestedIds.includes(channel._id);

            return (
              <div
                key={channel._id}
                className="flex items-center gap-4 p-4 rounded-xl border border-green-500/20 bg-green-500/5 backdrop-blur-sm"
              >
                {/* Channel Icon */}
                <img
                  src={channel.profilePicture}
                  alt={channel.name}
                  className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                />

                {/* Channel Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold text-sm truncate">{channel.name}</h3>
                  <p className="text-gray-400 text-xs truncate">{channel.description}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Users className="w-3 h-3 text-green-400" />
                    <span className="text-green-400 text-xs">{channel.members?.length || 0} members</span>
                  </div>
                </div>

                {/* Action Button */}
                {channel.isMember ? (
                  <button
                    onClick={() => navigate(`/chat/${channel._id}`)}  // ← updated
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-400 text-xs font-semibold transition"
                  >
                    <Check className="w-3 h-3" />
                    Open Chat
                  </button>
                ) : alreadyRequested ? (
                  <span className="px-3 py-1.5 rounded-lg bg-yellow-500/20 text-yellow-400 text-xs font-semibold">
                    Requested
                  </span>
                ) : (
                  <button
                    onClick={() => sendJoinRequest(channel._id)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-400 text-xs font-semibold transition"
                  >
                    <LogIn className="w-3 h-3" />
                    Join
                  </button>
                )}
              </div>
            );
          })}

          {/* No results */}
          {!loading && query && channels.length === 0 && (
            <p className="text-center text-gray-400 text-sm py-8">No channels found for "{query}"</p>
          )}

          {/* Empty state */}
          {!query && (
            <p className="text-center text-gray-400 text-sm py-8">Type a channel name to search</p>
          )}
        </div>
      </div>
    </div>
  );
}