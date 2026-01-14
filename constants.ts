
import { Member, Notice, ClubSettings, MediaItem } from './types';

export const INITIAL_CLUB_SETTINGS: ClubSettings = {
  name: 'ELITE CLUB',
  logoUrl: '', // Empty means fallback to letter logo
  tagline: 'Excellence in every connection.',
  facebook: 'https://facebook.com',
  instagram: 'https://instagram.com',
  messenger: 'https://m.me/eliteclub',
  whatsapp: 'https://wa.me/1234567890',
  telegram: 'https://t.me/eliteclub',
  website: 'https://eliteclub.com'
};

export const INITIAL_MEMBERS: Member[] = [
  {
    id: '1',
    name: 'Alexander Sterling',
    role: 'Managing Director',
    email: 'alex.sterling@eliteclub.com',
    phone: '+1 (555) 012-3456',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&auto=format&fit=crop',
    joinDate: '2020-01-15',
    hscBatch: '2010',
    sscBatch: '2008',
    college: 'Royal Oxford College',
    school: 'St. Peters High School'
  },
  {
    id: '2',
    name: 'Isabella Vance',
    role: 'Operations Head',
    email: 'isabella.v@eliteclub.com',
    phone: '+1 (555) 987-6543',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=400&auto=format&fit=crop',
    joinDate: '2021-03-22',
    hscBatch: '2012',
    sscBatch: '2010',
    college: 'Metro Victoria College',
    school: 'Greenfield International'
  },
  {
    id: '3',
    name: 'Julian Thorne',
    role: 'Lead Consultant',
    email: 'j.thorne@eliteclub.com',
    phone: '+1 (555) 456-7890',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=400&auto=format&fit=crop',
    joinDate: '2022-06-10',
    hscBatch: '2011',
    sscBatch: '2009',
    college: 'Northern Heights College',
    school: 'Bluebell Academy'
  }
];

export const INITIAL_NOTICES: Notice[] = [
  {
    id: 'n1',
    title: 'Grand Alumni Meetup',
    content: 'We are pleased to announce the annual meetup for all batches. Please register your attendance via the portal.',
    date: '2024-05-20',
    author: 'Admin',
    priority: 'high'
  },
  {
    id: 'n2',
    title: 'Verification Drive',
    content: 'Members are requested to update their Batch and Educational details for the new directory release.',
    date: '2024-05-18',
    author: 'Management',
    priority: 'medium'
  }
];

export const INITIAL_MEDIA: MediaItem[] = [
  {
    id: 'm1',
    url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop',
    caption: 'Annual Gala Night 2023',
    type: 'image',
    date: '2023-12-15'
  },
  {
    id: 'm2',
    url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop',
    caption: 'Networking Dinner - Spring Session',
    type: 'image',
    date: '2024-03-10'
  },
  {
    id: 'm3',
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop',
    caption: 'Tech Symposium - Main Hall',
    type: 'image',
    date: '2024-04-05'
  }
];
