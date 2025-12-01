export interface Video {
  id: string;
  title: string;
  channel: string;
  channelId: string;
  views: string;
  posted: string;
  duration: string;
  thumbnail: string;
  channelAvatar: string;
}

export interface Playlist {
  id: string;
  name: string;
  videos: Video[];
}
