import React, { useState } from 'react';
import { Member, ClubSettings } from '../types';
import { Camera, Save, Trash2, Plus, Globe, Phone, Heart, Facebook, GraduationCap, School } from 'lucide-react';

export const AdminPanel: React.FC<any> = ({ members, onAddMember, onEditMember, onDeleteMember, clubSettings, onUpdateClubSettings }) => {
  const [editingMember, setEditingMember] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSave = () => {
    if (editingMember.id) onEditMember(editingMember, selectedFile || undefined);
    else onAddMember(editingMember, selectedFile || undefined);
    setEditingMember(null);
    setSelectedFile(null);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 text-white p-4">
      {/* Member Management */}
      <div className="glass p-6 rounded-3xl border border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2 tracking-tight">Member Management</h2>
          <button onClick={() => setEditingMember({ name: '', role: '' })} className="gold-bg text-black px-4 py-2 rounded-xl font-bold text-sm">+ Add Member</button>
        </div>

        {editingMember && (
          <div className="mb-8 p-6 bg-slate-900/90 rounded-3xl border border-yellow-500/20 space-y-4 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Photo Upload Box */}
              <div className="md:col-span-2 p-4 bg-white/5 rounded-2xl border border-dashed border-white/20 flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center overflow-hidden border border-white/10">
                  {selectedFile ? <img src={URL.createObjectURL(selectedFile)} className="w-full h-full object-cover" /> : editingMember.photoUrl ? <img src={editingMember.photoUrl} className="w-full h-full object-cover" /> : <Camera className="text-slate-600" />}
                </div>
                <label className="bg-yellow-500 text-black px-4 py-2 rounded-xl text-xs font-black cursor-pointer hover:bg-yellow-400 uppercase">
                  Select Photo
                  <input type="file" className="hidden" accept="image/*" onChange={e => setSelectedFile(e.target.files?.[0] || null)} />
                </label>
              </div>

              <input placeholder="Full Name" className="admin-input" value={editingMember.name || ''} onChange={e => setEditingMember({...editingMember, name: e.target.value})} />
              <input placeholder="Role (e.g. Admin)" className="admin-input" value={editingMember.role || ''} onChange={e => setEditingMember({...editingMember, role: e.target.value})} />
              <input placeholder="Phone Number" className="admin-input" value={editingMember.phone || ''} onChange={e => setEditingMember({...editingMember, phone: e.target.value})} />
              <input placeholder="Blood Group (e.g. O+)" className="admin-input" value={editingMember.bloodGroup || ''} onChange={e => setEditingMember({...editingMember, bloodGroup: e.target.value})} />
              <input placeholder="SSC Batch" className="admin-input" value={editingMember.sscBatch || ''} onChange={e => setEditingMember({...editingMember, sscBatch: e.target.value})} />
              <input placeholder="HSC Batch" className="admin-input" value={editingMember.hscBatch || ''} onChange={e => setEditingMember({...editingMember, hscBatch: e.target.value})} />
              <input placeholder="College Name" className="admin-input" value={editingMember.college || ''} onChange={e => setEditingMember({...editingMember, college: e.target.value})} />
              <input placeholder="School Name" className="admin-input" value={editingMember.school || ''} onChange={e => setEditingMember({...editingMember, school: e.target.value})} />
              <div className="md:col-span-2"><input placeholder="Facebook Profile URL" className="admin-input w-full" value={editingMember.facebook || ''} onChange={e => setEditingMember({...editingMember, facebook: e.target.value})} /></div>
            </div>
            <div className="flex gap-3 justify-end pt-4">
              <button onClick={() => setEditingMember(null)} className="text-slate-500 font-bold px-4">Cancel</button>
              <button onClick={handleSave} className="gold-bg text-black px-8 py-3 rounded-xl font-black shadow-lg">SAVE CHANGES</button>
            </div>
          </div>
        )}
        
        {/* Member Table */}
        <div className="space-y-3">
          {members.map((m: any) => (
            <div key={m.id} className="flex items-center justify-between p-4 glass rounded-2xl border border-white/5 hover:border-yellow-500/20 transition-all">
              <div className="flex items-center gap-3">
                <img src={m.photoUrl} className="w-10 h-10 rounded-xl object-cover" />
                <div><p className="font-bold text-sm">{m.name}</p><p className="text-[10px] text-slate-500 uppercase tracking-widest">{m.role}</p></div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditingMember(m)} className="p-2 text-slate-400 hover:text-yellow-500 transition-colors"><Save size={18} /></button>
                <button onClick={() => onDeleteMember(m.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
