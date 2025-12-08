import React from 'react';

interface HeaderProps {
  channelName: string;
  channelType: 'channel' | 'group' | 'dm';
  memberCount?: number;
  onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  channelName,
  channelType,
  memberCount,
  onSearch,
}) => {
  // Get channel icon based on type
  const getChannelIcon = (type: string): string => {
    switch (type) {
      case 'channel':
        return '#';
      case 'group':
        return '=';
      case 'dm':
        return '=d';
      default:
        return '#';
    }
  };

  // Get channel meta text
  const getChannelMeta = (): string => {
    if (channelType === 'dm') {
      return 'Direct message';
    }
    if (channelType === 'group') {
      return memberCount ? `${memberCount} members` : 'Private channel';
    }
    return memberCount ? `${memberCount} members` : 'Public channel';
  };

  return (
    <div className="header">
      <div className="header-left">
        <div className="channel-header">
          <span className="channel-header-icon">{getChannelIcon(channelType)}</span>
          <span className="channel-header-name">{channelName}</span>
          <span className="channel-header-meta">{getChannelMeta()}</span>
        </div>
      </div>

      <div className="header-actions">
        <input
          type="text"
          className="search-box"
          placeholder={`Search #${channelName}...`}
          onChange={(e) => onSearch && onSearch(e.target.value)}
        />
        <button className="action-button" title="Threads">
          <span>=¬</span>
        </button>
        <button className="action-button" title="Files">
          <span>=Á</span>
        </button>
        <button className="action-button" title="More">
          <span>î</span>
        </button>
      </div>
    </div>
  );
};

export default Header;