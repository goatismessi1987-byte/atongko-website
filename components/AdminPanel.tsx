import React, { useState } from 'react';
import { Member, AppView } from '../types';
import { Camera, Save, X } from 'lucide-react';

export const AdminPanel: React.FC<any> = ({ members, onAddMember, onEditMember, onDeleteMember }) => {
  const [editingMember, setEditingMember] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSave = () => {
    // Ensuring all fields are included in the save process
    if (editingMember.id) {
      onEditMember(editingMember, selectedFile || undefined);
    } else {
      onAddMember(editingMember, selectedFile || undefined);
    }
    setEditingMember(null);
    setSelectedFile(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 text-white">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Member Management</h2>
        <button 
          onClick={() => setEditingMember({ name: '', role: '', phone: '', bloodGroup: '', facebook: '', college: '', school: '', sscBatch: '', hscBatch: '' })}
          className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-2 rounded-xl font-bold transition-all"
        >
          + Add Member
        </button>
      </div>

      {editingMember && (
        <div className="mb-10 p-8 bg-[#1a1f2e] rounded-[32px] border border-white/10 shadow-2xl animate-in fade-in zoom-in duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Photo Upload Section */}
            <div className="md:col-span-2 flex items-center gap-6 p-6 bg-white/5 rounded-2xl border border-dashed border-white/20">
              <div className="w-20 h-20 rounded-2xl bg-slate-800 flex items-center justify-center overflow-hidden border border-white/10">
                {selectedFile ? (
                  <img src={URL.createObjectURL(selectedFile)} className="w-full h-full object-cover" />
                ) : editingMember.photoUrl ? (
                  <img src={editingMember.photoUrl} className="w-full h-full object-cover" />
                ) : <Camera className="text-slate-500" />}
              </div>
              <label className="bg-yellow-500 text-black px-5 py-2.5 rounded-xl text-sm font-black cursor-pointer hover:scale-105 transition-transform">
                SELECT PHOTO
                <input type="file" className="hidden" accept="image/*" onChange={e => setSelectedFile(e.target.files?.[0] || null)} />
              </label>
            </div>

            {/* Input Fields with Fixed Text Color */}
            {[
              { label: 'Full Name', key: 'name' },
              { label: 'Role', key: 'role' },
              { label: 'Phone Number', key: 'phone' },
              { label: 'Blood Group', key: 'bloodGroup' },
              { label: 'SSC Batch', key: 'sscBatch' },
              { label: 'HSC Batch', key: 'hscBatch' },
              { label: 'College', key: 'college' },
              { label: 'School', key: 'school' }
            ].map((field) => (
              <div key={field.key} className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase ml-1">{field.label}</label>
                <input 
                  className="w-full bg-[#0f121a] border border-white/10 p-4 rounded-xl text-white placeholder:text-slate-600 outline-none focus:border-yellow-500/50 transition-colors"
                  placeholder={`Enter ${field.label}`}
                  value={editingMember[field.key] || ''}
                  onChange={e => setEditingMember({...editingMember, [field.key]: e.target.value})}
                />
              </div>
            ))}

            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase ml-1">Facebook Profile URL</label>
              <input 
                className="w-full bg-[#0f121a] border border-white/10 p-4 rounded-xl text-white outline-none focus:border-yellow-500/50"
                placeholder="https://facebook.com/username"
                value={editingMember.facebook || ''}
                onChange={e => setEditingMember({...editingMember, facebook: e.target.value})}
              />
            </div>
          </div>

          <div className="flex gap-4 justify-end mt-8">
            <button onClick={() => setEditingMember(null)} className="px-6 py-2 text-slate-400 font-bold hover:text-white transition-colors">Cancel</button>
            <button onClick={handleSave} className="bg-yellow-500 text-black px-10 py-3 rounded-xl font-black shadow-lg shadow-yellow-500/10 hover:scale-105 transition-all">
              SAVE CHANGES
            </button>
          </div>
        </div>
      )}

      {/* Member List Display */}
      <div className="grid grid-cols-1 gap-3">
        {members.map((m: Member) => (
          <div key={m.id} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl">
            <div className="flex items-center gap-4">
              <img src={m.photoUrl} className="w-12 h-12 rounded-xl object-cover border border-white/10" alt="" />
              <div>
                <p className="font-bold">{m.name}</p>
                <p className="text-xs text-slate-500 uppercase">{m.role}</p>
              </div>
            </div>
            <button onClick={() => setEditingMember(m)} className="text-yellow-500 font-bold text-sm px-4 py-2 hover:bg-yellow-500/10 rounded-lg">Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
};
