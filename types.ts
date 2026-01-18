export enum AppView {
  HOME = 'home',
  DIRECTORY = 'directory',
  FEED = 'feed',
  ADMIN = 'admin',
  MEDIA = 'media'
}

export interface Member {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  sscBatch?: string;
  hscBatch?: string;
  college?: string;
  school?: string;
  phone?: string;
  bloodGroup?: string;
  facebook?: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'general' | 'urgent' | 'event';
}

export interface ClubSettings {
  name: string;
  tagline: string;
  logoUrl?: string;
}

export interface MediaItem {
  id: string;
  url: string;
  caption?: string;
  type: 'image' | 'video';
  date: string;
}
