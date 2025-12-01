import { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import VideoGrid from '../components/VideoGrid';
import { mockVideos } from '../lib/mockData';
import type { Video } from '../types';

export default function Home() {
  const [videos, setVideos] = useState<Video[]>(mockVideos);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showSidebar, setShowSidebar] = useState(true);

  const categories = ['All', 'Music', 'Gaming', 'News', 'Live', 'Sports', 'Learning', 'Fashion'];

  return (
    <div className="min-h-screen bg-youtube-dark">
      <Header onMenuClick={() => setShowSidebar(!showSidebar)} />
      <div className="flex">
        {showSidebar && <Sidebar />}
        <main className={`flex-1 ${showSidebar ? 'ml-64' : ''} transition-all duration-300`}>
          {/* Category Chips */}
          <div className="sticky top-0 z-10 bg-youtube-dark border-b border-gray-800 p-4 overflow-x-auto">
            <div className="flex space-x-4">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-white text-youtube-dark'
                      : 'bg-youtube-light hover:bg-youtube-hover text-white'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Video Grid */}
          <VideoGrid videos={videos} />
        </main>
      </div>
    </div>
  );
}
