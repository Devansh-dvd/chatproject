import { useLocation, useParams, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { SparklingBackground } from "@/components/sparkling-background";
import { ArrowLeft, Send, Trash2 } from "lucide-react";
import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:8000");

export default function Chat() {
  const location = useLocation();
  const { channelId } = useParams();

  const [channel, setChannel] = useState<any>(location.state?.channel || null);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [user, setUser] = useState<any>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Fetch current user
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

  // Fetch channel if refreshed
  useEffect(() => {
    if (!channel && channelId) {
      fetch(`http://localhost:8000/api/channel/getchannel/${channelId}`)
        .then((res) => res.json())
        .then((data) => setChannel(data.data));
    }
  }, [channelId]);

  // Fetch old messages + join socket room
  useEffect(() => {
    if (!channelId) return;

    // Load existing messages from DB
    fetch(`http://localhost:8000/api/messages/${channelId}`)
      .then((res) => res.json())
      .then((data) => setMessages(data.data));

    // Join the socket room for this channel
    socket.emit("join_channel", channelId);

    // Listen for incoming messages
    socket.on("receive_message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    // Handle soft delete from other users
    socket.on("message_deleted", ({ messageId }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === messageId ? { ...msg, deleted: true } : msg
        )
      );
    });

    return () => {
      socket.emit("leave_channel", channelId);
      socket.off("receive_message");
      socket.off("message_deleted");
    };
  }, [channelId]);

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim() || !user) return;

    socket.emit("send_message", {
      channelId,
      userId: user._id,
      text: input,
      messageType: "text",
    });

    setInput("");
  };

  const deleteMessage = (messageId: string) => {
    socket.emit("delete_message", {
      messageId,
      userId: user._id,
      channelId,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
      <SparklingBackground />

      {/* TOP BAR */}
      <div className="relative z-20 flex items-center justify-between px-6 py-4 border-b border-green-500/10 backdrop-blur-sm">
        <Link to="/" className="flex items-center gap-2 text-gray-300 hover:text-white">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
        <div className="text-center">
          <h1 className="text-lg font-semibold text-white">{channel?.name || "Loading..."}</h1>
          <p className="text-xs text-gray-400">{channel?.members?.length || 0} members</p>
        </div>
        <div />
      </div>

      {/* CHAT AREA */}
      <div className="relative z-10 flex flex-col h-[calc(100vh-120px)] px-4 py-4">

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-3 p-2">
          {messages.map((msg, i) => {
            const isMe = msg.senderId?._id === user?._id || msg.senderId === user?._id;
            const username = msg.senderId?.username;
            const profilePicture = msg.senderId?.ProfilePicture;

            return (
              <div
                key={i}
                className={`flex items-end gap-2 ${isMe ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full overflow-hidden border border-green-500/30 flex-shrink-0">
                  {profilePicture ? (
                    <img src={profilePicture} alt={username} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-green-500/20 flex items-center justify-center text-xs text-green-400 font-semibold">
                      {username?.[0]?.toUpperCase() || "?"}
                    </div>
                  )}
                </div>

                {/* Bubble */}
                <div
                  className={`max-w-[60%] w-fit p-3 rounded-xl text-sm backdrop-blur-sm group relative
                  ${isMe
                    ? "bg-green-500/20 border border-green-500/30"
                    : "bg-gray-800/40 border border-gray-700"
                  }`}
                >
                  <p className={`text-xs font-semibold mb-1 ${isMe ? "text-green-400 text-right" : "text-gray-400"}`}>
                    {username || "Unknown"}
                  </p>

                  {msg.deleted ? (
                    <p className="italic text-gray-500 text-xs">This message was deleted</p>
                  ) : (
                    <>
                      <p>{msg.message}</p>
                      {isMe && (
                        <button
                          onClick={() => deleteMessage(msg._id)}
                          className="absolute -top-2 -right-2 hidden group-hover:flex w-5 h-5 bg-red-500/20 hover:bg-red-500/40 border border-red-500/30 rounded-full items-center justify-center transition"
                        >
                          <Trash2 className="w-2.5 h-2.5 text-red-400" />
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="flex items-center gap-3 mt-3 p-3 border border-green-500/20 rounded-xl bg-black/40 backdrop-blur-sm">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
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