import React from 'react';
import { User } from 'lucide-react';
import type { UserData } from '../../services/userService';

interface Props {
  user: UserData;
}

export default function ProfileHeader({ user }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-forest rounded-full flex items-center justify-center">
          <User size={32} className="text-mist-light" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-forest">
            {user.displayName || 'Your Profile'}
          </h1>
          <p className="text-sage">{user.email}</p>
        </div>
      </div>
    </div>
  );
}