import axios from 'axios';
import type { ApiErrorBody } from '../types/api';

const DEFAULT_MESSAGE = 'Something went wrong. Please try again.';

// "Username" -> "username", "$.rating" -> "rating"
function normalizeFieldName(key: string): string {
  const name = key.replace(/^\$\./, '');
  return name.charAt(0).toLowerCase() + name.slice(1);
}

// Validation errors (400) as { fieldName: firstMessage }, for showing under form inputs
export function getFieldErrors(error: unknown): Record<string, string> {
  const result: Record<string, string> = {};

  if (!axios.isAxiosError<ApiErrorBody>(error)) return result;

  const errors = error.response?.data?.errors;
  if (!errors) return result;

  for (const [key, messages] of Object.entries(errors)) {
    if (messages.length > 0) {
      result[normalizeFieldName(key)] = messages[0];
    }
  }
  return result;
}

// One readable message for any error, for showing in a banner or a toast
export function getErrorMessage(error: unknown): string {
  if (!axios.isAxiosError<ApiErrorBody>(error)) return DEFAULT_MESSAGE;

  // No response at all: the server is down, or the network or the certificate failed
  if (!error.response) {
    return 'Cannot reach the server. Check that the API is running and try again.';
  }

  const { status, data } = error.response;

  if (data?.message) return data.message;

  const fieldMessages = Object.values(getFieldErrors(error));
  if (fieldMessages.length > 0) return fieldMessages[0];

  if (status === 401) return 'Please log in to continue.';
  if (status === 403) return 'You are not allowed to do that.';
  if (status === 404) return 'Not found.';

  return DEFAULT_MESSAGE;
}
