import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AppView, Member, Notice, ClubSettings, MediaItem } from './types';
import { db } from './firebase';
import { ref, onValue, set, push, remove } from 'firebase/database';
import { Lock, X, Diamond, ArrowRight, Bell, Users, Image as ImageIcon, Heart, Phone, Camera, MessageCircleMore, MessageSquare, Send, Globe } from 'lucide-react';
import { Layout } from './components/Layout';
import { MemberDirectory } from './components/MemberDirectory';
import { AdminPanel } from './components/AdminPanel';
import { FeedView } from './components/FeedView';
import { MediaGallery } from './components/MediaGallery';
import { ProfileModal } from './components/ProfileModal';
import { INITIAL_CLUB_SETTINGS } from './constants';

const IMGBB_API_KEY = '22f8d3ac5ef60093426263a3b1ac5b53';

const HomeView: React.FC<{ clubSettings: ClubSettings; onNavigate: (view: AppView) => void }> = ({ clubSettings, onNavigate }) => {
  const [f, ...rest] = clubSettings.name.split(' ');
  return (
    <div className="min-h-full flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-700">
      <div className="relative mb-10">
        <div className="absolute -inset-10 bg-yellow-500/10 blur-[100px] rounded-full animate-pulse" />
        <div className="w-32 h-32 md:w-48 md:h-48 rounded-[40px] gold-bg flex items-center justify-center text-slate-950 shadow-2xl relative overflow-hidden">
          {clubSettings.logoUrl ? <img src={clubSettings.logoUrl} className="w-full h-full object-cover" /> : <Diamond size={64} />}
        </div>
      </div>
      <h1 className="text-5xl md:text-7xl font-black mb-4 uppercase text-white">{f} <span className="gold-text">{rest.join(' ')}</span></h1>
      <p className="text-xl text-slate-400 mb-8 max-w-2xl">{clubSettings.tagline}</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
        {[{v: AppView.FEED, i: Bell, t: 'নোটিশ বোর্ড'}, {v: AppView.DIRECTORY, i: Users, t: 'ডিরেক্টরি'}, {v: AppView.MEDIA, i: ImageIcon, t: 'গ্যালারি'}].map(b => (
          <button key={b.v} onClick={() => onNavigate(b.v)} className="glass group p-8 rounded-3xl border border-white/5 hover:border-yellow-500/30 transition-all flex flex-col items-center gap-4 text-white font-bold">
            <b.i size={32} className="text-yellow-500" /> {b.t} <ArrowRight />
          </button>
        ))}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>(AppView.HOME);
  const [isAdmin, setIsAdmin] = useState(false); 
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [pass, setPass] = useState('');
  const [isUp, setIsUp] = useState(false);
  const [settings, setSettings] = useState<ClubSettings>(INITIAL_CLUB_SETTINGS);
  const [members, setMembers] = useState<Member[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [sel, setSel] = useState<Member | null>(null);

  useEffect(() => {
    onValue(ref(db, 'members'), s => s.val() && setMembers(Object.keys(s.val()).map(k => ({ ...s.val()[k], id: k }))));
    onValue(ref(db, 'notices'), s => s.val() && setNotices(Object.keys(s.val()).map(k => ({ ...s.val()[k], id: k })).reverse()));
    onValue(ref(db, 'media'), s => s.val() && setMedia(Object.keys(s.val()).map(k => ({ ...s.val()[k], id: k })).reverse()));
    onValue(ref(db, 'settings'), s => s.val() && setSettings(s.val()));
  }, []);

  const handleAddMember = async (m: any, f?: File) => {
    try {
      setIsUp(true);
      let url = m.photoUrl;
      if (f) {
        const d = new FormData(); d.append('image', f);
        const r = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, d);
        url = r.data.data.url;
      }
      push(ref(db, 'members'), { ...m, photoUrl: url });
      alert('সফল হয়েছে!');
    } catch { alert('ব্যর্থ হয়েছে!'); } finally { setIsUp(false); }
  };

  const renderView = () => {
    switch (activeView) {
      case AppView.HOME: return <HomeView clubSettings={settings} onNavigate={setActiveView} />;
      case AppView.FEED: return <div className="p-4"><FeedView notices={notices} isAdmin={isAdmin} onPostNotice={n => push(ref(db, 'notices'), n)} /></div>;
      case AppView.DIRECTORY: return <div className="p-4"><MemberDirectory members={members} onSelectMember={setSel} /></div>;
      case AppView.MEDIA: return <MediaGallery media={media} isAdmin={isAdmin} onAddMedia={m => push(ref(db, 'media'), m)} onDeleteMedia={id => remove(ref(db, `media/${id}`))} />;
      case AppView.ADMIN: return <div className="p-4"><AdminPanel members={members} onAddMember={handleAddMember} onEditMember={m => set(ref(db, `members/${m.id}`), m)} onDeleteMember={id => remove(ref(db, `members/${id}`))} clubSettings={settings} onUpdateClubSettings={s => set(ref(db, 'settings'), s)} notices={notices} media={media} onRestoreData={() => {}} onResetData={() => {}} /></div>;
      default: return <HomeView clubSettings={settings} onNavigate={setActiveView} />;
    }
  };

  return (
    <>
      <Layout activeView={activeView} setActiveView={setActiveView} isAdmin={isAdmin} toggleAdmin={() => isAdmin ? setIsAdmin(false) : setIsLoginModalOpen(true)} clubSettings={settings}>{renderView()}</Layout>
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 backdrop-blur-md bg-black/60 text-white">
          <div className="w-full max-w-md glass rounded-3xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-center mb-6">এডমিন লগইন</h2>
            <input type="password" placeholder="পাসওয়ার্ড" className="w-full bg-slate-900 border rounded-xl px-4 py-3 mb-4 outline-none focus:border-yellow-500" value={pass} onChange={e => setPass(e.target.value)} />
            <button onClick={() => { if (pass === '1122') { setIsAdmin(true); setIsLoginModalOpen(false); } else { alert('ভুল পাসওয়ার্ড!'); } }} className="w-full gold-bg text-black py-3 rounded-xl font-bold">লগইন</button>
          </div>
        </div>
      )}
      {sel && <ProfileModal member={sel} onClose={() => setSel(null)} />}
      {isUp && <div className="fixed inset-0 z-[200] bg-black/80 flex flex-col items-center justify-center text-white font-bold">আপলোড হচ্ছে...</div>}
    </>
  );
};
export default App;
