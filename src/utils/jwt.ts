import { jwtDecode } from 'jwt-decode';
import type { AuthUser } from '../types/auth';

// The backend writes these long claim names into the token (UserService.GenerateJwtToken)
const CLAIM_ID = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier';
const CLAIM_NAME = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name';
const CLAIM_EMAIL = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress';

type TokenPayload = {
  [CLAIM_ID]?: string;
  [CLAIM_NAME]?: string;
  [CLAIM_EMAIL]?: string;
  exp?: number; // expiry in seconds since 1970
};

// Reads the user out of a token. Returns null if the token is malformed or expired.
// This is only for showing the UI: the server always validates the token itself.
export function getUserFromToken(token: string): AuthUser | null {
  try {
    const payload = jwtDecode<TokenPayload>(token);

    const id = Number(payload[CLAIM_ID]);
    const username = payload[CLAIM_NAME];
    const email = payload[CLAIM_EMAIL];
    const exp = payload.exp;

    if (!Number.isFinite(id) || !username || !email || !exp) return null;

    const expiresAt = exp * 1000;
    if (expiresAt <= Date.now()) return null;

    return { id, username, email, expiresAt };
  } catch {
    return null;
  }
}
