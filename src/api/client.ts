import axios from 'axios';
import { clearToken, getToken } from '../utils/tokenStorage';

// The auth context (Step F3) listens for this event to log the user out
export const AUTH_LOGOUT_EVENT = 'auth:logout';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor: attach the token to every request when we have one
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: if the server rejects our token (expired or invalid),
// forget it and tell the app to log the user out
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401 && getToken()) {
      clearToken();
      window.dispatchEvent(new Event(AUTH_LOGOUT_EVENT));
    }
    return Promise.reject(error);
  },
);
