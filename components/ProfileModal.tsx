
import React from 'react';
import { Member } from '../types';
import { X, Mail, Phone, Calendar, School, Award, ArrowLeft, GraduationCap, Building2 } from 'lucide-react';

interface ProfileModalProps {
  member: Member;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ member, onClose }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" onClick={onClose} />
      
      <div className="relative w-full max-w-4xl glass rounded-[40px] overflow-hidden border border-white/10 animate-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-3 rounded-full glass border border-white/10 text-slate-400 hover:text-white z-10"
        >
          <X size={24} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-5 h-full">
          {/* Cover/Photo Section */}
          <div className="md:col-span-2 relative h-64 md:h-auto">
            <img 
              src={member.photoUrl} 
              alt={member.name} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-8 left-8">
               <span className="px-3 py-1 rounded-full gold-bg text-slate-950 text-[10px] font-black uppercase tracking-widest shadow-xl">
                Class of {member.hscBatch}
              </span>
            </div>
          </div>

          {/* Details Section */}
          <div className="md:col-span-3 p-8 md:p-12 overflow-y-auto max-h-[90vh]">
            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-2 tracking-tight">{member.name}</h2>
              <p className="text-xl gold-text font-medium">{member.role}</p>
            </div>

            <div className="space-y-8">
              <section>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-6 border-b border-white/5 pb-2 flex items-center gap-2">
                  <GraduationCap size={16} /> Academic Background
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  <div className="glass p-5 rounded-2xl border border-white/5 group hover:border-yellow-500/20 transition-all">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-yellow-500 shrink-0">
                        <Building2 size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-600 uppercase font-black tracking-widest mb-1">College Education</p>
                        <h4 className="text-lg font-bold text-slate-100">{member.college}</h4>
                        <p className="text-sm text-slate-400">Higher Secondary Batch: {member.hscBatch}</p>
                      </div>
                    </div>
                  </div>

                  <div className="glass p-5 rounded-2xl border border-white/5 group hover:border-yellow-500/20 transition-all">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-yellow-500 shrink-0">
                        <School size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-600 uppercase font-black tracking-widest mb-1">Schooling History</p>
                        <h4 className="text-lg font-bold text-slate-100">{member.school}</h4>
                        <p className="text-sm text-slate-400">Secondary Batch: {member.sscBatch}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-6 border-b border-white/5 pb-2 flex items-center gap-2">
                   Identification & Contact
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <div className="flex items-center gap-4 text-slate-300 glass p-4 rounded-xl border border-white/5">
                      <Mail size={18} className="text-yellow-500/50" />
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-600 uppercase font-bold">Email</span>
                        <span className="text-xs truncate max-w-[150px]">{member.email}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-slate-300 glass p-4 rounded-xl border border-white/5">
                      <Phone size={18} className="text-yellow-500/50" />
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-600 uppercase font-bold">Phone</span>
                        <span className="text-xs">{member.phone}</span>
                      </div>
                    </div>
                </div>
              </section>
            </div>

            <div className="mt-12 flex gap-4">
              <button className="flex-1 gold-bg text-slate-950 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-yellow-500/10">
                Contact Member
              </button>
              <button 
                onClick={onClose}
                className="px-6 flex items-center justify-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft size={18} /> Exit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
