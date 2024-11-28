import React from 'react';
import { LogIn, LogOut, Loader2, Chrome } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function AuthButton() {
  const { user, loading, signInWithGoogle, logout } = useAuth();

  if (loading) {
    return (
      <button className="p-2 rounded-md text-mist-light/80" disabled>
        <Loader2 size={18} className="animate-spin" />
      </button>
    );
  }

  if (user) {
    return (
      <button
        onClick={logout}
        className="p-2 rounded-md text-mist-light/80 hover:text-mist-light hover:bg-forest-light transition-colors flex items-center gap-2"
      >
        <LogOut size={18} />
        <span className="text-sm">Logout</span>
      </button>
    );
  }

  return (
    <button
      onClick={signInWithGoogle}
      className="p-2 rounded-md text-mist-light/80 hover:text-mist-light hover:bg-forest-light transition-colors flex items-center gap-2"
    >
      <Chrome size={18} />
      <span className="text-sm">Sign in with Google</span>
    </button>
  );
}