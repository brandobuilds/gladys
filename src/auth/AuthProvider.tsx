import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';

interface Props {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  if (!domain || !clientId || !audience) {
    throw new Error('Missing Auth0 configuration');
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience,
      }}
    >
      {children}
    </Auth0Provider>
  );
}