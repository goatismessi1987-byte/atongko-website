
import React from 'react';
import { MediaItem } from '../types';
import { Upload, Trash2, X, Maximize2, Calendar, FileImage } from 'lucide-react';

interface MediaGalleryProps {
  media: MediaItem[];
  isAdmin: boolean;
  onAddMedia: (item: Partial<MediaItem>) => void;
  onDeleteMedia: (id: string) => void;
}

export const MediaGallery: React.FC<MediaGalleryProps> = ({ media, isAdmin, onAddMedia, onDeleteMedia }) => {
  const [selectedItem, setSelectedItem] = React.useState<MediaItem | null>(null);
  const [showUpload, setShowUpload] = React.useState(false);
  const [formData, setFormData] = React.useState({ url: '', caption: '' });

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.url) {
      onAddMedia({
        url: formData.url,
        caption: formData.caption || 'New Memory',
        type: 'image'
      });
      setFormData({ url: '', caption: '' });
      setShowUpload(false);
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">Media Gallery</h2>
          <p className="text-slate-400">Captured moments and milestones of our elite community.</p>
        </div>

        {isAdmin && (
          <button 
            onClick={() => setShowUpload(!showUpload)}
            className="gold-bg text-slate-950 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-yellow-500/20"
          >
            <Upload size={20} /> Upload Media
          </button>
        )}
      </div>

      {showUpload && isAdmin && (
        <div className="glass rounded-3xl p-6 border border-white/10 animate-in slide-in-from-top-4 duration-300 max-w-2xl mx-auto">
          <form onSubmit={handleUpload} className="space-y-4">
            <h3 className="font-bold text-lg mb-4">Add to Collection</h3>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Media URL</label>
              <input 
                type="text" 
                required
                value={formData.url}
                onChange={e => setFormData({...formData, url: e.target.value})}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-yellow-500/50"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Caption</label>
              <input 
                type="text" 
                value={formData.caption}
                onChange={e => setFormData({...formData, caption: e.target.value})}
                placeholder="Describe this moment..."
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-yellow-500/50"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button 
                type="button" 
                onClick={() => setShowUpload(false)}
                className="px-6 py-3 text-slate-400 hover:text-white transition-all font-medium"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="gold-bg text-slate-950 px-8 py-3 rounded-xl font-bold"
              >
                Publish to Gallery
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {media.map((item) => (
          <div 
            key={item.id}
            className="group relative glass rounded-[32px] overflow-hidden border border-white/5 hover:border-yellow-500/30 transition-all duration-500 aspect-square"
          >
            <img 
              src={item.url} 
              alt={item.caption} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Overlay Info */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <p className="text-xs text-yellow-500 font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
                <Calendar size={12} /> {item.date}
              </p>
              <h4 className="text-lg font-bold text-white line-clamp-2">{item.caption}</h4>
              
              <div className="flex gap-2 mt-4">
                <button 
                  onClick={() => setSelectedItem(item)}
                  className="p-2.5 rounded-xl glass border border-white/10 text-white hover:bg-white/10 transition-all"
                >
                  <Maximize2 size={18} />
                </button>
                {isAdmin && (
                  <button 
                    onClick={() => onDeleteMedia(item.id)}
                    className="p-2.5 rounded-xl glass border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {media.length === 0 && (
          <div className="col-span-full py-20 text-center glass rounded-[40px] border border-dashed border-white/10 text-slate-500 flex flex-col items-center gap-4">
            <FileImage size={48} className="opacity-20" />
            <p className="text-lg">No media items in the gallery yet.</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl" onClick={() => setSelectedItem(null)} />
          <div className="relative max-w-5xl w-full max-h-[90vh] glass rounded-[40px] overflow-hidden border border-white/10 animate-in zoom-in-95 duration-300 flex flex-col">
            <button 
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 p-2 rounded-full glass border border-white/10 text-white z-10 hover:rotate-90 transition-transform"
            >
              <X size={24} />
            </button>
            <div className="flex-1 overflow-hidden">
              <img 
                src={selectedItem.url} 
                alt={selectedItem.caption} 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-8 border-t border-white/5">
              <div className="flex justify-between items-center gap-4">
                <div>
                  <h3 className="text-2xl font-bold mb-1">{selectedItem.caption}</h3>
                  <p className="text-slate-500 flex items-center gap-2">
                    <Calendar size={14} /> Recorded on {selectedItem.date}
                  </p>
                </div>
                <button 
                   onClick={() => setSelectedItem(null)}
                   className="gold-text font-bold text-sm uppercase tracking-widest hover:underline"
                >
                  Close Viewer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
