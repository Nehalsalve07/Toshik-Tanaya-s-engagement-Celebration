import { ScheduleEvent, GalleryPhoto, GuestWish } from '../types/wedding';
import heroCoupleImg from '../assets/images/wedding_hero_couple_1791899469399.jpg';
import venueVillaImg from '../assets/images/wedding_venue_villa_1791899471794.jpg';
import ringTrayImg from '../assets/images/engagement_ring_tray_1791903387685.jpg';
import mandapSetupImg from '../assets/images/wedding_mandap_setup_1791899471844.jpg';
import haldiCelebrationImg from '../assets/images/wedding_haldi_celebration_1791899472126.jpg';

// Bundled image assets for production & development
export const IMAGES = {
  heroCouple: heroCoupleImg,
  venueVilla: venueVillaImg,
  ringTray: ringTrayImg,
  mandapSetup: mandapSetupImg,
  haldiCelebration: haldiCelebrationImg,
};

export const WEDDING_SCHEDULE: ScheduleEvent[] = [
  {
    id: "ring-exchange",
    title: "Sacred Engagement & Ring Exchange Ceremony",
    marathiTitle: "साखरपुडा व अंगठी बदल सोहळा (Ring Ceremony)",
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
    title: "Toshik & Tanaya's Betrothal Portrait",
    caption: "The radiant couple celebrating the beginning of their journey towards forever.",
    category: "ceremony",
    imageUrl: IMAGES.heroCouple,
    uploadedBy: "Karadbhajne & Sarve Families",
    timestamp: "Engagement Session",
    likes: 96,
  },
  {
    id: "photo-2",
    title: "The Auspicious Rings & Floral Tray",
    caption: "Sacred engagement rings surrounded by fragrant jasmine and rose petals for the 4:30 PM ceremony.",
    category: "ceremony",
    imageUrl: IMAGES.ringTray,
    uploadedBy: "Jewelry & Ritual Team",
    timestamp: "Ring Presentation",
    likes: 114,
  },
  {
    id: "photo-3",
    title: "Aditya Villa Decorated for the Engagement",
    caption: "The illuminated grand villa lawn and floral arches prepared to welcome all beloved guests in Besa-Pipla.",
    category: "venue",
    imageUrl: IMAGES.venueVilla,
    uploadedBy: "Decor Team",
    timestamp: "Villa Courtyard",
    likes: 78,
  },
  {
    id: "photo-4",
    title: "Auspicious Sakharpuda Altar & Diyas",
    caption: "Traditional brass lamps, holy flowers, and sacred altar setup for the auspicious tilak rites.",
    category: "ceremony",
    imageUrl: IMAGES.mandapSetup,
    uploadedBy: "Family",
    timestamp: "Altar Setup",
    likes: 85,
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
