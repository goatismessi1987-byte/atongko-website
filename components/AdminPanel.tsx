
import React from 'react';
import { Member, ClubSettings, Notice, MediaItem } from '../types';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  XCircle, 
  Settings2, 
  Users2, 
  Image as ImageIcon, 
  Save, 
  Diamond as DiamondIcon,
  Facebook,
  Instagram,
  MessageCircleMore,
  MessageSquare,
  Send,
  Globe,
  Database,
  Download,
  Upload,
  RefreshCw,
  ShieldCheck
} from 'lucide-react';

interface AdminPanelProps {
  members: Member[];
  onAddMember: (member: Omit<Member, 'id'>) => void;
  onEditMember: (member: Member) => void;
  onDeleteMember: (id: string) => void;
  clubSettings: ClubSettings;
  onUpdateClubSettings: (settings: ClubSettings) => void;
  notices: Notice[];
  media: MediaItem[];
  onRestoreData: (data: { members: Member[], notices: Notice[], media: MediaItem[], settings: ClubSettings }) => void;
  onResetData: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ 
  members, 
  onAddMember, 
  onEditMember, 
  onDeleteMember, 
  clubSettings, 
  onUpdateClubSettings,
  notices,
  media,
  onRestoreData,
  onResetData
}) => {
  const [activeTab, setActiveTab] = React.useState<'members' | 'club' | 'system'>('members');
  const [isAdding, setIsAdding] = React.useState(false);
  const [editId, setEditId] = React.useState<string | null>(null);
  const [formData, setFormData] = React.useState<Partial<Member>>({
    name: '', role: '', email: '', phone: '', hscBatch: '', sscBatch: '', college: '', school: '', photoUrl: ''
  });

  const [clubForm, setClubForm] = React.useState<ClubSettings>(clubSettings);

  const resetForm = () => {
    setFormData({ name: '', role: '', email: '', phone: '', hscBatch: '', sscBatch: '', college: '', school: '', photoUrl: '' });
    setIsAdding(false);
    setEditId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalPhoto = formData.photoUrl || `https://picsum.photos/seed/${formData.name || Date.now()}/400/400`;
    
    if (editId) {
      onEditMember({ ...formData, id: editId, photoUrl: finalPhoto } as Member);
    } else {
      onAddMember({ 
        ...formData, 
        photoUrl: finalPhoto,
        joinDate: new Date().toISOString().split('T')[0] 
      } as Omit<Member, 'id'>);
    }
    resetForm();
    setActiveTab('members');
  };

  const startEdit = (member: Member) => {
    setFormData(member);
    setEditId(member.id);
    setIsAdding(true);
  };

  const handleClubSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateClubSettings(clubForm);
    alert('Club profile updated and saved to secure storage.');
  };

  const handleExport = () => {
    const data = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      clubSettings,
      members,
      notices,
      media
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `elite_club_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json.members && json.clubSettings) {
          onRestoreData({
            members: json.members,
            notices: json.notices || [],
            media: json.media || [],
            settings: json.clubSettings
          });
          alert('Database restored successfully from backup.');
        } else {
          alert('Invalid backup file format.');
        }
      } catch (err) {
        alert('Error parsing backup file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">Management Console</h2>
          <p className="text-slate-400">Total authority over club identity and persistent data.</p>
        </div>
        
        <div className="flex p-1 bg-white/5 rounded-2xl border border-white/5 overflow-x-auto max-w-full">
          <button 
            onClick={() => setActiveTab('club')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all text-xs md:text-sm font-bold whitespace-nowrap ${activeTab === 'club' ? 'glass-gold gold-text shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <Settings2 size={18} /> Club Identity
          </button>
          <button 
            onClick={() => setActiveTab('members')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all text-xs md:text-sm font-bold whitespace-nowrap ${activeTab === 'members' ? 'glass-gold gold-text shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <Users2 size={18} /> Roster
          </button>
          <button 
            onClick={() => setActiveTab('system')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all text-xs md:text-sm font-bold whitespace-nowrap ${activeTab === 'system' ? 'glass-gold gold-text shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <Database size={18} /> System & Backup
          </button>
        </div>
      </div>

      {activeTab === 'system' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-300">
          <div className="glass rounded-3xl p-8 border border-white/10 space-y-6">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 rounded-2xl glass-gold flex items-center justify-center text-yellow-500">
                <Download size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold">Data Export</h3>
                <p className="text-sm text-slate-500">Securely backup all club records.</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Download your entire club database including members, notice board history, media gallery, and brand settings as a single JSON file. We recommend weekly backups for production use.
            </p>
            <button 
              onClick={handleExport}
              className="w-full flex items-center justify-center gap-2 gold-bg text-slate-950 py-4 rounded-2xl font-bold hover:brightness-110 transition-all"
            >
              <Download size={18} /> Download Backup (.json)
            </button>
          </div>

          <div className="glass rounded-3xl p-8 border border-white/10 space-y-6">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-blue-400">
                <Upload size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold">Data Restore</h3>
                <p className="text-sm text-slate-500">Import records from a backup file.</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Upload a previously exported backup file to restore your club state. <span className="text-red-400 font-bold">Warning:</span> This will overwrite all current local data.
            </p>
            <label className="w-full flex items-center justify-center gap-2 glass border border-dashed border-white/20 text-white py-4 rounded-2xl font-bold hover:bg-white/5 transition-all cursor-pointer">
              <Upload size={18} /> Select Backup File
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>
          </div>

          <div className="glass rounded-3xl p-8 border border-white/10 md:col-span-2 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500">
                <RefreshCw size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold">Factory Reset</h3>
                <p className="text-sm text-slate-500">Clear all local edits and return to initial state.</p>
              </div>
            </div>
            <button 
              onClick={() => {
                if(confirm('This will DELETE all your current data and reset to factory defaults. Continue?')) onResetData();
              }}
              className="px-8 py-3 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/10 font-bold transition-all"
            >
              Wipe & Reset System
            </button>
          </div>
        </div>
      )}

      {activeTab === 'club' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="glass rounded-3xl p-8 border border-white/10">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <DiamondIcon className="text-yellow-500" /> General Information
              </h3>
              <form onSubmit={handleClubSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Global Brand Name</label>
                  <input 
                    type="text" 
                    value={clubForm.name}
                    onChange={e => setClubForm({...clubForm, name: e.target.value})}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-4 outline-none focus:border-yellow-500/50 text-lg font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Brand Logo URL</label>
                  <div className="flex gap-4">
                    <input 
                      type="text" 
                      value={clubForm.logoUrl}
                      onChange={e => setClubForm({...clubForm, logoUrl: e.target.value})}
                      className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-4 py-4 outline-none focus:border-yellow-500/50"
                    />
                    <div className="w-14 h-14 rounded-xl glass border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                      {clubForm.logoUrl ? <img src={clubForm.logoUrl} className="w-full h-full object-cover" /> : <ImageIcon size={20} className="text-slate-600" />}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Club Tagline</label>
                  <input 
                    type="text" 
                    value={clubForm.tagline}
                    onChange={e => setClubForm({...clubForm, tagline: e.target.value})}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-4 outline-none focus:border-yellow-500/50"
                  />
                </div>

                <div className="space-y-6 pt-6 border-t border-white/5">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Social Media Connections</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                        <Facebook size={14} className="text-blue-500" /> Facebook
                      </label>
                      <input 
                        type="url" 
                        value={clubForm.facebook || ''}
                        onChange={e => setClubForm({...clubForm, facebook: e.target.value})}
                        placeholder="https://facebook.com/..."
                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-yellow-500/50 text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                        <MessageCircleMore size={14} className="text-blue-400" /> Messenger
                      </label>
                      <input 
                        type="url" 
                        value={clubForm.messenger || ''}
                        onChange={e => setClubForm({...clubForm, messenger: e.target.value})}
                        placeholder="https://m.me/..."
                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-yellow-500/50 text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                        <MessageSquare size={14} className="text-green-500" /> WhatsApp
                      </label>
                      <input 
                        type="url" 
                        value={clubForm.whatsapp || ''}
                        onChange={e => setClubForm({...clubForm, whatsapp: e.target.value})}
                        placeholder="https://wa.me/..."
                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-yellow-500/50 text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                        <Send size={14} className="text-sky-400" /> Telegram
                      </label>
                      <input 
                        type="url" 
                        value={clubForm.telegram || ''}
                        onChange={e => setClubForm({...clubForm, telegram: e.target.value})}
                        placeholder="https://t.me/..."
                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-yellow-500/50 text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                        <Instagram size={14} className="text-pink-500" /> Instagram
                      </label>
                      <input 
                        type="url" 
                        value={clubForm.instagram || ''}
                        onChange={e => setClubForm({...clubForm, instagram: e.target.value})}
                        placeholder="https://instagram.com/..."
                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-yellow-500/50 text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                        <Globe size={14} className="text-slate-400" /> Website
                      </label>
                      <input 
                        type="url" 
                        value={clubForm.website || ''}
                        onChange={e => setClubForm({...clubForm, website: e.target.value})}
                        placeholder="https://yoursite.com"
                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-yellow-500/50 text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-8">
                  <button type="submit" className="gold-bg text-slate-950 px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all">
                    <Save size={18} /> Save & Lock Brand
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="space-y-6">
            <div className="glass rounded-3xl p-6 border border-white/10">
              <h4 className="font-bold text-slate-400 mb-4 uppercase text-xs tracking-[0.2em]">Live Preview</h4>
              <div className="p-8 rounded-2xl bg-slate-950 border border-white/5 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl gold-bg flex items-center justify-center text-slate-950 mb-4 overflow-hidden shadow-2xl shadow-yellow-500/20">
                  {clubForm.logoUrl ? <img src={clubForm.logoUrl} className="w-full h-full object-cover" /> : <DiamondIcon size={32} />}
                </div>
                <h2 className="text-2xl font-bold">{clubForm.name}</h2>
                <p className="text-slate-500 text-sm mt-2 mb-6">{clubForm.tagline}</p>
                <div className="flex flex-wrap justify-center gap-3">
                   {clubForm.facebook && <Facebook size={16} className="text-slate-600" />}
                   {clubForm.messenger && <MessageCircleMore size={16} className="text-slate-600" />}
                   {clubForm.whatsapp && <MessageSquare size={16} className="text-slate-600" />}
                   {clubForm.telegram && <Send size={16} className="text-slate-600" />}
                   {clubForm.instagram && <Instagram size={16} className="text-slate-600" />}
                   {clubForm.website && <Globe size={16} className="text-slate-600" />}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'members' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="flex justify-between items-center">
             <h3 className="text-xl font-bold flex items-center gap-3">
              <Users2 className="text-yellow-500" /> Membership Registry
            </h3>
            {!isAdding && (
              <button 
                onClick={() => setIsAdding(true)}
                className="gold-bg text-slate-950 px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all text-sm"
              >
                <Plus size={18} /> Register New Member
              </button>
            )}
          </div>

          {isAdding && (
            <div className="glass rounded-3xl p-8 border border-white/10 animate-in fade-in duration-300">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">{editId ? 'Modify Member Profile' : 'New Member Registration'}</h3>
                <button onClick={resetForm} className="text-slate-500 hover:text-white"><XCircle size={24} /></button>
              </div>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                  <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-yellow-500/50" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Current Role</label>
                  <input required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-yellow-500/50" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Photo URL (Optional)</label>
                  <input value={formData.photoUrl} onChange={e => setFormData({...formData, photoUrl: e.target.value})} placeholder="https://..." className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-yellow-500/50" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                  <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-yellow-500/50" />
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">SSC Batch</label>
                  <input required value={formData.sscBatch} onChange={e => setFormData({...formData, sscBatch: e.target.value})} placeholder="e.g. 2008" className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-yellow-500/50" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">HSC Batch</label>
                  <input required value={formData.hscBatch} onChange={e => setFormData({...formData, hscBatch: e.target.value})} placeholder="e.g. 2010" className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-yellow-500/50" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">College Name</label>
                  <input required value={formData.college} onChange={e => setFormData({...formData, college: e.target.value})} className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-yellow-500/50" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">School Name</label>
                  <input required value={formData.school} onChange={e => setFormData({...formData, school: e.target.value})} className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-yellow-500/50" />
                </div>

                <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                  <button type="button" onClick={resetForm} className="px-6 py-3 rounded-xl border border-white/10 text-slate-400 hover:text-white transition-all">Cancel</button>
                  <button type="submit" className="gold-bg text-slate-950 px-10 py-3 rounded-xl font-bold hover:brightness-110 active:scale-95 transition-all">
                    {editId ? 'Commit Changes' : 'Finalize Registration'}
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="glass rounded-3xl overflow-hidden border border-white/10">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[800px]">
                <thead>
                  <tr className="bg-white/5 text-slate-500 text-xs font-bold uppercase tracking-widest">
                    <th className="px-6 py-5">Member</th>
                    <th className="px-6 py-5">SSC/HSC Batch</th>
                    <th className="px-6 py-5">College</th>
                    <th className="px-6 py-5">Contact</th>
                    <th className="px-6 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {members.map(member => (
                    <tr key={member.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img src={member.photoUrl} className="w-10 h-10 rounded-xl object-cover ring-2 ring-white/5" alt="" />
                          <div>
                            <p className="font-bold text-slate-100 group-hover:gold-text transition-colors">{member.name}</p>
                            <p className="text-xs text-slate-500 truncate max-w-[120px]">{member.role}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400">
                        {member.sscBatch} / {member.hscBatch}
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-400 font-medium">
                        {member.college}
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500 font-mono">{member.email}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => startEdit(member)} className="p-2 hover:bg-yellow-500/10 rounded-lg text-slate-400 hover:text-yellow-500 transition-all"><Edit2 size={18} /></button>
                          <button onClick={() => onDeleteMember(member.id)} className="p-2 hover:bg-red-500/10 rounded-lg text-slate-400 hover:text-red-500 transition-all"><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
