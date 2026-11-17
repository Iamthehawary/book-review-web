// These types mirror the DTOs of the backend (BookResponseDto, ReviewResponseDto, ...)

export type Book = {
  id: number;
  title: string;
  author: string;
  description: string;
  averageRating: number;
  reviewCount: number;
};

export type Review = {
  id: number;
  comment: string;
  rating: number;
  createdAt: string;
  bookId: number;
  userId: number;
  username: string;
};

// BookDetailsDto: a book plus its reviews (newest first)
export type BookDetails = Book & {
  reviews: Review[];
};

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  username: string;
  email: string;
};

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export type CreateBookRequest = {
  title: string;
  author: string;
  description: string;
};

export type CreateReviewRequest = {
  comment: string;
  rating: number;
  bookId: number;
};

export type UpdateReviewRequest = {
  comment: string;
  rating: number;
};

// The error bodies the API can return:
// 401, 403, 404 and 409 carry { message }, and 400 carries { errors: { Field: [messages] } }
export type ApiErrorBody = {
  message?: string;
  errors?: Record<string, string[]>;
};
