import React, { useState } from 'react';
import { Camera, Trash2, Edit } from 'lucide-react';

export const AdminPanel: React.FC<any> = ({ members, onEditMember, onDeleteMember }) => {
  const [editingMember, setEditingMember] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const inputStyle = "w-full bg-[#0f121a] border border-white/10 p-3 rounded-xl text-white outline-none focus:border-yellow-500/50";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h2 className="text-xl font-bold mb-4">Member Settings</h2>
      
      {editingMember && (
        <div className="bg-[#1a1f2e] p-6 rounded-2xl border border-yellow-500/30 space-y-4 mb-10">
          <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-dashed border-white/10">
            <div className="w-16 h-16 rounded-xl bg-slate-800 overflow-hidden flex items-center justify-center">
              {selectedFile ? <img src={URL.createObjectURL(selectedFile)} className="w-full h-full object-cover" /> : <img src={editingMember.photoUrl} className="w-full h-full object-cover" />}
            </div>
            <label className="bg-white/10 text-white px-4 py-2 rounded-lg text-xs font-bold cursor-pointer">
              CHANGE PHOTO
              <input type="file" className="hidden" onChange={e => setSelectedFile(e.target.files?.[0] || null)} />
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className={inputStyle} value={editingMember.name} onChange={e => setEditingMember({...editingMember, name: e.target.value})} />
            <input className={inputStyle} value={editingMember.role} onChange={e => setEditingMember({...editingMember, role: e.target.value})} />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button onClick={() => setEditingMember(null)} className="text-slate-400 font-bold px-4">Cancel</button>
            <button onClick={() => { onEditMember(editingMember, selectedFile); setEditingMember(null); }} className="bg-yellow-500 text-black px-8 py-2 rounded-xl font-bold">SAVE CHANGES</button>
          </div>
        </div>
      )}

      <div className="grid gap-2">
        {members.map((m: any) => (
          <div key={m.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
            <div className="flex items-center gap-3">
              <img src={m.photoUrl} className="w-10 h-10 rounded-lg object-cover" />
              <div><p className="font-bold text-sm text-white">{m.name}</p><p className="text-[10px] text-slate-500 uppercase">{m.role}</p></div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditingMember(m)} className="text-yellow-500 p-2"><Edit size={18}/></button>
              <button onClick={() => onDeleteMember(m.id)} className="text-red-500 p-2"><Trash2 size={18}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
