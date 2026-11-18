import React, { useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { User, Post, Comment } from '../types/api';
import { apiService } from '../services/apiService';
import { BlogContext } from './useBlog';

const CATEGORIES = [
  'Essays',
  'Architecture',
  'Culture',
  'Design',
  'Philosophy',
  'Technology',
  'Literature',
  'Society',
];

export const BlogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState<number>(0);

  useEffect(() => {
    const controller = new AbortController();
    let ignore = false;

    async function loadAllData() {
      try {
        const [postsData, usersData, commentsData] = await Promise.all([
          apiService.getPosts(controller.signal),
          apiService.getUsers(controller.signal),
          apiService.getComments(controller.signal),
        ]);

        if (!ignore) {
          setPosts(postsData);
          setUsers(usersData);
          setComments(commentsData);
          setError(null);
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
        if (!ignore) {
          const msg =
            err instanceof Error
              ? err.message
              : 'Failed to fetch content from the journal endpoints.';
          setError(msg);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadAllData();

    return () => {
      ignore = true;
      controller.abort();
    };
  }, [refreshKey]);

  const refreshData = useCallback(async () => {
    setIsLoading(true);
    setRefreshKey((prev) => prev + 1);
  }, []);

  const getUserById = useCallback(
    (id: number): User | undefined => {
      return users.find((u) => u.id === id);
    },
    [users]
  );

  const getPostById = useCallback(
    (id: number): Post | undefined => {
      return posts.find((p) => p.id === id);
    },
    [posts]
  );

  const getCommentsForPost = useCallback(
    (postId: number): Comment[] => {
      return comments.filter((c) => c.postId === postId);
    },
    [comments]
  );

  const getPostsForUser = useCallback(
    (userId: number): Post[] => {
      return posts.filter((p) => p.userId === userId);
    },
    [posts]
  );

  const getCategoryForPost = useCallback((postId: number): string => {
    return CATEGORIES[(postId - 1) % CATEGORIES.length];
  }, []);

  const getReadingTime = useCallback((text: string): string => {
    const wordCount = text.trim().split(/\s+/).length;
    const minutes = Math.max(3, Math.ceil(wordCount / 18));
    return `${minutes} min read`;
  }, []);

  const getDateForPost = useCallback((postId: number): string => {
    const baseDate = new Date(2026, 10, 15);
    const postDate = new Date(baseDate.getTime() - postId * 86400000 * 2.5);
    return postDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }, []);

  return (
    <BlogContext.Provider
      value={{
        posts,
        users,
        comments,
        isLoading,
        error,
        getUserById,
        getPostById,
        getCommentsForPost,
        getPostsForUser,
        refreshData,
        getCategoryForPost,
        getReadingTime,
        getDateForPost,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
