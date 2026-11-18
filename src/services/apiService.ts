import type { User, Post, Comment } from '../types/api';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    throw new ApiError(
      response.status,
      `API request failed with status ${response.status}: ${errorText || response.statusText}`
    );
  }
  return response.json() as Promise<T>;
}

export const apiService = {
  /**
   * Fetch all users from https://jsonplaceholder.typicode.com/users
   */
  async getUsers(signal?: AbortSignal): Promise<User[]> {
    const response = await fetch(`${BASE_URL}/users`, { signal });
    return handleResponse<User[]>(response);
  },

  /**
   * Fetch user by ID
   */
  async getUserById(id: number, signal?: AbortSignal): Promise<User> {
    const response = await fetch(`${BASE_URL}/users/${id}`, { signal });
    return handleResponse<User>(response);
  },

  /**
   * Fetch all posts from https://jsonplaceholder.typicode.com/posts
   */
  async getPosts(signal?: AbortSignal): Promise<Post[]> {
    const response = await fetch(`${BASE_URL}/posts`, { signal });
    return handleResponse<Post[]>(response);
  },

  /**
   * Fetch post by ID
   */
  async getPostById(id: number, signal?: AbortSignal): Promise<Post> {
    const response = await fetch(`${BASE_URL}/posts/${id}`, { signal });
    return handleResponse<Post>(response);
  },

  /**
   * Fetch posts by user ID
   */
  async getPostsByUserId(userId: number, signal?: AbortSignal): Promise<Post[]> {
    const response = await fetch(`${BASE_URL}/posts?userId=${userId}`, { signal });
    return handleResponse<Post[]>(response);
  },

  /**
   * Fetch all comments from https://jsonplaceholder.typicode.com/comments
   */
  async getComments(signal?: AbortSignal): Promise<Comment[]> {
    const response = await fetch(`${BASE_URL}/comments`, { signal });
    return handleResponse<Comment[]>(response);
  },

  /**
   * Fetch comments by post ID
   */
  async getCommentsByPostId(postId: number, signal?: AbortSignal): Promise<Comment[]> {
    const response = await fetch(`${BASE_URL}/comments?postId=${postId}`, { signal });
    return handleResponse<Comment[]>(response);
  },
};
