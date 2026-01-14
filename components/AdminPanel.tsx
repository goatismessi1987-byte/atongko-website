import React, { useState } from 'react';
import { Member, ClubSettings } from '../types';
import { Camera, Save, Trash2, Plus, Globe, Phone, Heart, Facebook } from 'lucide-react';

interface AdminPanelProps {
  members: Member[];
  onAddMember: (m: any, file?: File) => void;
  onEditMember: (m: any, file?: File) => void;
  onDeleteMember: (id: string) => void;
  clubSettings: ClubSettings;
  onUpdateClubSettings: (s: ClubSettings) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ 
  members, onAddMember, onEditMember, onDeleteMember, clubSettings, onUpdateClubSettings 
}) => {
  const [editingMember, setEditingMember] = useState<Partial<Member> | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSave = () => {
    if (editingMember?.id) onEditMember(editingMember, selectedFile || undefined);
    else onAddMember(editingMember, selectedFile || undefined);
    setEditingMember(null);
    setSelectedFile(null);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 text-white">
      {/* Club Settings Section */}
      <section className="glass p-6 rounded-3xl border border-white/10">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Globe className="text-yellow-500" /> Club Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            className="bg-slate-900/50 border border-white/10 p-3 rounded-xl outline-none" 
            placeholder="Club Name" 
            value={clubSettings.name} 
            onChange={e => onUpdateClubSettings({...clubSettings, name: e.target.value})}
          />
          <input 
            className="bg-slate-900/50 border border-white/10 p-3 rounded-xl outline-none" 
            placeholder="Tagline" 
            value={clubSettings.tagline} 
            onChange={e => onUpdateClubSettings({...clubSettings, tagline: e.target.value})}
          />
        </div>
      </section>

      {/* Member Management Section */}
      <section className="glass p-6 rounded-3xl border border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2"><Users className="text-yellow-500" /> Manage Members</h2>
          <button 
            onClick={() => setEditingMember({ name: '', role: '', phone: '', bloodGroup: '', facebook: '' })}
            className="gold-bg text-black px-4 py-2 rounded-xl font-bold flex items-center gap-2"
          >
            <Plus size={18} /> Add New Member
          </button>
        </div>

        {editingMember && (
          <div className="mb-8 p-6 bg-slate-900/80 rounded-2xl border border-yellow-500/30 space-y-4 animate-in slide-in-from-top duration-300">
            <h3 className="font-bold text-yellow-500 underline underline-offset-4 mb-4">
              {editingMember.id ? 'Edit Member Profile' : 'Create New Member Profile'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Profile Photo Upload */}
              <div className="md:col-span-2 flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-dashed border-white/20">
                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden border border-white/10">
                  {selectedFile ? (
                    <img src={URL.createObjectURL(selectedFile)} className="w-full h-full object-cover" />
                  ) : editingMember.photoUrl ? (
                    <img src={editingMember.photoUrl} className="w-full h-full object-cover" />
                  ) : <Camera className="text-slate-500" />}
                </div>
                <div>
                  <label className="bg-yellow-500 text-black px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer hover:bg-yellow-400">
                    UPLOAD PHOTO
                    <input type="file" className="hidden" accept="image/*" onChange={e => setSelectedFile(e.target.files?.[0] || null)} />
                  </label>
                  <p className="text-[10px] text-slate-500 mt-1">Recommended: Square size (400x400)</p>
                </div>
              </div>

              <input placeholder="Full Name" className="admin-input" value={editingMember.name || ''} onChange={e => setEditingMember({...editingMember, name: e.target.value})} />
              <input placeholder="Role (e.g. Admin, Member)" className="admin-input" value={editingMember.role || ''} onChange={e => setEditingMember({...editingMember, role: e.target.value})} />
              <input placeholder="Phone Number" className="admin-input" value={editingMember.phone || ''} onChange={e => setEditingMember({...editingMember, phone: e.target.value})} />
              <input placeholder="Blood Group (e.g. A+)" className="admin-input" value={editingMember.bloodGroup || ''} onChange={e => setEditingMember({...editingMember, bloodGroup: e.target.value})} />
              <input placeholder="SSC Batch" className="admin-input" value={editingMember.sscBatch || ''} onChange={e => setEditingMember({...editingMember, sscBatch: e.target.value})} />
              <input placeholder="HSC Batch" className="admin-input" value={editingMember.hscBatch || ''} onChange={e => setEditingMember({...editingMember, hscBatch: e.target.value})} />
              <input placeholder="College Name" className="admin-input" value={editingMember.college || ''} onChange={e => setEditingMember({...editingMember, college: e.target.value})} />
              <input placeholder="School Name" className="admin-input" value={editingMember.school || ''} onChange={e => setEditingMember({...editingMember, school: e.target.value})} />
              <div className="md:col-span-2">
                <input placeholder="Facebook Profile Link" className="admin-input w-full" value={editingMember.facebook || ''} onChange={e => setEditingMember({...editingMember, facebook: e.target.value})} />
              </div>
            </div>

            <div className="flex gap-3 justify-end mt-4">
              <button onClick={() => setEditingMember(null)} className="px-6 py-2 rounded-xl text-slate-400 hover:text-white">Cancel</button>
              <button onClick={handleSave} className="gold-bg text-black px-8 py-2 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-yellow-500/20">
                <Save size={18} /> Save Member
              </button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 text-slate-500 text-sm">
                <th className="py-4 px-4 font-medium">Member</th>
                <th className="py-4 px-4 font-medium">Role</th>
                <th className="py-4 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map(m => (
                <tr key={m.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="py-4 px-4 flex items-center gap-3">
                    <img src={m.photoUrl} className="w-10 h-10 rounded-full border border-white/10" alt="" />
                    <span className="font-bold">{m.name}</span>
                  </td>
                  <td className="py-4 px-4 text-slate-400">{m.role}</td>
                  <td className="py-4 px-4 text-right">
                    <button onClick={() => setEditingMember(m)} className="p-2 text-slate-400 hover:text-yellow-500"><Save size={18} /></button>
                    <button onClick={() => onDeleteMember(m.id)} className="p-2 text-slate-400 hover:text-red-500"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
