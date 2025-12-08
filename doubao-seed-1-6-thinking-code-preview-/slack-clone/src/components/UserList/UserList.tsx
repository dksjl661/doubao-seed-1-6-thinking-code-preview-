import React from 'react';
import Avatar from '../Avatar/Avatar';

interface User {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  isActive?: boolean;
}

interface UserListProps {
  users: User[];
  onUserSelect?: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onUserSelect }) => {

  // Filter users by status
  const onlineUsers = users.filter(user => user.status === 'online');
  const awayUsers = users.filter(user => user.status === 'away');
  const offlineUsers = users.filter(user => user.status === 'offline' || user.status === 'busy');

  return (
    <div className="user-list">
      {/* User List Header */}
      <div className="user-list-header">
        <div className="user-list-title">Members</div>
        <div className="user-count">{users.length} members</div>
      </div>

      {/* User List Content */}
      <div className="user-list-content">
        {/* Online Users */}
        {onlineUsers.length > 0 && (
          <>
            <div className="channel-section-title">Online  {onlineUsers.length}</div>
            {onlineUsers.map(user => (
              <div
                key={user.id}
                className={`user-item ${user.isActive ? 'active' : ''}`}
                onClick={() => onUserSelect && onUserSelect(user)}
              >
                <div className="user-avatar">
                  <Avatar name={user.name} src={user.avatar} size="medium" />
                </div>
                <div className="user-details">
                  <div className="user-fullname">{user.name}</div>
                  <div className="user-username">@{user.username}</div>
                </div>
                <div className={`user-status-indicator ${user.status}`} />
              </div>
            ))}
          </>
        )}

        {/* Away Users */}
        {awayUsers.length > 0 && (
          <>
            <div className="channel-section-title">Away  {awayUsers.length}</div>
            {awayUsers.map(user => (
              <div
                key={user.id}
                className={`user-item ${user.isActive ? 'active' : ''}`}
                onClick={() => onUserSelect && onUserSelect(user)}
              >
                <div className="user-avatar">
                  <Avatar name={user.name} src={user.avatar} size="medium" />
                </div>
                <div className="user-details">
                  <div className="user-fullname">{user.name}</div>
                  <div className="user-username">@{user.username}</div>
                </div>
                <div className={`user-status-indicator ${user.status}`} />
              </div>
            ))}
          </>
        )}

        {/* Offline Users */}
        {offlineUsers.length > 0 && (
          <>
            <div className="channel-section-title">Offline  {offlineUsers.length}</div>
            {offlineUsers.map(user => (
              <div
                key={user.id}
                className={`user-item ${user.isActive ? 'active' : ''}`}
                onClick={() => onUserSelect && onUserSelect(user)}
              >
                <div className="user-avatar">
                  <Avatar name={user.name} src={user.avatar} size="medium" />
                </div>
                <div className="user-details">
                  <div className="user-fullname">{user.name}</div>
                  <div className="user-username">@{user.username}</div>
                </div>
                <div className={`user-status-indicator ${user.status}`} />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default UserList;