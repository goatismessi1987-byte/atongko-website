export interface Member {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  sscBatch?: string;
  hscBatch?: string;
  college?: string;
  school?: string;
  phone?: string;      // Added for Phone Number
  bloodGroup?: string; // Added for Blood Group
  facebook?: string;   // Added for Facebook Link
}
