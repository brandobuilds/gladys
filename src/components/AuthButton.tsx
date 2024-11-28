import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { LogIn, LogOut, Loader2, Chrome } from 'lucide-react';

export default function AuthButton() {
  const { isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        connection: 'google-oauth2'
      }
    });
  };

  if (isLoading) {
    return (
      <button className="p-2 rounded-md text-mist-light/80" disabled>
        <Loader2 size={18} className="animate-spin" />
      </button>
    );
  }

  if (isAuthenticated) {
    return (
      <button
        onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
        className="p-2 rounded-md text-mist-light/80 hover:text-mist-light hover:bg-forest-light transition-colors flex items-center gap-2"
      >
        <LogOut size={18} />
        <span className="text-sm">Logout</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleLogin}
      className="p-2 rounded-md text-mist-light/80 hover:text-mist-light hover:bg-forest-light transition-colors flex items-center gap-2"
    >
      <Chrome size={18} />
      <span className="text-sm">Sign in with Google</span>
    </button>
  );
}