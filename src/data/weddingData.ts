import { ScheduleEvent, GalleryPhoto, GuestWish } from '../types/wedding';

// Authentic original photographs uploaded by Toshik & Tanaya
import villaDanceImg from '../assets/images/WhatsApp Image 2026-10-18 at 9.33.34 PM.jpeg';
import redSareeImg from '../assets/images/WhatsApp Image 2026-10-18 at 9.58.38 PM.jpeg';
import urbanCandidImg from '../assets/images/WhatsApp Image 2026-10-18 at 10.08.38 PM.jpeg';
import galaReceptionImg from '../assets/images/IMG_9428.PNG';
import ringTrayImg from '../assets/images/engagement_ring_tray_1791903387685.jpg';
import venueVillaImg from '../assets/images/aditya_villa_celebration_lawn_1792428790628.jpg';

// Bundled image assets for production & development
export const IMAGES = {
  heroCouple: redSareeImg,
  venueVilla: venueVillaImg,
  ringTray: ringTrayImg,
  mandapSetup: redSareeImg,
  haldiCelebration: villaDanceImg,
  photo1: redSareeImg,
  photo2: villaDanceImg,
  photo3: urbanCandidImg,
  photo4: galaReceptionImg,
};

export const WEDDING_SCHEDULE: ScheduleEvent[] = [
  {
    id: "ring-exchange",
    title: "Sacred Engagement & Ring Exchange Ceremony",
    marathiTitle: "Ring Ceremony",
    date: "Tuesday, 10 November 2026",
    time: "4:30 PM Sharp",
    location: "Floral Celebration Stage, Aditya Villa",
    description: "Toshik & Tanaya exchange their engagement rings amidst showers of fresh rose petals, soft romantic melodies, and enthusiastic cheers from family and friends.",
    dressCode: "Royal Festive Attire, Pastels & Fine Jewelry",
    iconName: "Heart",
  },
];

export const INITIAL_GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "photo-1",
    title: "Sacred Tilak & Saree Ceremony",
    caption: "Tanaya in rich auspicious red silk and Toshik with ceremonial tilak before the floral ring arch.",
    category: "ceremony",
    imageUrl: redSareeImg,
    uploadedBy: "Toshik & Tanaya",
    timestamp: "Auspicious Sakharpuda",
    likes: 185,
  },
  {
    id: "photo-2",
    title: "Sunlit Courtyard Dance at the Villa",
    caption: "Toshik & Tanaya sharing a joyful, candid dance under the morning sky at Aditya Villa.",
    category: "candid",
    imageUrl: villaDanceImg,
    uploadedBy: "Toshik & Tanaya",
    timestamp: "Villa Courtyard",
    likes: 164,
  },
  {
    id: "photo-3",
    title: "A Flower for Forever",
    caption: "Intimate and tender moments together with sweet smiles and shared laughter.",
    category: "candid",
    imageUrl: urbanCandidImg,
    uploadedBy: "Toshik & Tanaya",
    timestamp: "Romantic Promenade",
    likes: 142,
  },
  {
    id: "photo-4",
    title: "Gala Evening Celebration",
    caption: "Dressed in elegance for the evening celebration amidst warm fairy lights and festivities.",
    category: "reception",
    imageUrl: galaReceptionImg,
    uploadedBy: "Toshik & Tanaya",
    timestamp: "Evening Soirée",
    likes: 159,
  },
];

export const INITIAL_WISHES: GuestWish[] = [
  {
    id: "wish-1",
    author: "Ramesh & Sunita K.",
    relationship: "Family Friends",
    message: "Heartiest congratulations to dearest Toshik & Tanaya on your Engagement! May your bond grow sweeter and deeper with each passing day.",
    createdAt: "2 days ago",
    likes: 22,
  },
  {
    id: "wish-2",
    author: "Pranay & Divya Sarve",
    relationship: "Cousins",
    message: "Super excited for 10 November! Can't wait for the ring exchange and celebrations with our dearest sister Tanaya and brother-in-law Toshik!",
    createdAt: "1 day ago",
    likes: 31,
  },
  {
    id: "wish-3",
    author: "Dr. Arvind Joshi",
    relationship: "Well-wisher",
    message: "May Lord Ganesha bestow boundless happiness, understanding, and prosperity upon Toshik and Tanaya on their auspicious Sakharpuda.",
    createdAt: "Just now",
    likes: 17,
  },
];
