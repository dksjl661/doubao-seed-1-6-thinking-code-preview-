import React, { useState } from 'react';
import './styles/index.css';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import MainChat from './components/MainChat/MainChat';
import MessageInput from './components/MessageInput/MessageInput';
import UserList from './components/UserList/UserList';

// Types
interface Channel {
  id: string;
  name: string;
  type: 'channel' | 'group' | 'dm';
  unread?: number;
  isActive?: boolean;
}

interface Message {
  id: string;
  author: string;
  avatar?: string;
  timestamp: Date;
  content: string;
  isCodeBlock?: boolean;
}

interface User {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  isActive?: boolean;
}

function App() {
  // Mock data
  const workspaceName = "My Workspace";

  const [channels] = useState<Channel[]>([
    { id: '1', name: 'general', type: 'channel', unread: 3, isActive: true },
    { id: '2', name: 'random', type: 'channel', unread: 1 },
    { id: '3', name: 'design', type: 'channel' },
    { id: '4', name: 'engineering', type: 'channel' },
    { id: '5', name: 'marketing', type: 'channel' },
    { id: '6', name: 'team-retros', type: 'group' },
    { id: '7', name: 'John Doe', type: 'dm' },
    { id: '8', name: 'Jane Smith', type: 'dm', unread: 2 },
  ]);

  // State
  const [currentChannel, setCurrentChannel] = useState<Channel>(channels[0]);

  const [messages] = useState<Message[]>([
    {
      id: '1',
      author: 'John Doe',
      timestamp: new Date(Date.now() - 3600000),
      content: 'Hey everyone! Welcome to the new workspace. 🎉',
    },
    {
      id: '2',
      author: 'Jane Smith',
      timestamp: new Date(Date.now() - 3540000),
      content: 'Thanks for having me! Looking forward to collaborating with the team.',
    },
    {
      id: '3',
      author: 'Bob Johnson',
      timestamp: new Date(Date.now() - 3480000),
      content: 'Here\'s a quick guide on how to get started:\n\n1. Introduce yourself in this channel\n2. Join the relevant project channels\n3. Check out the #resources channel for helpful links\n4. Don\'t hesitate to ask questions!',
    },
    {
      id: '4',
      author: 'Alice Williams',
      timestamp: new Date(Date.now() - 3420000),
      content: 'If you need to set up your development environment, here\'s a quick script:\n\n```bash\n# Install dependencies\nnpm install\n\n# Start development server\nnpm start\n\n# Build for production\nnpm run build\n```',
      isCodeBlock: true,
    },
    {
      id: '5',
      author: 'Charlie Brown',
      timestamp: new Date(Date.now() - 3360000),
      content: 'Just a reminder that our team meeting is scheduled for tomorrow at 10 AM. We\'ll be discussing the Q4 roadmap and getting updates from each department. Please make sure to review the agenda in the shared Google Drive folder before the meeting.',
    },
    {
      id: '6',
      author: 'David Lee',
      timestamp: new Date(Date.now() - 3300000),
      content: 'Does anyone have experience with implementing real-time collaboration features? We\'re looking to add some functionality to our project management tool that would allow multiple users to edit the same document simultaneously.',
    },
    {
      id: '7',
      author: 'Eve Davis',
      timestamp: new Date(Date.now() - 3240000),
      content: 'I\'ve worked on something similar in the past. The key challenges are handling concurrency control, conflict resolution, and maintaining performance with multiple users. I\'d recommend looking into Operational Transformation or Conflict-free Replicated Data Types (CRDTs) as potential solutions.',
    },
  ]);

  const [users] = useState<User[]>([
    { id: '1', name: 'John Doe', username: 'johndoe', status: 'online', isActive: true },
    { id: '2', name: 'Jane Smith', username: 'janesmith', status: 'online' },
    { id: '3', name: 'Bob Johnson', username: 'bobjohnson', status: 'away' },
    { id: '4', name: 'Alice Williams', username: 'alicewilliams', status: 'online' },
    { id: '5', name: 'Charlie Brown', username: 'charliebrown', status: 'busy' },
    { id: '6', name: 'David Lee', username: 'davidlee', status: 'online' },
    { id: '7', name: 'Eve Davis', username: 'evedavis', status: 'away' },
    { id: '8', name: 'Frank Miller', username: 'frankmiller', status: 'offline' },
    { id: '9', name: 'Grace Wilson', username: 'gracewilson', status: 'online' },
    { id: '10', name: 'Henry Moore', username: 'henrymoore', status: 'offline' },
  ]);

  const currentUser = {
    name: 'Current User',
    status: 'Online',
  };

  // Handlers
  const handleChannelSelect = (channel: Channel) => {
    // Update state
    setCurrentChannel(channel);
    // Note: In a real app, we would fetch messages for the selected channel
    // and update the channels array with the new active channel
  };

  const handleSendMessage = (content: string) => {
    // In a real app, we would send this message to the server
    console.log('Sending message:', content);
    // For demo purposes, we'll just log it
  };

  return (
    <div className="app-container">
      <Sidebar
        workspaceName={workspaceName}
        channels={channels}
        currentUser={currentUser}
        onChannelSelect={handleChannelSelect}
      />

      <div className="main-content">
        <Header
          channelName={currentChannel.name}
          channelType={currentChannel.type}
          memberCount={users.length}
        />

        <MainChat
          channelName={currentChannel.name}
          messages={messages}
        />

        <MessageInput
          onSendMessage={handleSendMessage}
          placeholder={`Message #${currentChannel.name}`}
        />
      </div>

      <UserList users={users} />
    </div>
  );
}

export default App;
