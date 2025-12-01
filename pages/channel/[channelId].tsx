import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import VideoCard from "../../components/VideoCard";
import { theoVideos } from "../../lib/mockData";
import { Bell, ChevronRight, Search } from "lucide-react";

export default function ChannelPage() {
  const router = useRouter();
  const { channelId } = router.query;
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeTab, setActiveTab] = useState("Home");

  const tabs = ["Home", "Videos", "Shorts", "Live", "Posts"];

  return (
    <div className="min-h-screen bg-youtube-dark text-white font-roboto">
      <Header onMenuClick={() => setShowSidebar(!showSidebar)} />

      <div className="flex">
        {showSidebar && <Sidebar />}

        <main className={`flex-1 ${showSidebar ? "ml-64" : ""} w-full`}>
          {/* Channel Header */}
          <div className="px-4 md:px-12 lg:px-24 pt-8 pb-4">
            {/* Banner (Optional/Empty in screenshot or gradient) */}
            {/* Profile Info */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
              {/* Avatar */}
              <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
                <div className="rounded-full overflow-hidden w-full h-full border border-transparent">
                  <Image
                    src="https://yt3.googleusercontent.com/4NapxEtLc13ITRXqoLFTRhUWd8TVeC27Vow0C3j8Z4F5b5L6e7x7v6b3x5x5x5x5=s176-c-k-c0x00ffffff-no-rj"
                    alt="Theo - t3.gg"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Text Info */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">
                  Theo - t3.gg{" "}
                  <span
                    className="text-sm align-middle inline-block bg-gray-500 rounded-full w-3 h-3 ml-1"
                    title="Verified"
                  ></span>
                </h1>
                <div className="text-gray-400 text-sm flex flex-wrap gap-2 mb-3">
                  <span className="font-medium text-white">@t3dotgg</span>
                  <span>•</span>
                  <span>488K subscribers</span>
                  <span>•</span>
                  <span>914 videos</span>
                </div>
                <div className="text-gray-400 text-sm mb-3 max-w-2xl line-clamp-2">
                  Software dev, AI nerd, TypeScript sympathizer, creator of T3
                  Chat and the T3 Stack. ...more
                </div>
                <div className="flex items-center text-blue-400 text-sm font-medium cursor-pointer mb-4">
                  <a href="#" className="hover:underline truncate max-w-xs">
                    youtube.com/@theorants
                  </a>
                  <span className="text-gray-400 ml-1">and 4 more links</span>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button className="flex items-center px-4 py-2 bg-[#272727] hover:bg-[#3f3f3f] rounded-full text-sm font-medium transition-colors">
                    <Bell size={18} className="mr-2" />
                    Subscribed
                    <ChevronRight size={16} className="ml-1 rotate-90" />
                  </button>
                  <button className="px-4 py-2 border border-gray-700 hover:bg-[#263850] hover:border-[#263850] rounded-full text-sm font-medium text-blue-400 transition-colors">
                    Join
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-700 mt-4">
              <div className="flex items-center">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 text-sm font-medium uppercase tracking-wide relative ${
                      activeTab === tab
                        ? "text-white border-b-2 border-white"
                        : "text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
                <button className="p-3 text-gray-400 hover:text-gray-200">
                  <Search size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Channel Content Sections */}
          <div className="px-4 md:px-12 lg:px-24 py-6">
            {/* For You Section */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">For You</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {theoVideos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </div>

            {/* Popular Videos Section */}
            <div>
              <h2 className="text-xl font-bold mb-4">Popular videos</h2>
              {/* Reuse videos or map generic ones if needed */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {/* Placeholder for popular videos */}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
