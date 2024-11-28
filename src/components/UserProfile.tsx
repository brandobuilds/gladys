import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { User } from 'lucide-react';

export default function UserProfile() {
  const { user, isAuthenticated } = useAuth0();

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      {user.picture ? (
        <img
          src={user.picture}
          alt={user.name || 'User'}
          className="w-8 h-8 rounded-full"
        />
      ) : (
        <div className="w-8 h-8 bg-forest-light rounded-full flex items-center justify-center">
          <User size={16} className="text-mist-light" />
        </div>
      )}
      <span className="text-sm text-mist-light/80">{user.name}</span>
    </div>
  );
}