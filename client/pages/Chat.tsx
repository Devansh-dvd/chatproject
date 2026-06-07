import { useLocation, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { SparklingBackground } from "@/components/sparkling-background";
import { ArrowLeft, Send } from "lucide-react";

export default function Chat() {
  const location = useLocation();
  const { channelId } = useParams();

  // channel comes from navigation state
  const [channel, setChannel] = useState<any>(
    location.state?.channel || null
  );

  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  // fallback fetch if page refreshed
  useEffect(() => {
    if (!channel && channelId) {
      fetch(`http://localhost:8000/api/channel/getchannel/${channelId}`)
        .then((res) => res.json())
        .then((data) => setChannel(data.data));
    }
  }, [channelId]);

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { text: input, sender: "me" },
    ]);

    setInput("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
      <SparklingBackground />

      {/* TOP BAR */}
      <div className="relative z-20 flex items-center justify-between px-6 py-4 border-b border-green-500/10 backdrop-blur-sm">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-300 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <div className="text-center">
          <h1 className="text-lg font-semibold text-white">
            {channel?.name || "Loading..."}
          </h1>
          <p className="text-xs text-gray-400">
            {channel?.members?.length || 0} members
          </p>
        </div>

        <div />
      </div>

      {/* CHAT AREA */}
      <div className="relative z-10 flex flex-col h-[calc(100vh-120px)] px-4 py-4">
        
        {/* messages */}
        <div className="flex-1 overflow-y-auto space-y-3 p-2">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[60%] p-3 rounded-xl text-sm backdrop-blur-sm
              ${
                msg.sender === "me"
                  ? "ml-auto bg-green-500/20 border border-green-500/30"
                  : "bg-gray-800/40 border border-gray-700"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* input */}
        <div className="flex items-center gap-3 mt-3 p-3 border border-green-500/20 rounded-xl bg-black/40 backdrop-blur-sm">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-transparent outline-none text-white text-sm"
          />

          <button
            onClick={sendMessage}
            className="p-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg transition"
          >
            <Send className="w-4 h-4 text-green-400" />
          </button>
        </div>
      </div>
    </div>
  );
}