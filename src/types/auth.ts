export type AuthUser = {
  id: number;
  username: string;
  email: string;
  expiresAt: number; // expiry time in milliseconds since 1970
};
