import { ScheduleEvent, GalleryPhoto, GuestWish } from '../types/wedding';

// Authentic original photographs uploaded by Toshik & Tanaya
import villaDanceImg from '../assets/images/WhatsApp Image 2026-10-18 at 9.33.34 PM.jpeg';
import redSareeImg from '../assets/images/WhatsApp Image 2026-10-18 at 9.58.38 PM.jpeg';
import urbanCandidImg from '../assets/images/WhatsApp Image 2026-10-18 at 10.08.38 PM.jpeg';
import galaReceptionImg from '../assets/images/IMG_9428.PNG';
import rosesCelebrationImg from '../assets/images/toshik_tanaya_birthday_roses_celebration.jpeg';
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
  photo2: rosesCelebrationImg,
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
    objectPosition: "center 30%",
  },
  {
    id: "photo-2",
    title: "Sweet Moments & Celebration Roses",
    caption: "Tanaya with fresh pink roses beside Toshik celebrating love and cherished milestones together.",
    category: "candid",
    imageUrl: rosesCelebrationImg,
    uploadedBy: "Toshik & Tanaya",
    timestamp: "Celebration Milestone",
    likes: 198,
    objectPosition: "center 48%",
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
    objectPosition: "center 40%",
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
    objectPosition: "center 35%",
  },
];

export const INITIAL_WISHES: GuestWish[] = [
  {
    id: "wish-1",
    author: "Suhani",
    relationship: "Sister",
    message: "Heartiest congratulations to my dearest sister Tanaya and jiju Toshik on your Engagement! May your bond grow sweeter and deeper with each passing day. So thrilled for both of you!",
    createdAt: "2 days ago",
    likes: 28,
  },
  {
    id: "wish-2",
    author: "Sakshi",
    relationship: "Sister",
    message: "Super excited for 10 November! Can't wait for the ring exchange and celebrations with my sweetest sister Tanaya and brother-in-law Toshik! Love you both to the moon and back!",
    createdAt: "1 day ago",
    likes: 35,
  },
  {
    id: "wish-3",
    author: "Shruti",
    relationship: "Sister",
    message: "Wishing my beautiful sister Tanaya and Toshik jiju a lifetime of boundless happiness, laughter, and prosperity on your auspicious Sakharpuda. Best couple forever!",
    createdAt: "Just now",
    likes: 24,
  },
];
