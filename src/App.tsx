/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FloralPetals } from './components/FloralPetals';
import { CoupleStory } from './components/CoupleStory';
import { Schedule } from './components/Schedule';
import { VenueSection } from './components/VenueSection';
import { GallerySection } from './components/GallerySection';
import { WishesWall } from './components/WishesWall';
import { InvitationCardModal } from './components/InvitationCardModal';
import { QrShareModal } from './components/QrShareModal';
import { MusicToggle } from './components/MusicToggle';
import { Footer } from './components/Footer';

export default function App() {
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [petalsActive, setPetalsActive] = useState(true);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D2421] selection:bg-[#E8C574] selection:text-[#3B1910] font-sans">
      {/* Top Header & Hero Zone with Indian Festive Floral Shower */}
      <div className="relative overflow-hidden">
        {/* Subtle festive floral petal falling animation effect across header and hero section */}
        <FloralPetals isActive={petalsActive} />

        {/* Top Navigation */}
        <Navbar
          onOpenCardModal={() => setIsCardModalOpen(true)}
          onOpenQrModal={() => setIsQrModalOpen(true)}
        />

        {/* Main Hero Section */}
        <main>
          {/* Hero Section with Couple, Parents & Countdown */}
          <Hero
            onOpenCardModal={() => setIsCardModalOpen(true)}
            onOpenQrModal={() => setIsQrModalOpen(true)}
          />
        </main>
      </div>

      {/* Main Content Sections */}
      <div>
        {/* Ceremony & Family Honors */}
        <CoupleStory />

        {/* Ceremonial Itinerary & Muhurats */}
        <Schedule />

        {/* Venue, Directions & Aditya Villa */}
        <VenueSection />

        {/* Interactive Photo Sharing Gallery */}
        <GallerySection />

        {/* Guestbook & Wishes Wall */}
        <WishesWall />
      </div>

      {/* Footer */}
      <Footer />

      {/* Floating Ambient Indian Music & Petals Controls */}
      <MusicToggle
        isPetalsActive={petalsActive}
        onTogglePetals={() => setPetalsActive(!petalsActive)}
      />

      {/* Traditional Wedding / Engagement Card Modal */}
      <InvitationCardModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
        onOpenQrModal={() => setIsQrModalOpen(true)}
      />

      {/* Unique QR Code Share & Download Modal */}
      <QrShareModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
      />
    </div>
  );
}
