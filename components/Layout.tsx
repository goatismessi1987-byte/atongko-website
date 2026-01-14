
import React from 'react';
import { AppView, ClubSettings } from '../types';
import { 
  Users, 
  Settings, 
  LogOut, 
  Bell, 
  Search,
  ShieldCheck,
  X,
  Diamond,
  Lock,
  MoreVertical,
  Home,
  Image,
  Facebook,
  Instagram,
  MessageCircleMore,
  MessageSquare,
  Send,
  Globe
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  isAdmin: boolean;
  toggleAdmin: () => void;
  clubSettings: ClubSettings;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activeView, 
  setActiveView, 
  isAdmin, 
  toggleAdmin,
  clubSettings
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const navItems = [
    { id: AppView.HOME, label: 'Home', icon: Home },
    { id: AppView.FEED, label: 'Notice Board', icon: Bell },
    { id: AppView.DIRECTORY, label: 'Member Directory', icon: Users },
    { id: AppView.MEDIA, label: 'Media Gallery', icon: Image },
  ];

  if (isAdmin) {
    navItems.push({ id: AppView.ADMIN, label: 'Admin Dashboard', icon: Settings });
  }

  const nameParts = clubSettings.name.split(' ');
  const firstPart = nameParts[0];
  const restPart = nameParts.slice(1).join(' ');

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* Sidebar Drawer - Universal */}
      <div className={`fixed inset-0 z-[100] transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={toggleSidebar} />
        <aside className={`absolute top-0 left-0 w-72 h-full glass border-r border-white/10 flex flex-col p-6 shadow-2xl transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-xl font-bold tracking-tighter flex items-center gap-2">
              <div className="gold-bg w-8 h-8 rounded-lg flex items-center justify-center text-slate-950">
                <Diamond size={18} />
              </div>
              <span>{firstPart}<span className="gold-text">{restPart}</span></span>
            </h1>
            <button onClick={toggleSidebar} className="p-1 hover:text-white text-slate-400">
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                  activeView === item.id 
                    ? 'glass-gold gold-text font-medium border border-yellow-500/20' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon size={20} />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="pt-6 border-t border-white/5 space-y-6">
            {/* Social Links In Sidebar */}
            <div className="flex justify-center flex-wrap gap-2 px-2">
              {clubSettings.facebook && <a href={clubSettings.facebook} target="_blank" rel="noopener noreferrer" className="p-2 glass rounded-lg text-slate-400 hover:text-yellow-500 hover:border-yellow-500/30 transition-all" title="Facebook"><Facebook size={18} /></a>}
              {clubSettings.messenger && <a href={clubSettings.messenger} target="_blank" rel="noopener noreferrer" className="p-2 glass rounded-lg text-slate-400 hover:text-yellow-500 hover:border-yellow-500/30 transition-all" title="Messenger"><MessageCircleMore size={18} /></a>}
              {clubSettings.whatsapp && <a href={clubSettings.whatsapp} target="_blank" rel="noopener noreferrer" className="p-2 glass rounded-lg text-slate-400 hover:text-yellow-500 hover:border-yellow-500/30 transition-all" title="WhatsApp"><MessageSquare size={18} /></a>}
              {clubSettings.telegram && <a href={clubSettings.telegram} target="_blank" rel="noopener noreferrer" className="p-2 glass rounded-lg text-slate-400 hover:text-yellow-500 hover:border-yellow-500/30 transition-all" title="Telegram"><Send size={18} /></a>}
              {clubSettings.instagram && <a href={clubSettings.instagram} target="_blank" rel="noopener noreferrer" className="p-2 glass rounded-lg text-slate-400 hover:text-yellow-500 hover:border-yellow-500/30 transition-all" title="Instagram"><Instagram size={18} /></a>}
              {clubSettings.website && <a href={clubSettings.website} target="_blank" rel="noopener noreferrer" className="p-2 glass rounded-lg text-slate-400 hover:text-yellow-500 hover:border-yellow-500/30 transition-all" title="Website"><Globe size={18} /></a>}
            </div>

            <button 
              onClick={toggleAdmin}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl glass border transition-all duration-300 ${isAdmin ? 'border-yellow-500/50 bg-yellow-500/5' : 'border-white/10'}`}
            >
              <div className="flex items-center gap-3">
                {isAdmin ? <ShieldCheck size={18} className="text-yellow-500" /> : <Lock size={18} className="text-slate-500" />}
                <span className={`text-sm font-medium ${isAdmin ? 'text-yellow-500' : 'text-slate-400'}`}>
                  {isAdmin ? 'Admin Mode' : 'Guest Mode'}
                </span>
              </div>
              <div className={`w-8 h-4 rounded-full relative transition-colors ${isAdmin ? 'bg-yellow-500' : 'bg-slate-700'}`}>
                <div className={`absolute top-1 w-2 h-2 bg-white rounded-full transition-all ${isAdmin ? 'right-1' : 'left-1'}`} />
              </div>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 transition-colors">
              <LogOut size={18} />
              <span className="text-sm">Sign Out</span>
            </button>
          </div>
        </aside>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="h-20 glass border-b border-white/5 flex items-center justify-between px-4 md:px-8 z-20">
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleSidebar} 
              className="p-2.5 rounded-xl glass border border-white/10 text-slate-400 hover:text-yellow-500 hover:border-yellow-500/30 transition-all active:scale-95"
            >
              <MoreVertical size={22} />
            </button>
            
            <h1 className="text-xl font-bold tracking-tighter truncate md:max-w-none max-w-[150px]">
              {firstPart}<span className="gold-text">{restPart}</span>
            </h1>
          </div>

          <div className="hidden lg:flex items-center bg-white/5 rounded-full px-4 py-2 w-96 border border-white/5 group focus-within:border-yellow-500/50 transition-all">
            <Search size={18} className="text-slate-500 group-focus-within:text-yellow-500" />
            <input 
              type="text" 
              placeholder="Search platform..." 
              className="bg-transparent border-none outline-none px-3 text-sm w-full placeholder:text-slate-600"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold">{isAdmin ? 'Club Admin' : 'Elite Guest'}</p>
              <p className="text-xs text-slate-500">{isAdmin ? 'Full Clearance' : 'Guest Tier'}</p>
            </div>
            <div className={`w-10 h-10 rounded-full border-2 p-0.5 transition-colors duration-500 ${isAdmin ? 'border-yellow-500 shadow-lg shadow-yellow-500/20' : 'border-white/10'}`}>
               <img src="https://picsum.photos/seed/admin/100/100" alt="Avatar" className="w-full h-full rounded-full object-cover" />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto scroll-smooth">
          {children}
        </div>
      </main>
    </div>
  );
};
