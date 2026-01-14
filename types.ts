
export enum AppView {
  HOME = 'HOME',
  FEED = 'FEED',
  DIRECTORY = 'DIRECTORY',
  MEDIA = 'MEDIA',
  ADMIN = 'ADMIN',
  PROFILE = 'PROFILE'
}

export interface ClubSettings {
  name: string;
  logoUrl: string;
  tagline: string;
  facebook?: string;
  messenger?: string;
  whatsapp?: string;
  telegram?: string;
  instagram?: string;
  website?: string;
}

export interface Member {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  photoUrl: string;
  joinDate: string;
  hscBatch: string;
  sscBatch: string;
  college: string;
  school: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  priority: 'low' | 'medium' | 'high';
}

export interface MediaItem {
  id: string;
  url: string;
  caption: string;
  type: 'image' | 'video';
  date: string;
}

export interface UserState {
  isAdmin: boolean;
  activeMemberId?: string;
}
