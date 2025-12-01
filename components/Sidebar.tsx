import { useState } from 'react';
import {
  Home,
  Compass,
  PlayCircle,
  ThumbsUp,
  Music,
  Gamepad2,
  Newspaper,
  Tv,
  User,
  Clock,
  History,
  TrendingUp,
  Award,
  PlusCircle
} from 'lucide-react';

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState('Home');
  const [showMore, setShowMore] = useState(false);

  const mainMenu = [
    { icon: Home, label: 'Home', id: 'Home' },
    { icon: Compass, label: 'Explore', id: 'Explore' },
    { icon: PlayCircle, label: 'Subscriptions', id: 'Subscriptions' },
  ];

  const libraryMenu = [
    { icon: History, label: 'History', id: 'History' },
    { icon: PlayCircle, label: 'Your videos', id: 'Your videos' },
    { icon: Clock, label: 'Watch later', id: 'Watch later' },
    { icon: ThumbsUp, label: 'Liked videos', id: 'Liked videos' },
  ];

  const moreMenu = [
    { icon: Music, label: 'Music', id: 'Music' },
    { icon: Gamepad2, label: 'Gaming', id: 'Gaming' },
    { icon: TrendingUp, label: 'Trending', id: 'Trending' },
    { icon: Newspaper, label: 'News', id: 'News' },
    { icon: Tv, label: 'Live', id: 'Live' },
    { icon: Award, label: 'Sports', id: 'Sports' },
  ];

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-youtube-dark border-r border-gray-800 overflow-y-auto">
      {/* Main Menu */}
      <div className="p-2">
        {mainMenu.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex items-center space-x-4 p-3 rounded-lg w-full ${
                activeSection === item.id
                  ? 'bg-youtube-hover font-medium'
                  : 'hover:bg-youtube-hover'
              }`}
            >
              <Icon size={24} />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="border-t border-gray-800 my-2"></div>

      {/* Library */}
      <div className="p-2">
        {libraryMenu.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex items-center space-x-4 p-3 rounded-lg w-full ${
                activeSection === item.id
                  ? 'bg-youtube-hover font-medium'
                  : 'hover:bg-youtube-hover'
              }`}
            >
              <Icon size={24} />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}

        <button
          onClick={() => setShowMore(!showMore)}
          className="flex items-center space-x-4 p-3 rounded-lg w-full hover:bg-youtube-hover text-sm"
        >
          <PlusCircle size={24} />
          <span>Show {showMore ? 'less' : 'more'}</span>
        </button>

        {showMore && (
          <div className="mt-2">
            {moreMenu.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center space-x-4 p-3 rounded-lg w-full ${
                    activeSection === item.id
                      ? 'bg-youtube-hover font-medium'
                      : 'hover:bg-youtube-hover'
                  }`}
                >
                  <Icon size={24} />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="border-t border-gray-800 my-2"></div>

      {/* Subscriptions */}
      <div className="p-2">
        <h3 className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase">Subscriptions</h3>
        {[1, 2, 3, 4, 5].map((i) => (
          <button
            key={i}
            className="flex items-center space-x-3 p-3 rounded-lg w-full hover:bg-youtube-hover"
          >
            <div className="w-6 h-6 rounded-full bg-youtube-light flex items-center justify-center">
              <User size={16} />
            </div>
            <span className="text-sm truncate">Channel {i}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}
