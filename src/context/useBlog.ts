import { createContext, useContext } from 'react';
import type { User, Post, Comment } from '../types/api';

export interface BlogContextType {
  posts: Post[];
  users: User[];
  comments: Comment[];
  isLoading: boolean;
  error: string | null;
  getUserById: (id: number) => User | undefined;
  getPostById: (id: number) => Post | undefined;
  getCommentsForPost: (postId: number) => Comment[];
  getPostsForUser: (userId: number) => Post[];
  refreshData: () => Promise<void>;
  getCategoryForPost: (postId: number) => string;
  getReadingTime: (text: string) => string;
  getDateForPost: (postId: number) => string;
}

export const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const useBlog = (): BlogContextType => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};
