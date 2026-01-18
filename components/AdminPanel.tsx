import React, { useState } from 'react';
import { Camera, Image as ImageIcon, Trash2 } from 'lucide-react';

export const AdminPanel: React.FC<any> = ({ members, onAddMember, onEditMember, onAddGalleryImage, gallery = [] }) => {
  const [editingMember, setEditingMember] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [galleryFile, setGalleryFile] = useState<File | null>(null);

  const handleMemberSave = () => {
    if (editingMember.id) onEditMember(editingMember, selectedFile || undefined);
    else onAddMember(editingMember, selectedFile || undefined);
    setEditingMember(null);
    setSelectedFile(null);
  };

  const handleGalleryUpload = () => {
    if (galleryFile) {
      onAddGalleryImage(galleryFile);
      setGalleryFile(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-10">
      {/* Member Section */}
      <section className="bg-[#1a1f2e] p-6 rounded-[32px] border border-white/10">
        <h2 className="text-xl font-bold text-white mb-6">Member Settings</h2>
        {/* ... আপনার আগের মেম্বার লিস্টের কোড এখানে থাকবে ... */}
      </section>

      {/* Gallery Upload Section */}
      <section className="bg-[#1a1f2e] p-6 rounded-[32px] border border-white/10">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <ImageIcon size={20} /> Upload to Gallery
        </h2>
        <div className="flex flex-col md:flex-row gap-4 items-center p-6 bg-white/5 rounded-2xl border border-dashed border-white/20">
          <input 
            type="file" 
            className="text-white text-sm" 
            onChange={(e) => setGalleryFile(e.target.files?.[0] || null)} 
          />
          <button 
            onClick={handleGalleryUpload}
            disabled={!galleryFile}
            className="bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 text-white px-6 py-2 rounded-xl font-bold transition-all"
          >
            Upload to Gallery
          </button>
        </div>
      </section>
    </div>
  );
};
