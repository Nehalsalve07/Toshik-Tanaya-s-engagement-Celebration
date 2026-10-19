export interface RsvpSubmission {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  attendance: 'attending' | 'declining';
  guestCount: number;
  dietaryPreference: string;
  needsStayAccommodation: boolean;
  songRequest?: string;
  blessingMessage?: string;
  submittedAt: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  caption: string;
  category: 'ceremony' | 'venue' | 'haldi' | 'reception' | 'candid';
  imageUrl: string;
  uploadedBy: string;
  timestamp: string;
  likes: number;
  objectPosition?: string;
}

export interface ScheduleEvent {
  id: string;
  title: string;
  marathiTitle?: string;
  date: string;
  time: string;
  location: string;
  description: string;
  dressCode: string;
  iconName: string;
}

export interface GuestWish {
  id: string;
  author: string;
  relationship: string;
  message: string;
  createdAt: string;
  likes: number;
}
