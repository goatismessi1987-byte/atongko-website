import React, { useState } from 'react';
import { Camera, Trash2, Edit2 } from 'lucide-react';

export const AdminPanel: React.FC<any> = ({ members, onEditMember, onDeleteMember }) => {
  const [editingMember, setEditingMember] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const inputStyle = "w-full bg-[#1a1f2e] border border-white/10 p-3 rounded-xl text-white outline-none focus:border-yellow-500/50";

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <h2 className="text-xl font-bold text-white mb-6">Member Management</h2>
      
      {editingMember && (
        <div className="bg-[#111827] p-6 rounded-2xl border border-yellow-500/20 mb-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-slate-800 rounded-xl overflow-hidden flex items-center justify-center">
              {selectedFile ? <img src={URL.createObjectURL(selectedFile)} className="w-full h-full object-cover" /> : <img src={editingMember.photoUrl} className="w-full h-full object-cover" />}
            </div>
            <label className="bg-white/5 text-white px-4 py-2 rounded-lg text-xs font-bold cursor-pointer hover:bg-white/10 border border-white/10">
              CHANGE PHOTO
              <input type="file" className="hidden" onChange={e => setSelectedFile(e.target.files?.[0] || null)} />
            </label>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className={inputStyle} value={editingMember.name} onChange={e => setEditingMember({...editingMember, name: e.target.value})} placeholder="Name" />
            <input className={inputStyle} value={editingMember.role} onChange={e => setEditingMember({...editingMember, role: e.target.value})} placeholder="Role" />
            <input className={inputStyle} value={editingMember.phone} onChange={e => setEditingMember({...editingMember, phone: e.target.value})} placeholder="Phone" />
            <input className={inputStyle} value={editingMember.bloodGroup} onChange={e => setEditingMember({...editingMember, bloodGroup: e.target.value})} placeholder="Blood Group" />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button onClick={() => setEditingMember(null)} className="px-4 py-2 text-slate-400">Cancel</button>
            <button onClick={() => { onEditMember(editingMember, selectedFile); setEditingMember(null); }} className="bg-yellow-500 text-black px-6 py-2 rounded-xl font-bold">SAVE CHANGES</button>
          </div>
        </div>
      )}

      <div className="grid gap-3">
        {members.map((m: any) => (
          <div key={m.id} className="flex items-center justify-between p-4 bg-[#1a1f2e] rounded-xl border border-white/5">
            <div className="flex items-center gap-4">
              <img src={m.photoUrl} className="w-12 h-12 rounded-lg object-cover" />
              <div>
                <p className="font-bold text-white">{m.name}</p>
                <p className="text-[10px] text-slate-500 uppercase font-bold">{m.role}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditingMember(m)} className="p-2 text-yellow-500 hover:bg-yellow-500/10 rounded-lg transition-colors"><Edit2 size={18}/></button>
              <button onClick={() => onDeleteMember(m.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 size={18}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
