import { SparklingBackground } from "@/components/sparkling-background";
import {
  Zap,
  Bell,
  User,
  Plus,
  LogIn,
  Clock,
  Check,
  X,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useState, useRef } from "react";

export default function Index() {
  const [isMuted, setIsMuted] = useState(true);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [profileData, setProfileData] = useState({
    username: "",
    password: "",
    profilePic: null as File | null,
    tag: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().catch(() => {
          // Autoplay may be blocked by browser policy
          console.log("Autoplay blocked by browser");
        });
      } else {
        audioRef.current.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  const handleProfileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setProfileData((prev) => ({
      ...prev,
      profilePic: file,
    }));
  };

  const handleProfileSubmit = async () => {
  if (!profileData.username || !profileData.password || !profileData.profilePic || !profileData.tag) {
    alert("All details must be filled");
    return;
  }

  const formData = new FormData();
  formData.append("username", profileData.username);
  formData.append("password", profileData.password);
  formData.append("tag", profileData.tag);
  formData.append("profilePic", profileData.profilePic!); // profilePic should be a File

  try {
    const res = await fetch("/api/users/registeruser", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log(data);
    alert("Profile submitted successfully!");
    setIsProfileModalOpen(false);
  } catch (error) {
    console.log("Error:", error);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      <SparklingBackground />

      {/* Background Music */}
      <audio
        ref={audioRef}
        loop
        src="https://cdn.builder.io/o/assets%2F3bd81cf128ad492aa0b05e212b6311e3%2F72c8f55ba0c345df82ee8e64a3039069?alt=media&token=7d2be1e4-81a4-4ff0-a3a6-8ace6ad34538&apiKey=3bd81cf128ad492aa0b05e212b6311e3"
      />

      {/* Navbar */}
      <nav className="relative z-20 px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between max-w-7xl mx-auto animate-in fade-in slide-in-from-top duration-700">
        {/* Logo */}
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/50">
            <Zap className="w-4 sm:w-6 h-4 sm:h-6 text-black" />
          </div>
          <span className="text-lg sm:text-2xl font-bold text-white">
            chatsin
          </span>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* My Channels */}
          <a
            href="#"
            className="hidden sm:inline-block px-3 sm:px-4 py-2 text-gray-300 hover:text-white hover:bg-green-500/10 rounded-lg transition-all duration-300 font-medium text-sm"
          >
            My Channels
          </a>

          {/* Notifications */}
          <button className="relative p-2.5 text-gray-300 hover:text-white hover:bg-green-500/10 rounded-lg transition-all duration-300">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </button>

          {/* Music Toggle */}
          <button
            onClick={toggleMusic}
            className={`p-2.5 rounded-lg transition-all duration-300 ${
              isMuted
                ? "text-gray-300 hover:text-white hover:bg-green-500/10"
                : "text-green-300 bg-green-500/10"
            }`}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>

          {/* User Profile */}
          <button
            onClick={() => {
              setIsProfileModalOpen(true);
            }}
            className="hidden md:flex items-center gap-2 p-2 hover:bg-green-500/10 rounded-lg transition-all duration-300"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
              <User className="w-4 h-4 text-black" />
            </div>
            <span className="text-gray-300 text-sm font-medium">Profile</span>
          </button>

          {/* CTA Button */}
          <button className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg bg-gradient-to-r from-green-400 to-green-600 text-black font-semibold text-sm sm:text-base hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-105">
            Get Started
          </button>
        </div>
      </nav>

      {/* Top Channels Section */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 animate-slide-in-up"
        style={{ animationDelay: "0.2s" }}
      >
        <div className="mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
            Top Channels
          </h2>

          {/* Channels Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4">
            {/* Channel Card 1 */}
            <div
              className="p-3 sm:p-4 rounded-lg border border-green-500/20 bg-gradient-to-br from-green-500/5 to-transparent backdrop-blur-sm hover:border-green-500/50 transition-all duration-300 group cursor-pointer animate-scale-in"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg bg-gradient-to-br from-green-400 to-green-600 mb-2 sm:mb-3 group-hover:shadow-lg group-hover:shadow-green-500/50 transition-all" />
              <h3 className="text-white font-semibold text-xs sm:text-sm mb-1">
                General
              </h3>
              <p className="text-gray-400 text-xs">1,234 members</p>
            </div>

            {/* Channel Card 2 */}
            <div
              className="p-3 sm:p-4 rounded-lg border border-green-500/20 bg-gradient-to-br from-green-500/5 to-transparent backdrop-blur-sm hover:border-green-500/50 transition-all duration-300 group cursor-pointer animate-scale-in"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 mb-2 sm:mb-3 group-hover:shadow-lg group-hover:shadow-green-500/50 transition-all" />
              <h3 className="text-white font-semibold text-xs sm:text-sm mb-1">
                Random
              </h3>
              <p className="text-gray-400 text-xs">892 members</p>
            </div>

            {/* Channel Card 3 */}
            <div
              className="p-3 sm:p-4 rounded-lg border border-green-500/20 bg-gradient-to-br from-green-500/5 to-transparent backdrop-blur-sm hover:border-green-500/50 transition-all duration-300 group cursor-pointer animate-scale-in"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg bg-gradient-to-br from-lime-400 to-lime-600 mb-2 sm:mb-3 group-hover:shadow-lg group-hover:shadow-green-500/50 transition-all" />
              <h3 className="text-white font-semibold text-xs sm:text-sm mb-1">
                Dev
              </h3>
              <p className="text-gray-400 text-xs">567 members</p>
            </div>

            {/* Channel Card 4 */}
            <div
              className="p-3 sm:p-4 rounded-lg border border-green-500/20 bg-gradient-to-br from-green-500/5 to-transparent backdrop-blur-sm hover:border-green-500/50 transition-all duration-300 group cursor-pointer animate-scale-in"
              style={{ animationDelay: "0.6s" }}
            >
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg bg-gradient-to-br from-green-300 to-green-500 mb-2 sm:mb-3 group-hover:shadow-lg group-hover:shadow-green-500/50 transition-all" />
              <h3 className="text-white font-semibold text-xs sm:text-sm mb-1">
                Gaming
              </h3>
              <p className="text-gray-400 text-xs">2,145 members</p>
            </div>

            {/* Channel Card 5 */}
            <div
              className="p-3 sm:p-4 rounded-lg border border-green-500/20 bg-gradient-to-br from-green-500/5 to-transparent backdrop-blur-sm hover:border-green-500/50 transition-all duration-300 group cursor-pointer animate-scale-in"
              style={{ animationDelay: "0.7s" }}
            >
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 mb-2 sm:mb-3 group-hover:shadow-lg group-hover:shadow-green-500/50 transition-all" />
              <h3 className="text-white font-semibold text-xs sm:text-sm mb-1">
                Music
              </h3>
              <p className="text-gray-400 text-xs">456 members</p>
            </div>
          </div>
        </div>

        {/* My Request Status */}
        <div
          className="mt-8 sm:mt-12 animate-slide-in-up"
          style={{ animationDelay: "0.8s" }}
        >
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
            My Request Status
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {/* Pending Request */}
            <div
              className="p-3 sm:p-4 rounded-lg border border-yellow-500/30 bg-yellow-500/5 backdrop-blur-sm animate-scale-in"
              style={{ animationDelay: "0.9s" }}
            >
              <div className="flex items-start justify-between mb-2 sm:mb-3">
                <div className="flex items-center gap-2 sm:gap-3 flex-1">
                  <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-300" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-white font-semibold text-xs sm:text-sm truncate">
                      Join Tech Startup
                    </h3>
                    <p className="text-yellow-300 text-xs">Pending</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-xs">
                Waiting for admin approval
              </p>
            </div>

            {/* Approved Request */}
            <div
              className="p-3 sm:p-4 rounded-lg border border-green-500/30 bg-green-500/5 backdrop-blur-sm animate-scale-in"
              style={{ animationDelay: "1s" }}
            >
              <div className="flex items-start justify-between mb-2 sm:mb-3">
                <div className="flex items-center gap-2 sm:gap-3 flex-1">
                  <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 sm:w-5 h-4 sm:h-5 text-green-300" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-white font-semibold text-xs sm:text-sm truncate">
                      Design Community
                    </h3>
                    <p className="text-green-300 text-xs">Approved</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-xs">Request was approved</p>
            </div>

            {/* Rejected Request */}
            <div
              className="p-3 sm:p-4 rounded-lg border border-red-500/30 bg-red-500/5 backdrop-blur-sm animate-scale-in"
              style={{ animationDelay: "1.1s" }}
            >
              <div className="flex items-start justify-between mb-2 sm:mb-3">
                <div className="flex items-center gap-2 sm:gap-3 flex-1">
                  <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <X className="w-4 sm:w-5 h-4 sm:h-5 text-red-300" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-white font-semibold text-xs sm:text-sm truncate">
                      Private Elite Club
                    </h3>
                    <p className="text-red-300 text-xs">Rejected</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-xs">
                Does not meet requirements
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-3 mt-8 sm:mt-10 animate-fade-in"
          style={{ animationDelay: "1.2s" }}
        >
          <button className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg border border-green-500/30 bg-green-500/10 text-green-300 font-semibold text-sm sm:text-base hover:bg-green-500/20 hover:border-green-500/50 transition-all duration-300 backdrop-blur-sm">
            <LogIn className="w-4 sm:w-5 h-4 sm:h-5" />
            Join Channel
          </button>
          <button className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-gradient-to-r from-green-400 to-green-600 text-black font-semibold text-sm sm:text-base hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-105">
            <Plus className="w-4 sm:w-5 h-4 sm:h-5" />
            Create Channel
          </button>
        </div>
      </div>

      {/* Profile Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-xl border border-green-500/30 max-w-md w-full p-6 sm:p-8 shadow-2xl shadow-green-500/20 animate-scale-in">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                {isLoginMode ? "Welcome Back" : "Complete Your Profile"}
              </h2>
              <p className="text-gray-400 text-sm">
                {isLoginMode
                  ? "Login to your account"
                  : "Add your profile information to get started"}
              </p>
            </div>

            {/* Form */}
            <div className="space-y-4 sm:space-y-5 mb-6">
              {/* Profile Picture - Only in Sign Up mode */}
              {!isLoginMode && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Profile Picture
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePicChange}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full p-3 sm:p-4 rounded-lg border-2 border-dashed border-green-500/30 hover:border-green-500/60 bg-green-500/5 hover:bg-green-500/10 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <User className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300 text-sm">
                      {profileData.profilePic
                        ? profileData.profilePic.name
                        : "Choose Image"}
                    </span>
                  </button>
                </div>
              )}

              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={profileData.username}
                  onChange={handleProfileInputChange}
                  placeholder="Enter your username"
                  className="w-full px-4 py-2.5 sm:py-3 rounded-lg bg-gray-800/50 border border-green-500/20 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:bg-gray-800/80 transition-all duration-300"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={profileData.password}
                  onChange={handleProfileInputChange}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2.5 sm:py-3 rounded-lg bg-gray-800/50 border border-green-500/20 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:bg-gray-800/80 transition-all duration-300"
                />
              </div>

              {/* Tag - Only in Sign Up mode */}
              {!isLoginMode && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tag
                  </label>
                  <input
                    type="text"
                    name="tag"
                    value={profileData.tag}
                    onChange={handleProfileInputChange}
                    placeholder="Enter your tag (e.g., @developer)"
                    className="w-full px-4 py-2.5 sm:py-3 rounded-lg bg-gray-800/50 border border-green-500/20 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:bg-gray-800/80 transition-all duration-300"
                  />
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mb-4">
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="flex-1 px-4 py-2.5 sm:py-3 rounded-lg border border-green-500/30 text-green-300 font-semibold text-sm sm:text-base hover:bg-green-500/10 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleProfileSubmit}
                className="flex-1 px-4 py-2.5 sm:py-3 rounded-lg bg-gradient-to-r from-green-400 to-green-600 text-black font-semibold text-sm sm:text-base hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-105"
              >
                Submit
              </button>
            </div>

            {/* Toggle Link */}
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                {isLoginMode ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setIsLoginMode(!isLoginMode)}
                  className="text-green-400 hover:text-green-300 font-semibold transition-colors duration-300"
                >
                  {isLoginMode ? "Sign Up" : "Login"}
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
