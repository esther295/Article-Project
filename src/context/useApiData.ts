import { createContext, useContext } from 'react';
import type { User, Post, Comment, ActiveTab } from '../types/api';

export interface ApiDataContextType {
  users: User[];
  posts: Post[];
  comments: Comment[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refreshAll: () => Promise<void>;
  getUserById: (id: number) => User | undefined;
  getPostById: (id: number) => Post | undefined;
  getCommentsForPost: (postId: number) => Comment[];
  getPostsForUser: (userId: number) => Post[];

  // Navigation & Drilldown State
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedUserId: number | null;
  setSelectedUserId: (id: number | null) => void;
  selectedPostId: number | null;
  setSelectedPostId: (id: number | null) => void;
  selectedCommentId: number | null;
  setSelectedCommentId: (id: number | null) => void;

  // Cross-navigation helpers
  viewUserDetails: (userId: number) => void;
  viewPostDetails: (postId: number) => void;
  filterCommentsByPost: (postId: number) => void;
  commentsFilterPostId: number | null;
  setCommentsFilterPostId: (postId: number | null) => void;
}

export const ApiDataContext = createContext<ApiDataContextType | undefined>(undefined);

export const useApiData = (): ApiDataContextType => {
  const context = useContext(ApiDataContext);
  if (!context) {
    throw new Error('useApiData must be used within an ApiDataProvider');
  }
  return context;
};
