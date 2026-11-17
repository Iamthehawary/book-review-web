import { api } from './client';
import type { Book, BookDetails, CreateBookRequest } from '../types/api';

export async function getBooks(): Promise<Book[]> {
  const response = await api.get<Book[]>('/api/books');
  return response.data;
}

export async function getBook(id: number): Promise<BookDetails> {
  const response = await api.get<BookDetails>(`/api/books/${id}`);
  return response.data;
}

export async function createBook(data: CreateBookRequest): Promise<Book> {
  const response = await api.post<Book>('/api/books', data);
  return response.data;
}
