import React, { useState } from 'react';
import { Camera, Trash2 } from 'lucide-react';

export const AdminPanel: React.FC<any> = ({ members, onAddMember, onEditMember, onDeleteMember }) => {
  const [editingMember, setEditingMember] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // টেক্সট কালার white নিশ্চিত করা হয়েছে
  const inputStyle = "w-full bg-[#111827] border border-white/20 p-3 rounded-xl text-white placeholder:text-gray-500 focus:border-yellow-500 outline-none";

  return (
    <div className="max-w-4xl mx-auto p-4 text-white">
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-bold">Member Management</h2>
        <button onClick={() => setEditingMember({ name: '', role: '', phone: '', bloodGroup: '', facebook: '' })} className="bg-yellow-500 text-black px-4 py-2 rounded-xl font-bold">+ New Member</button>
      </div>

      {editingMember && (
        <div className="bg-[#1f2937] p-6 rounded-2xl mb-8 border border-white/10">
          <div className="grid gap-4">
            <div className="flex items-center gap-4">
               <div className="w-16 h-16 bg-black rounded-xl overflow-hidden border border-white/10 flex items-center justify-center">
                  {selectedFile ? <img src={URL.createObjectURL(selectedFile)} className="w-full h-full object-cover" /> : editingMember.photoUrl ? <img src={editingMember.photoUrl} className="w-full h-full object-cover" /> : <Camera />}
               </div>
               <label className="bg-white/10 px-4 py-2 rounded-lg cursor-pointer text-sm font-bold hover:bg-white/20">
                 SELECT PHOTO
                 <input type="file" className="hidden" onChange={e => setSelectedFile(e.target.files?.[0] || null)} />
               </label>
            </div>
            <input className={inputStyle} placeholder="Name" value={editingMember.name || ''} onChange={e => setEditingMember({...editingMember, name: e.target.value})} />
            <input className={inputStyle} placeholder="Role" value={editingMember.role || ''} onChange={e => setEditingMember({...editingMember, role: e.target.value})} />
            <div className="grid grid-cols-2 gap-4">
              <input className={inputStyle} placeholder="Phone" value={editingMember.phone || ''} onChange={e => setEditingMember({...editingMember, phone: e.target.value})} />
              <input className={inputStyle} placeholder="Blood Group" value={editingMember.bloodGroup || ''} onChange={e => setEditingMember({...editingMember, bloodGroup: e.target.value})} />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button onClick={() => setEditingMember(null)} className="px-4 py-2 text-gray-400">Cancel</button>
            <button onClick={() => { editingMember.id ? onEditMember(editingMember, selectedFile) : onAddMember(editingMember, selectedFile); setEditingMember(null); setSelectedFile(null); }} className="bg-yellow-500 text-black px-6 py-2 rounded-xl font-bold">SAVE CHANGES</button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {members.map((m: any) => (
          <div key={m.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
            <div className="flex items-center gap-3">
              <img src={m.photoUrl} className="w-10 h-10 rounded-lg object-cover" alt="" />
              <div>
                <p className="font-bold text-sm text-white">{m.name}</p>
                <p className="text-[10px] text-gray-400 uppercase">{m.role}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditingMember(m)} className="text-yellow-500 font-bold px-2">Edit</button>
              <button onClick={() => onDeleteMember(m.id)} className="text-red-500 px-2"><Trash2 size={18}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
