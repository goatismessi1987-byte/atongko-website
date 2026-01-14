import React from 'react';
import { Member } from '../types';
import { X, Phone, Heart, Facebook, GraduationCap, School } from 'lucide-react';

export const ProfileModal: React.FC<{ member: Member; onClose: () => void }> = ({ member, onClose }) => {
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 backdrop-blur-xl bg-black/40">
      <div className="w-full max-w-lg glass rounded-[40px] overflow-hidden border border-white/20 animate-in zoom-in duration-300 shadow-2xl">
        <div className="relative h-48 gold-bg">
          <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white backdrop-blur-md">
            <X size={20} />
          </button>
        </div>
        
        <div className="px-8 pb-8 -mt-20">
          <div className="relative inline-block mb-6">
             <img src={member.photoUrl} className="w-40 h-40 rounded-[32px] border-8 border-[#0a0f1a] object-cover shadow-2xl" alt={member.name} />
             <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-black px-4 py-1 rounded-full text-xs font-black shadow-lg">
                {member.role.toUpperCase()}
             </div>
          </div>

          <h2 className="text-3xl font-black text-white mb-2">{member.name}</h2>
          
          <div className="flex flex-wrap gap-3 mb-8">
            {member.phone && <a href={`tel:${member.phone}`} className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-yellow-500 hover:bg-yellow-500 hover:text-black transition-all"><Phone size={16} /> {member.phone}</a>}
            {member.bloodGroup && <span className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-xl text-red-500 font-bold"><Heart size={16} /> {member.bloodGroup}</span>}
            {member.facebook && <a href={member.facebook} target="_blank" className="bg-blue-600 p-2.5 rounded-xl text-white hover:scale-110 transition-transform"><Facebook size={20} /></a>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="glass-light p-4 rounded-2xl border border-white/5">
              <GraduationCap className="text-slate-500 mb-2" size={20} />
              <p className="text-xs text-slate-500 uppercase font-bold">College / HSC</p>
              <p className="text-white font-medium">{member.college || 'N/A'}</p>
              <p className="text-yellow-500 text-xs mt-1">Batch: {member.hscBatch || '-'}</p>
            </div>
            <div className="glass-light p-4 rounded-2xl border border-white/5">
              <School className="text-slate-500 mb-2" size={20} />
              <p className="text-xs text-slate-500 uppercase font-bold">School / SSC</p>
              <p className="text-white font-medium">{member.school || 'N/A'}</p>
              <p className="text-yellow-500 text-xs mt-1">Batch: {member.sscBatch || '-'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
