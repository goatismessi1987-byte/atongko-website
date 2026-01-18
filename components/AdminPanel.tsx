import React, { useState } from 'react';
import { Member } from '../types';
import { Camera, Image as ImageIcon, Save, Trash2, X } from 'lucide-react';

export const AdminPanel: React.FC<any> = ({ members, onAddMember, onEditMember, onDeleteMember, onAddGalleryImage }) => {
  const [editingMember, setEditingMember] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [galleryFile, setGalleryFile] = useState<File | null>(null);

  const handleMemberSave = () => {
    // এই ফাংশনটি নতুন ফটো বা ডাটা সেভ নিশ্চিত করবে
    if (editingMember.id) {
      onEditMember(editingMember, selectedFile || undefined);
    } else {
      onAddMember(editingMember, selectedFile || undefined);
    }
    setEditingMember(null);
    setSelectedFile(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-8 text-white">
      {/* --- Member Management Section --- */}
      <section className="bg-[#1a1f2e] p-6 rounded-[32px] border border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Member Settings</h2>
          <button 
            onClick={() => setEditingMember({ name: '', role: '', phone: '', bloodGroup: '', facebook: '' })}
            className="bg-yellow-500 text-black px-4 py-2 rounded-xl font-bold"
          >
            + Add New Member
          </button>
        </div>

        {editingMember && (
          <div className="mb-8 p-6 bg-black/30 rounded-2xl border border-yellow-500/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Profile Photo Selection */}
              <div className="md:col-span-2 flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-dashed border-white/20">
                <div className="w-16 h-16 rounded-xl bg-slate-800 flex items-center justify-center overflow-hidden border border-white/10">
                  {selectedFile ? (
                    <img src={URL.createObjectURL(selectedFile)} className="w-full h-full object-cover" />
                  ) : editingMember.photoUrl ? (
                    <img src={editingMember.photoUrl} className="w-full h-full object-cover" />
                  ) : <Camera className="text-slate-500" />}
                </div>
                <label className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-xs font-bold cursor-pointer transition-all">
                  CHANGE PROFILE PHOTO
                  <input type="file" className="hidden" accept="image/*" onChange={e => setSelectedFile(e.target.files?.[0] || null)} />
                </label>
              </div>

              {/* Input Fields */}
              <input className="admin-input" placeholder="Full Name" value={editingMember.name || ''} onChange={e => setEditingMember({...editingMember, name: e.target.value})} />
              <input className="admin-input" placeholder="Role" value={editingMember.role || ''} onChange={e => setEditingMember({...editingMember, role: e.target.value})} />
              <input className="admin-input" placeholder="Phone" value={editingMember.phone || ''} onChange={e => setEditingMember({...editingMember, phone: e.target.value})} />
              <input className="admin-input" placeholder="Blood Group" value={editingMember.bloodGroup || ''} onChange={e => setEditingMember({...editingMember, bloodGroup: e.target.value})} />
              <input className="md:col-span-2 admin-input" placeholder="Facebook Profile Link" value={editingMember.facebook || ''} onChange={e => setEditingMember({...editingMember, facebook: e.target.value})} />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setEditingMember(null)} className="px-4 py-2 text-slate-400 font-bold">Cancel</button>
              <button onClick={handleMemberSave} className="bg-yellow-500 text-black px-6 py-2 rounded-xl font-bold">SAVE MEMBER</button>
            </div>
          </div>
        )}

        {/* Member List */}
        <div className="grid grid-cols-1 gap-2 mt-4">
          {members.map((m: Member) => (
            <div key={m.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
              <div className="flex items-center gap-3">
                <img src={m.photoUrl} className="w-10 h-10 rounded-lg object-cover" />
                <div><p className="font-bold text-sm">{m.name}</p><p className="text-[10px] text-slate-500 uppercase">{m.role}</p></div>
              </div>
              <button onClick={() => setEditingMember(m)} className="text-yellow-500 text-sm font-bold px-3 py-1 hover:bg-yellow-500/10 rounded-lg">Edit</button>
            </div>
          ))}
        </div>
      </section>

      {/* --- Gallery Section --- */}
      <section className="bg-[#1a1f2e] p-6 rounded-[32px] border border-white/10">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><ImageIcon size={20}/> Upload to Gallery</h2>
        <div className="flex flex-col md:flex-row gap-4 items-center p-4 bg-white/5 rounded-xl border border-dashed border-white/20">
          <input type="file" className="text-sm text-slate-400" onChange={(e) => setGalleryFile(e.target.files?.[0] || null)} />
          <button 
            onClick={() => { if(galleryFile) { onAddGalleryImage(galleryFile); setGalleryFile(null); }}}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-xl font-bold"
          >
            Upload to Gallery
          </button>
        </div>
      </section>
    </div>
  );
};
