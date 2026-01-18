const handleEditMember = async (member: Member, file?: File) => {
  try {
    let photoUrl = member.photoUrl;
    // যদি নতুন ফাইল সিলেক্ট করা হয়, তবে সেটি আপলোড হবে
    if (file) {
      const storageRef = ref(storage, `members/${member.id}_${Date.now()}`);
      await uploadBytes(storageRef, file);
      photoUrl = await getDownloadURL(storageRef);
    }

    const memberRef = doc(db, 'members', member.id);
    await updateDoc(memberRef, {
      ...member,
      photoUrl // নতুন বা পুরাতন ফটো ইউআরএল আপডেট হবে
    });
    alert("Profile updated successfully!");
  } catch (error) {
    console.error("Update error:", error);
  }
};
