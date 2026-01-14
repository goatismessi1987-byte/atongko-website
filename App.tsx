import React from 'react';
import axios from 'axios'; // ছবির জন্য লাগবে: npm install axios
import { AppView, Member, Notice, ClubSettings, MediaItem } from './types';
import { INITIAL_MEMBERS, INITIAL_NOTICES, INITIAL_CLUB_SETTINGS, INITIAL_MEDIA } from './constants';
import { Layout } from './components/Layout';
import { FeedView } from './components/FeedView';
import { MemberDirectory } from './components/MemberDirectory';
import { AdminPanel } from './components/AdminPanel';
import { MediaGallery } from './components/MediaGallery';
import { ProfileModal } from './components/ProfileModal';
import { db } from './firebase';
import { ref, onValue, set, push, remove } from 'firebase/database';
import { 
  Lock, 
  X, 
  Diamond, 
  ArrowRight, 
  Bell, 
  Users, 
  Image as ImageIcon,
  Facebook,
  Instagram,
  MessageCircleMore,
  MessageSquare,
  Send,
  Globe,
  Heart,
  Phone,
  Camera
} from 'lucide-react';

// আপনার ImgBB API Key
const IMGBB_API_KEY = '22f8d3ac5ef60093426263a3b1ac5b53';

const HomeView: React.FC<{ clubSettings: ClubSettings; onNavigate: (view: AppView) => void }> = ({ clubSettings, onNavigate }) => {
  const nameParts = clubSettings.name.split(' ');
  const firstName = nameParts[0] || 'Elite';
  const restName = nameParts.slice(1).join(' ') || 'Club';

  return (
    <div className="min-h-full flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-700">
      <div className="relative mb-10">
        <div className="absolute -inset-10 bg-yellow-500/10 blur-[100px] rounded-full animate-pulse" />
        <div className="w-32 h-32 md:w-48 md:h-48 rounded-[40px] gold-bg flex items-center justify-center text-slate-950 shadow-2xl shadow-yellow-500/20 relative overflow-hidden">
          {clubSettings.logoUrl ? (
            <img src={clubSettings.logoUrl} alt="Logo" className="w-full h-full object-cover" />
          ) : (
            <Diamond size={64} className="md:size-80" />
          )}
        </div>
      </div>
      
      <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 uppercase">
        {firstName} <span className="gold-text">{restName}</span>
      </h1>
      
      <p className="text-xl md:text-2xl text-slate-400 font-medium mb-8 max-w-2xl">
        {clubSettings.tagline}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        <button onClick={() => onNavigate(AppView.FEED)} className="glass group p-8 rounded-3xl border border-white/5 hover:border-yellow-500/30 transition-all flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-yellow-500 group-hover:scale-110 transition-transform"><Bell size={32} /></div>
          <div><h3 className="text-xl font-bold mb-1">নোটিশ বোর্ড</h3><p className="text-sm text-slate-500">সর্বশেষ আপডেট দেখুন</p></div>
          <ArrowRight className="text-slate-600 group-hover:translate-x-1 transition-transform" />
        </button>
        <button onClick={() => onNavigate(AppView.DIRECTORY)} className
