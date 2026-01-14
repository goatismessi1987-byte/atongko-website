
import React from 'react';
import { Member } from '../types';
import { Search, GraduationCap, School, ChevronRight, User } from 'lucide-react';

interface MemberDirectoryProps {
  members: Member[];
  onSelectMember: (member: Member) => void;
}

export const MemberDirectory: React.FC<MemberDirectoryProps> = ({ members, onSelectMember }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredMembers = members.filter(member => {
    return member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
           member.hscBatch.includes(searchTerm) ||
           member.college.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">Member Directory</h2>
          <p className="text-slate-400">Network with elite members across generations.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="Search by name, batch or college..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-yellow-500/50"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMembers.map((member) => (
          <div 
            key={member.id}
            onClick={() => onSelectMember(member)}
            className="glass group rounded-3xl overflow-hidden border border-white/5 hover:border-yellow-500/30 transition-all duration-500 cursor-pointer flex flex-col h-full"
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={member.photoUrl} 
                alt={member.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
              <div className="absolute top-4 right-4">
                <span className="px-2 py-1 rounded-lg text-[10px] font-bold uppercase bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                  HSC Batch {member.hscBatch}
                </span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold mb-1 group-hover:gold-text transition-colors">{member.name}</h3>
              <p className="text-sm text-slate-400 mb-4 font-medium uppercase tracking-wider line-clamp-1">{member.role}</p>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-slate-500">
                  <GraduationCap size={14} className="text-slate-600 shrink-0" />
                  <span className="text-xs truncate">{member.college}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <School size={14} className="text-slate-600 shrink-0" />
                  <span className="text-xs truncate">{member.school}</span>
                </div>
              </div>

              <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                <span className="text-[10px] text-slate-600 uppercase font-bold tracking-widest">SSC Batch {member.sscBatch}</span>
                <ChevronRight size={18} className="text-slate-600 group-hover:translate-x-1 group-hover:text-yellow-500 transition-all" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-20 glass rounded-3xl border border-dashed border-white/10">
          <p className="text-slate-500">No members matching your criteria were found.</p>
        </div>
      )}
    </div>
  );
};
