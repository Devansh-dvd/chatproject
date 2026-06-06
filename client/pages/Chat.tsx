import { useState, useEffect, useRef } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { SparklingBackground } from "@/components/sparkling-background";
import { ArrowLeft, Send, Users, Hash, Loader2 } from "lucide-react";
import socket from "../socketfr";

export default function Chat() {
  const { channelId } = useParams<{ channelId: string }>();
  const location = useLocation();
  const user = location.state?.user;
  const channel = location.state?.channel;

  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fetch messages + socket setup
  useEffect(() => {
    if (!channelId || !user) return;

    const loadMessages = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`http://localhost:8000/api/channel/messages/${channelId}`);
        const data = await res.json();
        setMessages(data.data || []);
      } catch (err) {
        console.log("Error fetching messages:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadMessages();
    socket.emit("join_channel", channelId);
    socket.emit("user_online", user._id);

    const onReceive = (message: any) => setMessages((prev) => [...prev, message]);
    const onTyping = ({ user: u }: { user: string }) =>
      setTypingUsers((prev) => (prev.includes(u) ? prev : [...prev, u]));
    const onStopTyping = ({ user: u }: { user: string }) =>
      setTypingUsers((prev) => prev.filter((x) => x !== u));
    const onDeleted = (id: string) =>
      setMessages((prev) => prev.filter((m) => m._id !== id));
    const onEdited = (msg: any) =>
      setMessages((prev) => prev.map((m) => (m._id === msg._id ? msg : m)));

    socket.on("receive_message", onReceive);
    socket.on("user_typing", onTyping);
    socket.on("user_stop_typing", onStopTyping);
    socket.on("message_deleted", onDeleted);
    socket.on("message_edited", onEdited);

    return () => {
      socket.emit("leave_channel", channelId);
      socket.off("receive_message", onReceive);
      socket.off("user_typing", onTyping);
      socket.off("user_stop_typing", onStopTyping);
      socket.off("message_deleted", onDeleted);
      socket.off("message_edited", onEdited);
    };
  }, [channelId]);

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim() || !user) return;
    socket.emit("send_message", {
      channelId,
      senderId: user._id,
      message: newMessage.trim(),
      messageType: "text",
    });
    socket.emit("typing_stop", { channelId, user: user.username });
    setNewMessage("");
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    if (!user) return;
    socket.emit("typing_start", { channelId, user: user.username });
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("typing_stop", { channelId, user: user.username });
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (d: string) =>
    new Date(d).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const formatDate = (d: string) => {
    const date = new Date(d);
    const today = new Date();
    const yest = new Date(today);
    yest.setDate(yest.getDate() - 1);
    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yest.toDateString()) return "Yesterday";
    return date.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" });
  };

  const isOwn = (msg: any) => msg.senderId?._id === user?._id;

  // Group messages by date
  const grouped = messages.reduce<{ date: string; msgs: any[] }[]>((acc, msg) => {
    const ds = formatDate(msg.createdAt);
    const last = acc[acc.length - 1];
    if (last && last.date === ds) last.msgs.push(msg);
    else acc.push({ date: ds, msgs: [msg] });
    return acc;
  }, []);

  // Not logged in guard
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center p-8">
          <p className="text-gray-400 text-lg mb-4">Please login first to access chat.</p>
          <Link to="/" className="px-6 py-3 rounded-lg bg-gradient-to-r from-green-400 to-green-600 text-black font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all">
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Subtle background */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <SparklingBackground />
      </div>

      {/* ── HEADER ── */}
      <header className="relative z-20 px-4 sm:px-6 py-3 border-b border-green-500/10 bg-black/70 backdrop-blur-xl flex-shrink-0">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/my-channels" state={{ user }} className="p-2 text-gray-400 hover:text-white hover:bg-green-500/10 rounded-lg transition-all duration-300">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            {channel?.profilePicture ? (
              <img src={channel.profilePicture} alt={channel.name} className="w-9 h-9 rounded-lg object-cover ring-2 ring-green-500/30" />
            ) : (
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                <Hash className="w-5 h-5 text-black" />
              </div>
            )}
            <div>
              <h1 className="text-white font-semibold text-sm sm:text-base leading-tight">{channel?.name || "Channel"}</h1>
              <p className="text-gray-500 text-xs truncate max-w-[200px] sm:max-w-xs">{channel?.description || ""}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
            <Users className="w-3.5 h-3.5 text-green-400" />
            <span className="text-green-300 text-xs font-medium">{channel?.members?.length || 0}</span>
          </div>
        </div>
      </header>

      {/* ── MESSAGES ── */}
      <div className="relative z-10 flex-1 overflow-y-auto px-4 sm:px-6 py-4">
        <div className="max-w-5xl mx-auto">
          {isLoading ? (
            <div className="flex items-center justify-center min-h-[300px]">
              <Loader2 className="w-8 h-8 text-green-400 animate-spin" />
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[300px]">
              <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mb-4 border border-green-500/20">
                <Hash className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-1">Welcome to #{channel?.name}!</h3>
              <p className="text-gray-500 text-sm text-center max-w-sm">Send a message to start the conversation.</p>
            </div>
          ) : (
            grouped.map((group) => (
              <div key={group.date}>
                {/* Date divider */}
                <div className="flex items-center gap-4 my-6">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />
                  <span className="text-[11px] text-gray-500 font-medium px-3 py-1 rounded-full bg-gray-900/80 border border-green-500/10">{group.date}</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />
                </div>

                {group.msgs.map((msg: any, idx: number) => {
                  const own = isOwn(msg);
                  const prev = idx > 0 ? group.msgs[idx - 1] : null;
                  const showHeader = !prev || prev.senderId?._id !== msg.senderId?._id ||
                    new Date(msg.createdAt).getTime() - new Date(prev.createdAt).getTime() > 300000;

                  return (
                    <div key={msg._id} className={`flex items-end gap-2.5 ${own ? "flex-row-reverse" : ""} ${showHeader ? "mt-5" : "mt-1"}`}>
                      {/* Avatar slot */}
                      <div className="w-8 flex-shrink-0">
                        {showHeader && !own && (
                          <img src={msg.senderId?.ProfilePicture} alt="" className="w-8 h-8 rounded-full object-cover ring-2 ring-green-500/20" />
                        )}
                      </div>

                      {/* Bubble */}
                      <div className={`max-w-[70%] sm:max-w-[60%]`}>
                        {showHeader && (
                          <div className={`flex items-center gap-2 mb-1 ${own ? "flex-row-reverse" : ""}`}>
                            <span className={`text-xs font-semibold ${own ? "text-green-300" : "text-green-400"}`}>
                              {own ? "You" : msg.senderId?.username}
                            </span>
                            <span className="text-[10px] text-gray-600">{formatTime(msg.createdAt)}</span>
                          </div>
                        )}
                        <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed break-words ${
                          own
                            ? "bg-gradient-to-br from-green-500 to-green-600 text-black rounded-br-md shadow-lg shadow-green-500/10"
                            : "bg-gray-800/80 text-gray-100 border border-green-500/10 rounded-bl-md"
                        }`}>
                          {msg.message}
                        </div>
                        {!showHeader && (
                          <span className={`text-[10px] text-gray-600 mt-0.5 block ${own ? "text-right" : ""}`}>
                            {formatTime(msg.createdAt)}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))
          )}

          {/* Typing indicator */}
          {typingUsers.filter((u) => u !== user.username).length > 0 && (
            <div className="flex items-center gap-2 mt-4 ml-10">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
              <span className="text-xs text-gray-500">
                {typingUsers.filter((u) => u !== user.username).join(", ")}{" "}
                {typingUsers.filter((u) => u !== user.username).length === 1 ? "is" : "are"} typing...
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* ── INPUT BAR ── */}
      <div className="relative z-20 px-4 sm:px-6 py-3 sm:py-4 border-t border-green-500/10 bg-black/70 backdrop-blur-xl flex-shrink-0">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={handleTyping}
              onKeyDown={handleKeyDown}
              placeholder={`Message #${channel?.name || "channel"}...`}
              className="w-full px-4 py-3 rounded-xl bg-gray-800/60 border border-green-500/15 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/40 focus:bg-gray-800/80 transition-all duration-300 text-sm pr-4"
            />
          </div>
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className="p-3 rounded-xl bg-gradient-to-r from-green-400 to-green-600 text-black hover:shadow-lg hover:shadow-green-500/40 transition-all duration-300 hover:scale-105 disabled:opacity-30 disabled:hover:scale-100 disabled:hover:shadow-none flex-shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
