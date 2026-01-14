
import React from 'react';
import { AppView, Member, Notice, ClubSettings, MediaItem } from './types';
import { INITIAL_MEMBERS, INITIAL_NOTICES, INITIAL_CLUB_SETTINGS, INITIAL_MEDIA } from './constants';
import { Layout } from './components/Layout';
import { FeedView } from './components/FeedView';
import { MemberDirectory } from './components/MemberDirectory';
import { AdminPanel } from './components/AdminPanel';
import { MediaGallery } from './components/MediaGallery';
import { ProfileModal } from './components/ProfileModal';
import { 
  Lock, 
  X, 
  ShieldAlert, 
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
  Globe
} from 'lucide-react';

const HomeView: React.FC<{ clubSettings: ClubSettings; onNavigate: (view: AppView) => void }> = ({ clubSettings, onNavigate }) => {
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
        {clubSettings.name.split(' ')[0]} <span className="gold-text">{clubSettings.name.split(' ').slice(1).join(' ')}</span>
      </h1>
      
      <p className="text-xl md:text-2xl text-slate-400 font-medium mb-8 max-w-2xl">
        {clubSettings.tagline}
      </p>

      {/* Social Links On Opening Page */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12">
        {clubSettings.facebook && (
          <a href={clubSettings.facebook} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2">
            <div className="p-3 glass rounded-2xl text-slate-400 group-hover:text-yellow-500 group-hover:border-yellow-500/50 transition-all"><Facebook size={24} /></div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Facebook</span>
          </a>
        )}
        {clubSettings.messenger && (
          <a href={clubSettings.messenger} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2">
            <div className="p-3 glass rounded-2xl text-slate-400 group-hover:text-yellow-500 group-hover:border-yellow-500/50 transition-all"><MessageCircleMore size={24} /></div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Messenger</span>
          </a>
        )}
        {clubSettings.whatsapp && (
          <a href={clubSettings.whatsapp} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2">
            <div className="p-3 glass rounded-2xl text-slate-400 group-hover:text-yellow-500 group-hover:border-yellow-500/50 transition-all"><MessageSquare size={24} /></div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">WhatsApp</span>
          </a>
        )}
        {clubSettings.telegram && (
          <a href={clubSettings.telegram} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2">
            <div className="p-3 glass rounded-2xl text-slate-400 group-hover:text-yellow-500 group-hover:border-yellow-500/50 transition-all"><Send size={24} /></div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Telegram</span>
          </a>
        )}
        {clubSettings.instagram && (
          <a href={clubSettings.instagram} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2">
            <div className="p-3 glass rounded-2xl text-slate-400 group-hover:text-yellow-500 group-hover:border-yellow-500/50 transition-all"><Instagram size={24} /></div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Instagram</span>
          </a>
        )}
        {clubSettings.website && (
          <a href={clubSettings.website} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2">
            <div className="p-3 glass rounded-2xl text-slate-400 group-hover:text-yellow-500 group-hover:border-yellow-500/50 transition-all"><Globe size={24} /></div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Website</span>
          </a>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        <button 
          onClick={() => onNavigate(AppView.FEED)}
          className="glass group p-8 rounded-3xl border border-white/5 hover:border-yellow-500/30 transition-all flex flex-col items-center gap-4"
        >
          <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-yellow-500 group-hover:scale-110 transition-transform">
            <Bell size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">Notice Board</h3>
            <p className="text-sm text-slate-500">View latest club updates</p>
          </div>
          <ArrowRight className="text-slate-600 group-hover:translate-x-1 transition-transform" />
        </button>

        <button 
          onClick={() => onNavigate(AppView.DIRECTORY)}
          className="glass group p-8 rounded-3xl border border-white/5 hover:border-yellow-500/30 transition-all flex flex-col items-center gap-4"
        >
          <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-yellow-500 group-hover:scale-110 transition-transform">
            <Users size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">Directory</h3>
            <p className="text-sm text-slate-500">Explore member profiles</p>
          </div>
          <ArrowRight className="text-slate-600 group-hover:translate-x-1 transition-transform" />
        </button>

        <button 
          onClick={() => onNavigate(AppView.MEDIA)}
          className="glass group p-8 rounded-3xl border border-white/5 hover:border-yellow-500/30 transition-all flex flex-col items-center gap-4 sm:col-span-2 lg:col-span-1"
        >
          <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-yellow-500 group-hover:scale-110 transition-transform">
            <ImageIcon size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">Gallery</h3>
            <p className="text-sm text-slate-500">Memories & Highlights</p>
          </div>
          <ArrowRight className="text-slate-600 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [activeView, setActiveView] = React.useState<AppView>(AppView.HOME);
  const [isAdmin, setIsAdmin] = React.useState(false); 
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);
  const [passwordInput, setPasswordInput] = React.useState('');
  const [loginError, setLoginError] = React.useState(false);

  // Persistent State with Fallbacks
  const [clubSettings, setClubSettings] = React.useState<ClubSettings>(() => {
    try {
      const saved = localStorage.getItem('elite_club_settings');
      return saved ? JSON.parse(saved) : INITIAL_CLUB_SETTINGS;
    } catch { return INITIAL_CLUB_SETTINGS; }
  });

  const [members, setMembers] = React.useState<Member[]>(() => {
    try {
      const saved = localStorage.getItem('elite_members');
      return saved ? JSON.parse(saved) : INITIAL_MEMBERS;
    } catch { return INITIAL_MEMBERS; }
  });

  const [notices, setNotices] = React.useState<Notice[]>(() => {
    try {
      const saved = localStorage.getItem('elite_notices');
      return saved ? JSON.parse(saved) : INITIAL_NOTICES;
    } catch { return INITIAL_NOTICES; }
  });

  const [media, setMedia] = React.useState<MediaItem[]>(() => {
    try {
      const saved = localStorage.getItem('elite_media');
      return saved ? JSON.parse(saved) : INITIAL_MEDIA;
    } catch { return INITIAL_MEDIA; }
  });

  const [selectedMember, setSelectedMember] = React.useState<Member | null>(null);

  // Sync with LocalStorage on every change
  React.useEffect(() => { localStorage.setItem('elite_club_settings', JSON.stringify(clubSettings)); }, [clubSettings]);
  React.useEffect(() => { localStorage.setItem('elite_members', JSON.stringify(members)); }, [members]);
  React.useEffect(() => { localStorage.setItem('elite_notices', JSON.stringify(notices)); }, [notices]);
  React.useEffect(() => { localStorage.setItem('elite_media', JSON.stringify(media)); }, [media]);

  // Admin Login Logic
  const handleAdminToggle = () => {
    if (isAdmin) {
      setIsAdmin(false);
      if (activeView === AppView.ADMIN) setActiveView(AppView.HOME);
    } else {
      setIsLoginModalOpen(true);
      setLoginError(false);
      setPasswordInput('');
    }
  };

  const attemptLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (passwordInput === '1122') {
      setIsAdmin(true);
      setIsLoginModalOpen(false);
      setLoginError(false);
    } else {
      setLoginError(true);
      setPasswordInput('');
    }
  };

  // Handlers
  const handleAddMember = (memberData: Omit<Member, 'id'>) => {
    if (!isAdmin) return;
    const newMember = { ...memberData, id: Math.random().toString(36).substr(2, 9) };
    setMembers([newMember, ...members]);
  };

  const handleEditMember = (updatedMember: Member) => {
    if (!isAdmin) return;
    setMembers(members.map(m => m.id === updatedMember.id ? updatedMember : m));
  };

  const handleDeleteMember = (id: string) => {
    if (!isAdmin) return;
    if (confirm('Are you sure you want to remove this member?')) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  const handlePostNotice = (noticeData: Partial<Notice>) => {
    if (!isAdmin) return;
    const newNotice: Notice = {
      id: 'n' + Date.now(),
      title: noticeData.title || 'No Title',
      content: noticeData.content || '',
      date: new Date().toISOString().split('T')[0],
      author: 'Administrator',
      priority: 'medium'
    };
    setNotices([newNotice, ...notices]);
  };

  const handleAddMedia = (mediaData: Partial<MediaItem>) => {
    if (!isAdmin) return;
    const newItem: MediaItem = {
      id: 'm' + Date.now(),
      url: mediaData.url || '',
      caption: mediaData.caption || '',
      type: mediaData.type || 'image',
      date: new Date().toISOString().split('T')[0]
    };
    setMedia([newItem, ...media]);
  };

  const handleDeleteMedia = (id: string) => {
    if (!isAdmin) return;
    if (confirm('Delete this memory?')) {
      setMedia(media.filter(m => m.id !== id));
    }
  };

  const handleUpdateClubSettings = (newSettings: ClubSettings) => {
    if (!isAdmin) return;
    setClubSettings(newSettings);
  };

  const handleRestoreData = (data: { members: Member[], notices: Notice[], media: MediaItem[], settings: ClubSettings }) => {
    setMembers(data.members);
    setNotices(data.notices);
    setMedia(data.media);
    setClubSettings(data.settings);
  };

  const handleResetData = () => {
    setMembers(INITIAL_MEMBERS);
    setNotices(INITIAL_NOTICES);
    setMedia(INITIAL_MEDIA);
    setClubSettings(INITIAL_CLUB_SETTINGS);
    localStorage.clear();
  };

  const renderView = () => {
    switch (activeView) {
      case AppView.HOME:
        return <HomeView clubSettings={clubSettings} onNavigate={setActiveView} />;
      case AppView.FEED:
        return <div className="p-4 md:p-8"><FeedView notices={notices} isAdmin={isAdmin} onPostNotice={handlePostNotice} /></div>;
      case AppView.DIRECTORY:
        return <div className="p-4 md:p-8"><MemberDirectory members={members} onSelectMember={setSelectedMember} /></div>;
      case AppView.MEDIA:
        return <MediaGallery media={media} isAdmin={isAdmin} onAddMedia={handleAddMedia} onDeleteMedia={handleDeleteMedia} />;
      case AppView.ADMIN:
        return isAdmin ? (
          <div className="p-4 md:p-8">
            <AdminPanel 
              members={members} 
              onAddMember={handleAddMember} 
              onEditMember={handleEditMember} 
              onDeleteMember={handleDeleteMember}
              clubSettings={clubSettings}
              onUpdateClubSettings={handleUpdateClubSettings}
              notices={notices}
              media={media}
              onRestoreData={handleRestoreData}
              onResetData={handleResetData}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[60vh] text-slate-600 gap-4">
            <ShieldAlert size={64} className="opacity-20 text-yellow-500" />
            <p className="text-xl font-bold text-slate-300">Restricted Access Module</p>
            <p className="text-sm max-w-xs text-center text-slate-500">Only certified administrators can access the configuration console.</p>
            <button onClick={handleAdminToggle} className="mt-4 gold-bg text-slate-950 px-6 py-2 rounded-xl font-bold hover:brightness-110">Authenticate Now</button>
          </div>
        );
      default:
        return <HomeView clubSettings={clubSettings} onNavigate={setActiveView} />;
    }
  };

  return (
    <>
      <Layout 
        activeView={activeView} 
        setActiveView={setActiveView} 
        isAdmin={isAdmin} 
        toggleAdmin={handleAdminToggle}
        clubSettings={clubSettings}
      >
        {renderView()}
      </Layout>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setIsLoginModalOpen(false)} />
          <div className="relative w-full max-w-md glass rounded-3xl p-8 border border-white/10 shadow-2xl animate-in zoom-in-95 duration-200">
            <button onClick={() => setIsLoginModalOpen(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white"><X size={20} /></button>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full glass-gold flex items-center justify-center text-yellow-500"><Lock size={32} /></div>
              <h2 className="text-2xl font-bold tracking-tight">Admin Authentication</h2>
              <p className="text-slate-400 text-sm">Please provide the security key to gain administrative privileges.</p>
              <form onSubmit={attemptLogin} className="w-full space-y-4 pt-4">
                <input 
                  type="password" 
                  placeholder="Security Key" 
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  autoFocus
                  className={`w-full bg-slate-900 border ${loginError ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 outline-none text-center text-xl tracking-widest focus:border-yellow-500/50 transition-all`}
                />
                {loginError && <p className="text-xs text-red-500 font-medium">Invalid credentials. Access denied.</p>}
                <button type="submit" className="w-full gold-bg text-slate-950 py-3 rounded-xl font-bold shadow-lg shadow-yellow-500/10 hover:brightness-110 transition-all active:scale-95">Verify Access</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {selectedMember && (
        <ProfileModal member={selectedMember} onClose={() => setSelectedMember(null)} />
      )}
    </>
  );
};

export default App;
