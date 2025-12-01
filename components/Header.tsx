import { useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import {
  Menu,
  Search,
  Mic,
  Plus,
  Bell,
  User,
  PlayCircle,
  ThumbsUp,
  History,
  Clock,
  Settings,
  Info,
  LogOut,
} from "lucide-react";
import Image from "next/image";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { user, isSignedIn } = useUser();
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Get user initial for profile picture
  const getUserInitial = () => {
    if (user?.fullName) {
      return user.fullName.charAt(0).toUpperCase();
    }
    if (user?.emailAddresses?.[0]?.emailAddress) {
      return user.emailAddresses[0].emailAddress.charAt(0).toUpperCase();
    }
    return "E";
  };

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between h-14 px-4 bg-youtube-dark border-b border-gray-800">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-full hover:bg-youtube-hover"
        >
          <Menu size={24} className="text-white" />
        </button>
        <div className="flex items-center space-x-1 cursor-pointer">
          <div className="flex items-center">
            <div className="flex items-center">
              <svg
                className="h-5"
                viewBox="0 0 90 20"
                preserveAspectRatio="xMidYMid meet"
              >
                <g>
                  <path
                    fill="#FF0000"
                    d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0C14.285 0 5.35042 2.24288e-07 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C2.24288e-07 5.35042 0 10 0 10C0 10 2.24288e-07 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5701 5.35042 27.9727 3.12324Z"
                  />
                  <path
                    fill="white"
                    d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z"
                  />
                </g>
              </svg>
              <span
                className="text-white text-lg font-normal ml-1"
                style={{
                  fontFamily: "Roboto, Arial, sans-serif",
                  letterSpacing: "-0.5px",
                }}
              >
                YouTube
              </span>
            </div>
            <span className="text-[10px] text-gray-400 ml-1">AU</span>
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="flex items-center space-x-2 flex-1 max-w-2xl mx-8">
        <div className="flex flex-1 items-center">
          <div className="flex w-full relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none hidden">
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              defaultValue="phys1131 revision"
              className="w-full px-4 py-2 bg-transparent border border-gray-700 rounded-l-full focus:outline-none focus:border-blue-500 text-white text-[16px] placeholder-gray-400 ml-0"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer hover:bg-transparent">
              <span className="p-2 hover:bg-gray-800 rounded-full">
                <svg
                  viewBox="0 0 24 24"
                  preserveAspectRatio="xMidYMid meet"
                  focusable="false"
                  className="style-scope yt-icon"
                  style={{
                    pointerEvents: "none",
                    display: "block",
                    width: "24px",
                    height: "24px",
                  }}
                >
                  <g className="style-scope yt-icon">
                    <path
                      d="M12.71,12l8.15,8.15l-0.71,0.71L12,12.71l-8.15,8.15l-0.71-0.71L11.29,12L3.15,3.85l0.71-0.71L12,11.29l8.15-8.15l0.71,0.71 L12.71,12z"
                      className="style-scope yt-icon"
                      fill="white"
                    ></path>
                  </g>
                </svg>
              </span>
            </div>
          </div>
          <button className="px-5 py-2 bg-youtube-hover border border-l-0 border-gray-700 rounded-r-full hover:bg-[#3f3f3f] w-[64px] flex items-center justify-center">
            <Search
              size={24}
              className="text-white font-extralight"
              strokeWidth={1.5}
            />
          </button>
        </div>
        <button className="p-2.5 rounded-full bg-youtube-hover hover:bg-[#3f3f3f] ml-2">
          <Mic size={24} className="text-white" />
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-2">
        <button className="flex items-center space-x-2 px-3 py-1.5 rounded-full hover:bg-youtube-hover bg-transparent border border-transparent hover:border-transparent h-9">
          <div className="flex items-center pr-1">
            <Plus
              size={24}
              className="text-white font-light"
              strokeWidth={1.5}
            />
            <span className="text-white text-sm font-medium ml-1">Create</span>
          </div>
        </button>

        <button className="p-2 rounded-full hover:bg-youtube-hover relative">
          <Bell size={24} className="text-white" strokeWidth={1.5} />
          <span className="absolute top-1 right-1 bg-[#CC0000] text-[10px] text-white rounded-full w-4 h-4 flex items-center justify-center font-medium border-2 border-youtube-dark leading-none">
            1
          </span>
        </button>

        {isSignedIn ? (
          <div className="relative ml-2">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium"
            >
              E
            </button>

            {/* User Menu */}
            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-youtube-light rounded-lg shadow-xl border border-gray-700 z-50">
                <div className="p-4 border-b border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                      {getUserInitial()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">
                        {user?.fullName || "User"}
                      </h3>
                      <p className="text-xs text-gray-400">
                        {user?.emailAddresses[0]?.emailAddress}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <button className="w-full flex items-center space-x-3 p-3 rounded hover:bg-youtube-hover text-sm">
                    <PlayCircle size={20} />
                    <span>Your channel</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 rounded hover:bg-youtube-hover text-sm">
                    <ThumbsUp size={20} />
                    <span>Liked videos</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 rounded hover:bg-youtube-hover text-sm">
                    <History size={20} />
                    <span>History</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 rounded hover:bg-youtube-hover text-sm">
                    <Clock size={20} />
                    <span>Watch later</span>
                  </button>
                  <div className="border-t border-gray-700 my-2"></div>
                  <button className="w-full flex items-center space-x-3 p-3 rounded hover:bg-youtube-hover text-sm">
                    <Settings size={20} />
                    <span>Settings</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 rounded hover:bg-youtube-hover text-sm">
                    <Info size={20} />
                    <span>Help</span>
                  </button>
                  <div className="border-t border-gray-700 my-2"></div>
                  <UserButton afterSignOutUrl="/">
                    <button className="w-full flex items-center space-x-3 p-3 rounded hover:bg-youtube-hover text-red-400 text-sm">
                      <LogOut size={20} />
                      <span>Sign out</span>
                    </button>
                  </UserButton>
                </div>
              </div>
            )}
          </div>
        ) : (
          <UserButton>
            <button className="flex items-center space-x-2 px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-500/10 text-sm">
              <User size={20} />
              <span>Sign in</span>
            </button>
          </UserButton>
        )}
      </div>
    </header>
  );
}
