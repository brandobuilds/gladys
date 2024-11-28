import { auth } from 'express-oauth2-jwt-bearer';
import dotenv from 'dotenv';

dotenv.config();

const { AUTH0_ISSUER_BASE_URL, VITE_AUTH0_AUDIENCE } = process.env;

if (!AUTH0_ISSUER_BASE_URL) {
  throw new Error('Missing AUTH0_ISSUER_BASE_URL environment variable');
}

if (!VITE_AUTH0_AUDIENCE) {
  throw new Error('Missing VITE_AUTH0_AUDIENCE environment variable');
}

export const checkJwt = auth({
  issuerBaseURL: AUTH0_ISSUER_BASE_URL,
  audience: VITE_AUTH0_AUDIENCE,
  tokenSigningAlg: 'RS256'
});