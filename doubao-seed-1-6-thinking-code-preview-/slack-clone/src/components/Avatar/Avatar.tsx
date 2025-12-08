import React from 'react';

interface AvatarProps {
  src?: string;
  name: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, name, size = 'medium', className = '' }) => {
  // Generate initials from name
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Generate background color based on name (consistent for same name)
  const getBackgroundColor = (name: string): string => {
    const colors = [
      '#36C5F0', // Blue
      '#ECB22E', // Yellow
      '#2EB67D', // Green
      '#E01E5A', // Pink
      '#764BA2', // Purple
      '#F69237', // Orange
    ];

    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
  };

  // Size classes
  const sizeClasses = {
    small: 'w-8 h-8 text-xs',
    medium: 'w-10 h-10 text-sm',
    large: 'w-12 h-12 text-base',
  };

  const avatarClasses = `avatar ${sizeClasses[size]} ${className}`;

  return (
    <div className={avatarClasses} style={src ? {} : { backgroundColor: getBackgroundColor(name) }}>
      {src ? (
        <img src={src} alt={name} />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </div>
  );
};

export default Avatar;