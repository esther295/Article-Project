import React, { useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { User, Post, Comment, ActiveTab } from '../types/api';
import { apiService } from '../services/apiService';
import { ApiDataContext } from './useApiData';

export const ApiDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(null);
  const [commentsFilterPostId, setCommentsFilterPostId] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    let ignore = false;

    async function loadData() {
      try {
        const [usersData, postsData, commentsData] = await Promise.all([
          apiService.getUsers(controller.signal),
          apiService.getPosts(controller.signal),
          apiService.getComments(controller.signal),
        ]);

        if (!ignore) {
          setUsers(usersData);
          setPosts(postsData);
          setComments(commentsData);
          setLastUpdated(new Date());
          setError(null);
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
        if (!ignore) {
          const message =
            err instanceof Error
              ? err.message
              : 'An unexpected error occurred while fetching API data.';
          setError(message);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadData();

    return () => {
      ignore = true;
      controller.abort();
    };
  }, [refreshKey]);

  const refreshAll = useCallback(async () => {
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

  const viewUserDetails = useCallback((userId: number) => {
    setSelectedUserId(userId);
  }, []);

  const viewPostDetails = useCallback((postId: number) => {
    setSelectedPostId(postId);
  }, []);

  const filterCommentsByPost = useCallback((postId: number) => {
    setCommentsFilterPostId(postId);
    setActiveTab('comments');
  }, []);

  return (
    <ApiDataContext.Provider
      value={{
        users,
        posts,
        comments,
        isLoading,
        error,
        lastUpdated,
        refreshAll,
        getUserById,
        getPostById,
        getCommentsForPost,
        getPostsForUser,
        activeTab,
        setActiveTab,
        selectedUserId,
        setSelectedUserId,
        selectedPostId,
        setSelectedPostId,
        selectedCommentId,
        setSelectedCommentId,
        viewUserDetails,
        viewPostDetails,
        filterCommentsByPost,
        commentsFilterPostId,
        setCommentsFilterPostId,
      }}
    >
      {children}
    </ApiDataContext.Provider>
  );
};
