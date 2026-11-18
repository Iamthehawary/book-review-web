import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { login as loginRequest } from '../api/auth';
import { AUTH_LOGOUT_EVENT } from '../api/client';
import type { AuthUser } from '../types/auth';
import { getUserFromToken } from '../utils/jwt';
import { clearToken, getToken, setToken } from '../utils/tokenStorage';
import { AuthContext, type AuthContextValue } from './authContext';

// Reads the saved token when the app starts. A bad or expired token is removed.
function loadUser(): AuthUser | null {
  const token = getToken();
  if (!token) return null;

  const user = getUserFromToken(token);
  if (!user) clearToken();
  return user;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(loadUser);

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const { token } = await loginRequest({ username, password });

    const loggedInUser = getUserFromToken(token);
    if (!loggedInUser) throw new Error('The server returned an invalid token.');

    setToken(token);
    setUser(loggedInUser);
  }, []);

  // The axios interceptor clears the token on a 401 and fires this event
  useEffect(() => {
    const handleLogout = () => setUser(null);
    window.addEventListener(AUTH_LOGOUT_EVENT, handleLogout);
    return () => window.removeEventListener(AUTH_LOGOUT_EVENT, handleLogout);
  }, []);

  // Log out automatically at the moment the token expires
  useEffect(() => {
    if (!user) return;

    const timeLeft = user.expiresAt - Date.now();
    const timer = setTimeout(logout, Math.max(timeLeft, 0));
    return () => clearTimeout(timer);
  }, [user, logout]);

  const value = useMemo<AuthContextValue>(
    () => ({ user, isAuthenticated: user !== null, login, logout }),
    [user, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
