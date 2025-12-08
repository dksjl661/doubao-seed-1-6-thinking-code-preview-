import React from 'react';
import Avatar from '../Avatar/Avatar';

interface Channel {
  id: string;
  name: string;
  type: 'channel' | 'group' | 'dm';
  unread?: number;
  isActive?: boolean;
}

interface SidebarProps {
  workspaceName: string;
  channels: Channel[];
  currentUser: {
    name: string;
    status: string;
  };
  onChannelSelect: (channel: Channel) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  workspaceName,
  channels,
  currentUser,
  onChannelSelect,
}) => {
  // Filter channels by type
  const publicChannels = channels.filter(ch => ch.type === 'channel');
  const privateChannels = channels.filter(ch => ch.type === 'group');
  const directMessages = channels.filter(ch => ch.type === 'dm');

  return (
    <div className="sidebar">
      {/* Workspace Header */}
      <div className="workspace-header">
        <div className="workspace-name">
          <span>#</span>
          <span>{workspaceName}</span>
        </div>
      </div>

      {/* Channel List */}
      <div className="channel-list">
        {/* Public Channels */}
        {publicChannels.length > 0 && (
          <div className="channel-section">
            <div className="channel-section-title">Channels</div>
            {publicChannels.map(channel => (
              <div
                key={channel.id}
                className={`channel-item ${channel.isActive ? 'active' : ''}`}
                onClick={() => onChannelSelect(channel)}
              >
                <span className="channel-icon">#</span>
                <span className="channel-name">{channel.name}</span>
                {channel.unread && channel.unread > 0 && (
                  <span className="channel-unread">{channel.unread}</span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Private Channels */}
        {privateChannels.length > 0 && (
          <div className="channel-section">
            <div className="channel-section-title">Private Channels</div>
            {privateChannels.map(channel => (
              <div
                key={channel.id}
                className={`channel-item ${channel.isActive ? 'active' : ''}`}
                onClick={() => onChannelSelect(channel)}
              >
                <span className="channel-icon">=</span>
                <span className="channel-name">{channel.name}</span>
                {channel.unread && channel.unread > 0 && (
                  <span className="channel-unread">{channel.unread}</span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Direct Messages */}
        {directMessages.length > 0 && (
          <div className="channel-section">
            <div className="channel-section-title">Direct Messages</div>
            {directMessages.map(channel => (
              <div
                key={channel.id}
                className={`channel-item ${channel.isActive ? 'active' : ''}`}
                onClick={() => onChannelSelect(channel)}
              >
                <span className="channel-icon">=d</span>
                <span className="channel-name">{channel.name}</span>
                {channel.unread && channel.unread > 0 && (
                  <span className="channel-unread">{channel.unread}</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* User Profile */}
      <div className="user-profile">
        <div className="user-profile-content">
          <Avatar name={currentUser.name} size="medium" />
          <div className="user-info">
            <div className="user-name">{currentUser.name}</div>
            <div className="user-status">{currentUser.status}</div>
          </div>
          <div className="profile-actions">
            <button className="action-button" title="Set status">
              <span>"</span>
            </button>
            <button className="action-button" title="Preferences">
              <span>™</span>
            </button>
            <button className="action-button" title="Help">
              <span>?</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;