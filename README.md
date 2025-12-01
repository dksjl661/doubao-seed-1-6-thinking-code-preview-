# YouTube Clone with Next.js and Clerk

This is a YouTube homepage clone built with Next.js, TypeScript, Tailwind CSS, and Clerk authentication.

## Features

- **YouTube Homepage Design**: Pixel-perfect clone of YouTube's homepage
- **Google Authentication**: Sign in with Google using Clerk
- **User Profile Menu**: View user information and manage account
- **Video Grid**: Browse videos with thumbnails, titles, and metadata
- **Playlist Functionality**: Save videos to watch later and like videos
- **Mock Buttons**: All YouTube features are present with mock functionality
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

- **Next.js 15**: React framework for building the application
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Clerk**: Authentication provider for Google login
- **Lucide React**: Icon library for UI components

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env.local` file in the root directory and add your Clerk credentials:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
```

You can get these credentials from [Clerk's dashboard](https://dashboard.clerk.com/).

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

Build the application for production:

```bash
npm run build
```

### Start

Start the production server:

```bash
npm start
```

## Project Structure

```
youtube-clone/
├── components/
│   ├── Header.tsx          # Top navigation header
│   ├── Sidebar.tsx         # Left sidebar menu
│   ├── VideoGrid.tsx       # Video grid container
│   └── VideoCard.tsx       # Individual video card
├── lib/
│   └── mockData.ts         # Mock video data
├── pages/
│   ├── _app.tsx            # App component with ClerkProvider
│   ├── _document.tsx        # Document component
│   ├── api/
│   │   └── auth/
│   │       └── [...clerk].ts  # Clerk authentication API
│   └── index.tsx            # Home page
├── styles/
│   └── globals.css          # Global styles
├── types/
│   └── index.ts             # TypeScript interfaces
├── .env.local               # Environment variables
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json              # Project dependencies
```

## Features Breakdown

### Authentication
- Google sign-in using Clerk
- User profile menu with personal information
- Sign out functionality

### Video Browsing
- Video grid with thumbnails and metadata
- Video titles, channel names, views, and posted dates
- Hover effects with interactive buttons

### Playlist Functionality
- Like/unlike videos
- Add/remove videos from watch later
- Visual feedback for playlist actions

### Mock Buttons
All YouTube features are present with mock functionality:
- Subscribe buttons
- Video options menu
- Share functionality
- Play next feature
- Not interested option

## Customization

### Adding More Videos
Edit `lib/mockData.ts` to add more video objects:

```typescript
export const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Your Video Title',
    channel: 'Channel Name',
    channelId: 'channel123',
    views: '1.2M',
    posted: '2 days ago',
    duration: '10:30',
    thumbnail: 'https://i.ytimg.com/vi/video_id/hq720.jpg',
    channelAvatar: 'https://yt3.googleusercontent.com/avatar.jpg',
  },
  // Add more videos...
];
```

### Styling
The project uses Tailwind CSS. You can customize colors in `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      'youtube-red': '#FF0000',
      'youtube-dark': '#0F0F0F',
      'youtube-light': '#212121',
      'youtube-hover': '#303030',
    },
  },
},
```

## License

MIT License

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
