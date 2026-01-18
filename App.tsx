import React, { useState, useEffect } from 'react';
import { Member, AppView } from './types';
import { AdminPanel } from './components/AdminPanel';
import { MemberDirectory } from './components/MemberDirectory';
import { db, storage } from './firebase';
import { collection, onSnapshot, updateDoc, deleteDoc, doc, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function App() {
  const [members, setMembers] = useState<Member[]>([]);
  const [view, setView] = useState<AppView>(AppView.DIRECTORY);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'members'), (snapshot) => {
      const memberData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Member));
      setMembers(memberData);
    });
    return () => unsub();
  }, []);

  const handleEditMember = async (member: Member, file?: File) => {
    try {
      let photoUrl = member.photoUrl;
      if (file) {
        const storageRef = ref(storage, `members/${member.id}_${Date.now()}`);
        await uploadBytes(storageRef, file);
        photoUrl = await getDownloadURL(storageRef);
      }
      const memberRef = doc(db, 'members', member.id);
      const { id, ...data } = member;
      await updateDoc(memberRef, { ...data, photoUrl });
      alert("সফলভাবে আপডেট হয়েছে!");
    } catch (e) { alert("আপডেট ব্যর্থ হয়েছে!"); }
  };

  const handleDeleteMember = async (id: string) => {
    if (window.confirm("আপনি কি এই মেম্বারকে ডিলিট করতে চান?")) {
      await deleteDoc(doc(db, 'members', id));
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0c12] text-white">
      <nav className="p-4 border-b border-white/10 flex gap-4 bg-[#11141d]">
        <button onClick={() => setView(AppView.DIRECTORY)} className={`px-4 py-2 rounded-xl font-bold ${view === AppView.DIRECTORY ? 'bg-yellow-500 text-black' : 'bg-white/5'}`}>Directory</button>
        <button onClick={() => setView(AppView.ADMIN)} className={`px-4 py-2 rounded-xl font-bold ${view === AppView.ADMIN ? 'bg-yellow-500 text-black' : 'bg-white/5'}`}>Admin Settings</button>
      </nav>
      <main className="container mx-auto py-6">
        {view === AppView.DIRECTORY ? <MemberDirectory members={members} /> : 
        <AdminPanel members={members} onEditMember={handleEditMember} onDeleteMember={handleDeleteMember} />}
      </main>
    </div>
  );
}
export default App;
