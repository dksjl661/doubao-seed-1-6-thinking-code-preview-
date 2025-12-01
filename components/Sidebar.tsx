import { useState } from "react";
import { useRouter } from "next/router";
import {
  Home,
  PlayCircle,
  ThumbsUp,
  User,
  Clock,
  History,
  ChevronDown,
} from "lucide-react";

export default function Sidebar() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("Home");
  const [showMoreSubscriptions, setShowMoreSubscriptions] = useState(false);

  const subscriptions = [
    { name: "UNSW Physics", hasNew: false },
    { name: "Theo - t3.gg", hasNew: true, id: "theo" },
    { name: "丁太升", hasNew: false },
    { name: "Web Dev Simplifi...", hasNew: true },
    { name: "Lyra", hasNew: false },
    { name: "Hayden Smith Lear...", hasNew: false },
    { name: "UNSW COMP1511", hasNew: false },
  ];

  const visibleSubscriptions = showMoreSubscriptions
    ? subscriptions
    : subscriptions.slice(0, 7);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <aside className="fixed left-0 top-14 h-[calc(100vh-3.5rem)] w-64 bg-youtube-dark border-r border-gray-800 overflow-y-auto z-10">
      {/* Main Menu */}
      <div className="p-2">
        <button
          onClick={() => handleNavigation("/")}
          className={`flex items-center space-x-4 p-3 rounded-lg w-full ${
            router.pathname === "/"
              ? "bg-youtube-hover font-medium"
              : "hover:bg-youtube-hover"
          }`}
        >
          <Home size={24} className="text-white" />
          <span className="text-sm text-white">Home</span>
        </button>
        <button
          onClick={() => setActiveSection("Shorts")}
          className={`flex items-center space-x-4 p-3 rounded-lg w-full ${
            activeSection === "Shorts"
              ? "bg-youtube-hover font-medium"
              : "hover:bg-youtube-hover"
          }`}
        >
          <PlayCircle size={24} className="text-white" />
          <span className="text-sm text-white">Shorts</span>
        </button>
      </div>

      <div className="border-t border-gray-800 my-2"></div>

      {/* Subscriptions */}
      <div className="p-2">
        <h3 className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase">
          Subscriptions
        </h3>
        {visibleSubscriptions.map((sub, index) => (
          <button
            key={index}
            onClick={() => {
              if (sub.name.includes("Theo")) {
                handleNavigation("/channel/theo");
              }
            }}
            className="flex items-center space-x-3 p-3 rounded-lg w-full hover:bg-youtube-hover"
          >
            {/* Channel Avatar Logic */}
            <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 bg-gray-700 flex items-center justify-center text-[10px] text-white font-medium">
              {sub.name.includes("UNSW") ? (
                <div className="w-full h-full bg-[#FFD700] flex items-center justify-center text-black">
                  UP
                </div>
              ) : sub.name.includes("Theo") ? (
                <div className="w-full h-full bg-purple-600 flex items-center justify-center">
                  T
                </div>
              ) : sub.name.includes("Web Dev") ? (
                <div className="w-full h-full bg-blue-500 flex items-center justify-center">
                  W
                </div>
              ) : (
                sub.name.charAt(0)
              )}
            </div>
            <span className="text-sm text-white truncate flex-1 text-left">
              {sub.name}
            </span>
            {sub.hasNew && (
              <div className="w-1 h-1 rounded-full bg-blue-500 flex-shrink-0"></div>
            )}
          </button>
        ))}
        {subscriptions.length > 7 && (
          <button
            onClick={() => setShowMoreSubscriptions(!showMoreSubscriptions)}
            className="flex items-center space-x-3 p-3 rounded-lg w-full hover:bg-youtube-hover text-sm text-gray-400"
          >
            <ChevronDown
              size={16}
              className={showMoreSubscriptions ? "rotate-180" : ""}
            />
            <span>Show {showMoreSubscriptions ? "less" : "more"}</span>
          </button>
        )}
      </div>

      <div className="border-t border-gray-800 my-2"></div>

      {/* You Section */}
      <div className="p-2">
        <h3 className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase">
          You
        </h3>
        <button
          onClick={() => setActiveSection("History")}
          className={`flex items-center space-x-4 p-3 rounded-lg w-full ${
            activeSection === "History"
              ? "bg-youtube-hover font-medium"
              : "hover:bg-youtube-hover"
          }`}
        >
          <History size={24} className="text-white" />
          <span className="text-sm text-white">History</span>
        </button>
        <button
          onClick={() => setActiveSection("Playlists")}
          className={`flex items-center space-x-4 p-3 rounded-lg w-full ${
            activeSection === "Playlists"
              ? "bg-youtube-hover font-medium"
              : "hover:bg-youtube-hover"
          }`}
        >
          <PlayCircle size={24} className="text-white" />
          <span className="text-sm text-white">Playlists</span>
        </button>
        <button
          onClick={() => setActiveSection("Watch later")}
          className={`flex items-center space-x-4 p-3 rounded-lg w-full ${
            activeSection === "Watch later"
              ? "bg-youtube-hover font-medium"
              : "hover:bg-youtube-hover"
          }`}
        >
          <Clock size={24} className="text-white" />
          <span className="text-sm text-white">Watch later</span>
        </button>
        <button
          onClick={() => setActiveSection("Liked videos")}
          className={`flex items-center space-x-4 p-3 rounded-lg w-full ${
            activeSection === "Liked videos"
              ? "bg-youtube-hover font-medium"
              : "hover:bg-youtube-hover"
          }`}
        >
          <ThumbsUp size={24} className="text-white" />
          <span className="text-sm text-white">Liked videos</span>
        </button>
      </div>
    </aside>
  );
}
