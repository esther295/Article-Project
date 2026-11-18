import { apiService } from './apiService';

export const fetchPosts = apiService.getPosts;
export const fetchPostById = apiService.getPostById;
export const fetchUsers = apiService.getUsers;
export const fetchUserById = apiService.getUserById;
export const fetchComments = apiService.getComments;
export const fetchCommentsByPostId = apiService.getCommentsByPostId;
export const fetchPostsByUserId = apiService.getPostsByUserId;

export { apiService };
export default apiService;
