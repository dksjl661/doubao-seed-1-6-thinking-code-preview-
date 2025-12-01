import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import VideoGrid from "../components/VideoGrid";
import { mockVideos, mockShorts } from "../lib/mockData";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showSidebar, setShowSidebar] = useState(true);

  const categories = [
    "All",
    "Podcasts",
    "Music",
    "AI",
    "Computer programming",
    "Study Skills",
    "Mixes",
    "Functions",
    "Mandopop music",
    "Gaming",
    "Variety shows",
    "Media theories",
  ];

  return (
    <div className="min-h-screen bg-youtube-dark">
      <Header onMenuClick={() => setShowSidebar(!showSidebar)} />
      <div className="flex">
        {showSidebar && <Sidebar />}
        <main
          className={`flex-1 ${
            showSidebar ? "ml-64" : ""
          } transition-all duration-300`}
        >
          {/* Category Chips */}
          <div className="sticky top-14 z-10 bg-youtube-dark border-b border-gray-800 px-4 py-3 overflow-x-auto">
            <div className="flex space-x-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-colors text-sm ${
                    selectedCategory === category
                      ? "bg-white text-youtube-dark font-medium"
                      : "bg-youtube-light hover:bg-youtube-hover text-white"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Video Grid */}
          <VideoGrid videos={mockVideos} shorts={mockShorts} />
        </main>
      </div>
    </div>
  );
}
