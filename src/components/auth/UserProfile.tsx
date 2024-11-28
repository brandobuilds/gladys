import React from 'react';
import { User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function UserProfile() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      {user.photoURL ? (
        <img
          src={user.photoURL}
          alt={user.displayName || 'User'}
          className="w-8 h-8 rounded-full"
        />
      ) : (
        <div className="w-8 h-8 bg-forest-light rounded-full flex items-center justify-center">
          <User size={16} className="text-mist-light" />
        </div>
      )}
      <span className="text-sm text-mist-light/80">
        {user.displayName || user.email}
      </span>
    </div>
  );
}