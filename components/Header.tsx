import { useState } from 'react';
import { UserButton, useUser } from '@clerk/nextjs';
import {
  Menu,
  Search,
  Video,
  Bell,
  User,
  PlayCircle,
  ThumbsUp,
  History,
  Clock,
  Settings,
  Info,
  LogOut
} from 'lucide-react';
import Image from 'next/image';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { user, isSignedIn } = useUser();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between h-16 px-4 bg-youtube-dark border-b border-gray-800">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-full hover:bg-youtube-hover"
        >
          <Menu size={24} />
        </button>
        <div className="flex items-center space-x-2 cursor-pointer">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png"
            alt="YouTube"
            width={90}
            height={20}
          />
        </div>
      </div>

      {/* Middle Section */}
      <div className="flex items-center space-x-4 flex-1 max-w-2xl mx-8">
        <div className="flex flex-1">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 bg-youtube-light border border-gray-700 rounded-l-full focus:outline-none focus:border-blue-500 text-white"
          />
          <button className="px-6 py-2 bg-youtube-hover border border-gray-700 rounded-r-full hover:bg-gray-700">
            <Search size={20} />
          </button>
        </div>
        <button className="p-2 rounded-full bg-youtube-hover hover:bg-gray-700">
          <Video size={24} />
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-youtube-hover relative">
          <Bell size={24} />
          <span className="absolute top-1 right-1 bg-red-600 text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
        </button>

        {isSignedIn ? (
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-1 rounded-full hover:bg-youtube-hover"
            >
              {user?.imageUrl ? (
                <img
                  src={user.imageUrl}
                  alt={user.fullName || 'User'}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-youtube-light flex items-center justify-center">
                  <User size={20} />
                </div>
              )}
            </button>

            {/* User Menu */}
            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-youtube-light rounded-lg shadow-xl border border-gray-700 z-50">
                <div className="p-4 border-b border-gray-700">
                  <div className="flex items-center space-x-3">
                    {user?.imageUrl ? (
                      <img
                        src={user.imageUrl}
                        alt={user.fullName || 'User'}
                        className="w-12 h-12 rounded-full"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-youtube-hover flex items-center justify-center">
                        <User size={24} />
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold">{user?.fullName || 'User'}</h3>
                      <p className="text-sm text-gray-400">{user?.emailAddresses[0]?.emailAddress}</p>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <button className="w-full flex items-center space-x-3 p-3 rounded hover:bg-youtube-hover">
                    <PlayCircle size={20} />
                    <span>Your channel</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 rounded hover:bg-youtube-hover">
                    <ThumbsUp size={20} />
                    <span>Liked videos</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 rounded hover:bg-youtube-hover">
                    <History size={20} />
                    <span>History</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 rounded hover:bg-youtube-hover">
                    <Clock size={20} />
                    <span>Watch later</span>
                  </button>
                  <div className="border-t border-gray-700 my-2"></div>
                  <button className="w-full flex items-center space-x-3 p-3 rounded hover:bg-youtube-hover">
                    <Settings size={20} />
                    <span>Settings</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 rounded hover:bg-youtube-hover">
                    <Info size={20} />
                    <span>Help</span>
                  </button>
                  <div className="border-t border-gray-700 my-2"></div>
                  <UserButton afterSignOutUrl="/">
                    <button className="w-full flex items-center space-x-3 p-3 rounded hover:bg-youtube-hover text-red-400">
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
            <button className="flex items-center space-x-2 px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-500/10">
              <User size={20} />
              <span>Sign in</span>
            </button>
          </UserButton>
        )}
      </div>
    </header>
  );
}
