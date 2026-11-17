import { api } from './client';
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../types/api';

export async function register(data: RegisterRequest): Promise<RegisterResponse> {
  const response = await api.post<RegisterResponse>('/api/users/register', data);
  return response.data;
}

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>('/api/users/login', data);
  return response.data;
}
