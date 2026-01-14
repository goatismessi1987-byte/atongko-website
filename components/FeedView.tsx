
import React from 'react';
import { Notice } from '../types';
import { Megaphone, Calendar, User, ArrowUpRight } from 'lucide-react';

interface FeedViewProps {
  notices: Notice[];
  isAdmin: boolean;
  onPostNotice?: (notice: Partial<Notice>) => void;
}

export const FeedView: React.FC<FeedViewProps> = ({ notices, isAdmin, onPostNotice }) => {
  const [newNotice, setNewNotice] = React.useState({ title: '', content: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNotice.title && newNotice.content && onPostNotice) {
      onPostNotice(newNotice);
      setNewNotice({ title: '', content: '' });
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2 mb-4">
        <h2 className="text-3xl font-bold tracking-tight">Notice Board</h2>
        <p className="text-slate-400">Latest updates from the club management and board.</p>
      </div>

      {isAdmin && (
        <div className="glass rounded-2xl p-6 border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full gold-bg flex items-center justify-center text-slate-950">
                <Megaphone size={20} />
              </div>
              <h3 className="font-semibold text-lg">Post an Update</h3>
            </div>
            <input
              type="text"
              placeholder="Notice Title"
              value={newNotice.title}
              onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-yellow-500/50 transition-all"
            />
            <textarea
              placeholder="What's happening in the club?"
              rows={3}
              value={newNotice.content}
              onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-yellow-500/50 transition-all resize-none"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="gold-bg text-slate-950 px-6 py-2.5 rounded-xl font-bold hover:brightness-110 transition-all active:scale-95"
              >
                Post Announcement
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-6">
        {notices.map((notice) => (
          <div key={notice.id} className="glass rounded-2xl overflow-hidden border border-white/10 group hover:border-white/20 transition-all duration-300">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                  notice.priority === 'high' ? 'bg-red-500/20 text-red-400' : 'bg-slate-700/50 text-slate-400'
                }`}>
                  {notice.priority} Priority
                </div>
                <button className="text-slate-500 hover:text-white transition-colors">
                  <ArrowUpRight size={20} />
                </button>
              </div>
              <h4 className="text-xl font-bold mb-3 group-hover:gold-text transition-colors">{notice.title}</h4>
              <p className="text-slate-300 leading-relaxed mb-6 whitespace-pre-wrap">{notice.content}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-2 text-slate-500">
                  <User size={14} />
                  <span className="text-xs font-medium">{notice.author}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <Calendar size={14} />
                  <span className="text-xs font-medium">{notice.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {notices.length === 0 && (
          <div className="text-center py-20 text-slate-500 border-2 border-dashed border-white/5 rounded-3xl">
            No notices found at this time.
          </div>
        )}
      </div>
    </div>
  );
};
