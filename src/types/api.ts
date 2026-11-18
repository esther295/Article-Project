export interface GeoCoordinates {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoCoordinates;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export type ActiveTab = 'dashboard' | 'users' | 'posts' | 'comments';

export type ViewMode = 'table' | 'grid';

export interface DashboardStats {
  totalUsers: number;
  totalPosts: number;
  totalComments: number;
  avgCommentsPerPost: number;
  activeCompanies: number;
}
