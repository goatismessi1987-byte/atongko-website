import React, { useState } from 'react';
import { Camera, Image as ImageIcon, Trash2 } from 'lucide-react';

export const AdminPanel: React.FC<any> = ({ members, onAddMember, onEditMember, onDeleteMember, onAddGalleryImage }) => {
  const [editingMember, setEditingMember] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [galleryFile, setGalleryFile] = useState<File | null>(null);

  const inputStyle = "w-full bg-[#0f121a] border border-white/10 p-3 rounded-xl text-white placeholder:text-slate-500 outline-none focus:border-yellow-500/50";

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* মেম্বার সেকশন */}
      <div className="bg-[#1a1f2e] p-6 rounded-[24px] border border-white/5">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Member Settings</h2>
          <button onClick={() => setEditingMember({ name: '', role: '', phone: '', bloodGroup: '', facebook: '' })} className="bg-yellow-500 text-black px-5 py-2 rounded-xl font-bold">+ New Member</button>
        </div>

        {editingMember && (
          <div className="mb-8 p-6 bg-black/40 rounded-2xl border border-yellow-500/20 space-y-4">
            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-dashed border-white/10">
              <div className="w-16 h-16 rounded-xl bg-slate-800 overflow-hidden border border-white/10 flex items-center justify-center">
                {(selectedFile || editingMember.photoUrl) ? <img src={selectedFile ? URL.createObjectURL(selectedFile) : editingMember.photoUrl} className="w-full h-full object-cover" /> : <Camera size={24}/>}
              </div>
              <label className="bg-white/10 text-white px-4 py-2 rounded-lg text-xs font-bold cursor-pointer hover:bg-white/20">
                CHOOSE PHOTO
                <input type="file" className="hidden" onChange={e => setSelectedFile(e.target.files?.[0] || null)} />
              </label>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className={inputStyle} placeholder="Name" value={editingMember.name} onChange={e => setEditingMember({...editingMember, name: e.target.value})} />
              <input className={inputStyle} placeholder="Role" value={editingMember.role} onChange={e => setEditingMember({...editingMember, role: e.target.value})} />
              <input className={inputStyle} placeholder="Phone" value={editingMember.phone} onChange={e => setEditingMember({...editingMember, phone: e.target.value})} />
              <input className={inputStyle} placeholder="Blood Group" value={editingMember.bloodGroup} onChange={e => setEditingMember({...editingMember, bloodGroup: e.target.value})} />
              <input className={`${inputStyle} md:col-span-2`} placeholder="Facebook Link" value={editingMember.facebook} onChange={e => setEditingMember({...editingMember, facebook: e.target.value})} />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button onClick={() => setEditingMember(null)} className="text-slate-400 font-bold px-4">Cancel</button>
              <button onClick={() => { editingMember.id ? onEditMember(editingMember, selectedFile) : onAddMember(editingMember, selectedFile); setEditingMember(null); }} className="bg-yellow-500 text-black px-8 py-2 rounded-xl font-bold">SAVE</button>
            </div>
          </div>
        )}

        <div className="grid gap-2">
          {members.map((m: any) => (
            <div key={m.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
              <div className="flex items-center gap-3">
                <img src={m.photoUrl} className="w-10 h-10 rounded-lg object-cover" />
                <div><p className="font-bold text-sm text-white">{m.name}</p><p className="text-[10px] text-slate-500 uppercase">{m.role}</p></div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditingMember(m)} className="text-yellow-500 p-2">Edit</button>
                <button onClick={() => onDeleteMember(m.id)} className="text-red-500 p-2"><Trash2 size={18}/></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* গ্যালারি সেকশন */}
      <div className="bg-[#1a1f2e] p-6 rounded-[24px] border border-white/5">
        <h2 className="text-xl font-bold mb-4">Gallery Upload</h2>
        <div className="flex gap-4 p-4 bg-white/5 rounded-xl border border-dashed border-white/10 items-center">
          <input type="file" onChange={e => setGalleryFile(e.target.files?.[0] || null)} className="text-sm" />
          <button onClick={() => { if(galleryFile) onAddGalleryImage(galleryFile); setGalleryFile(null); }} className="bg-blue-600 px-6 py-2 rounded-xl font-bold text-sm">Upload</button>
        </div>
      </div>
    </div>
  );
};
