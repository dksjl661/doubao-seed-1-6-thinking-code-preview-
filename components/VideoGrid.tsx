import { useState } from 'react';
import VideoCard from './VideoCard';
import type { Video } from '../types';

interface VideoGridProps {
  videos: Video[];
}

export default function VideoGrid({ videos }: VideoGridProps) {
  const [likedVideos, setLikedVideos] = useState<Set<string>>(new Set());
  const [watchLaterVideos, setWatchLaterVideos] = useState<Set<string>>(new Set());
  const [showMessage, setShowMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleLike = (videoId: string) => {
    const newLiked = new Set(likedVideos);
    if (newLiked.has(videoId)) {
      newLiked.delete(videoId);
      setShowMessage({ type: 'success', text: 'Removed from liked videos' });
    } else {
      newLiked.add(videoId);
      setShowMessage({ type: 'success', text: 'Added to liked videos' });
    }
    setLikedVideos(newLiked);
    setTimeout(() => setShowMessage(null), 2000);
  };

  const handleWatchLater = (videoId: string) => {
    const newWatchLater = new Set(watchLaterVideos);
    if (newWatchLater.has(videoId)) {
      newWatchLater.delete(videoId);
      setShowMessage({ type: 'success', text: 'Removed from watch later' });
    } else {
      newWatchLater.add(videoId);
      setShowMessage({ type: 'success', text: 'Added to watch later' });
    }
    setWatchLaterVideos(newWatchLater);
    setTimeout(() => setShowMessage(null), 2000);
  };

  return (
    <div className="p-4">
      {/* Success Message */}
      {showMessage && (
        <div className={`fixed top-20 right-4 px-4 py-2 rounded-lg shadow-lg z-50 ${
          showMessage.type === 'success' ? 'bg-green-600' : 'bg-red-600'
        }`}>
          {showMessage.text}
        </div>
      )}

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            isLiked={likedVideos.has(video.id)}
            isInWatchLater={watchLaterVideos.has(video.id)}
            onLike={() => handleLike(video.id)}
            onWatchLater={() => handleWatchLater(video.id)}
          />
        ))}
      </div>
    </div>
  );
}
