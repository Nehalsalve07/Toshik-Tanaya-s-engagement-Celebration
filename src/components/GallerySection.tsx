import React, { useState, useEffect, useRef } from 'react';
import { Camera, Heart, Download, X, Plus, Filter, Image as ImageIcon, ChevronLeft, ChevronRight, Check, Trash2, RotateCcw, Sparkles } from 'lucide-react';
import { GalleryPhoto } from '../types/wedding';
import { INITIAL_GALLERY_PHOTOS } from '../data/weddingData';

const GALLERY_STORAGE_KEY = 'wedding_gallery_toshik_tanaya_v4';

export const GallerySection: React.FC = () => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [lightboxPhoto, setLightboxPhoto] = useState<GalleryPhoto | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Upload Form state
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCaption, setUploadCaption] = useState('');
  const [uploadCategory, setUploadCategory] = useState<'ceremony' | 'venue' | 'haldi' | 'reception' | 'candid'>('candid');
  const [uploadName, setUploadName] = useState('');
  const [selectedImageSrc, setSelectedImageSrc] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load photos from storage or initialize
  useEffect(() => {
    try {
      const stored = localStorage.getItem(GALLERY_STORAGE_KEY);
      if (stored) {
        setPhotos(JSON.parse(stored));
      } else {
        setPhotos(INITIAL_GALLERY_PHOTOS);
        localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(INITIAL_GALLERY_PHOTOS));
      }
    } catch {
      setPhotos(INITIAL_GALLERY_PHOTOS);
    }
  }, []);

  const savePhotos = (updated: GalleryPhoto[]) => {
    setPhotos(updated);
    try {
      localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // quota safeguard
    }
  };

  const [photoToDelete, setPhotoToDelete] = useState<string | null>(null);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = photos.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p));
    savePhotos(updated);
    if (lightboxPhoto && lightboxPhoto.id === id) {
      setLightboxPhoto({ ...lightboxPhoto, likes: lightboxPhoto.likes + 1 });
    }
  };

  const handleDeletePhoto = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updated = photos.filter((p) => p.id !== id);
    savePhotos(updated);
    if (lightboxPhoto && lightboxPhoto.id === id) {
      setLightboxPhoto(null);
    }
    setPhotoToDelete(null);
  };

  const handleResetDefaultPhotos = () => {
    savePhotos(INITIAL_GALLERY_PHOTOS);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (files.length === 1) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImageSrc(event.target?.result as string);
      };
      reader.readAsDataURL(files[0]);
    } else {
      // Multiple original photos selected: load all simultaneously
      const newItems: GalleryPhoto[] = [];
      let loaded = 0;
      Array.from(files).forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const cleanName = file.name
            .replace(/\.[^/.]+$/, '')
            .replace(/WhatsApp Image \d{4}-\d{2}-\d{2} at /i, 'Cherished Moment ')
            .replace(/IMG_/i, 'Portrait ');
          newItems.push({
            id: `photo-${Date.now()}-${index}`,
            title: cleanName || 'Toshik & Tanaya',
            caption: 'Original authentic memory of Toshik & Tanaya.',
            category: index % 2 === 0 ? 'ceremony' : 'candid',
            imageUrl: event.target?.result as string,
            uploadedBy: 'Toshik & Tanaya',
            timestamp: 'Just now',
            likes: 120 + index * 10,
          });
          loaded++;
          if (loaded === files.length) {
            const updated = [...newItems, ...photos];
            savePhotos(updated);
            setIsUploadModalOpen(false);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImageSrc) return;

    const newPhoto: GalleryPhoto = {
      id: `photo-${Date.now()}`,
      title: uploadTitle.trim() || 'Celebration Memory',
      caption: uploadCaption.trim() || 'A cherished capture from the wedding ceremony.',
      category: uploadCategory,
      imageUrl: selectedImageSrc,
      uploadedBy: uploadName.trim() || 'Wedding Guest',
      timestamp: 'Just now',
      likes: 1,
    };

    const updated = [newPhoto, ...photos];
    savePhotos(updated);
    setUploadSuccess(true);

    setTimeout(() => {
      setUploadSuccess(false);
      setIsUploadModalOpen(false);
      setUploadTitle('');
      setUploadCaption('');
      setUploadName('');
      setSelectedImageSrc(null);
    }, 1200);
  };

  const filteredPhotos = photos.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.category === activeFilter;
  });

  // Lightbox navigation
  const currentIndex = lightboxPhoto ? filteredPhotos.findIndex((p) => p.id === lightboxPhoto.id) : -1;

  const navigateLightbox = (direction: 'next' | 'prev') => {
    if (currentIndex === -1) return;
    if (direction === 'next') {
      const nextIdx = (currentIndex + 1) % filteredPhotos.length;
      setLightboxPhoto(filteredPhotos[nextIdx]);
    } else {
      const prevIdx = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
      setLightboxPhoto(filteredPhotos[prevIdx]);
    }
  };

  return (
    <section id="gallery" className="py-16 md:py-24 bg-gradient-to-b from-[#10152F] via-[#161B3D] to-[#21183F] border-t border-[#D8C19A]/20">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="space-y-2.5 sm:space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 text-xs font-semibold tracking-widest uppercase text-[#D8C19A] bg-[#10152F]/70 border border-[#D8C19A]/30 rounded-full">
              <Camera className="w-3.5 h-3.5 text-[#FFEAA7]" />
              <span className="font-montserrat">Memories & Moments</span>
            </div>
            <h2 className="font-script text-3xl sm:text-5xl md:text-6xl text-[#FFF5E9] leading-tight">
              Celebration Photo Gallery
            </h2>
            <p className="font-cormorant text-xs sm:text-base text-[#D8C19A]/90 leading-relaxed">
              Explore joyous highlights from the ceremonies and share your own candid photographs with Toshik & Tanaya to create our lifelong digital engagement album!
            </p>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 flex-wrap">
            {photos.length < INITIAL_GALLERY_PHOTOS.length && (
              <button
                onClick={handleResetDefaultPhotos}
                className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-[#D8C19A] hover:bg-[#21183F] border border-[#D8C19A]/40 rounded-full transition-colors cursor-pointer touch-manipulation"
                title="Restore default engagement photos"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restore Photos</span>
              </button>
            )}
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#10152F] bg-gradient-to-r from-[#FFF5E9] via-[#D8C19A] to-[#FFF5E9] hover:from-white hover:to-[#D8C19A] rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer border border-[#D8C19A] touch-manipulation active:scale-95"
            >
              <Plus className="w-4 h-4 text-[#342044]" />
              <span>Share Your Photo</span>
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 text-xs font-medium scrollbar-none">
          <div className="flex items-center gap-1.5 p-1 bg-[#10152F]/80 border border-[#D8C19A]/30 rounded-2xl shrink-0 backdrop-blur-sm">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-1.5 rounded-xl transition-all cursor-pointer font-montserrat ${
                activeFilter === 'all'
                  ? 'bg-[#D8C19A] text-[#10152F] font-bold shadow-sm'
                  : 'text-[#FFF5E9]/80 hover:text-[#FFF5E9]'
              }`}
            >
              All Photos ({photos.length})
            </button>
            <button
              onClick={() => setActiveFilter('ceremony')}
              className={`px-4 py-1.5 rounded-xl transition-all cursor-pointer font-montserrat ${
                activeFilter === 'ceremony'
                  ? 'bg-[#D8C19A] text-[#10152F] font-bold shadow-sm'
                  : 'text-[#FFF5E9]/80 hover:text-[#FFF5E9]'
              }`}
            >
              Ring Ceremony & Altar
            </button>
            <button
              onClick={() => setActiveFilter('haldi')}
              className={`px-4 py-1.5 rounded-xl transition-all cursor-pointer font-montserrat ${
                activeFilter === 'haldi'
                  ? 'bg-[#D8C19A] text-[#10152F] font-bold shadow-sm'
                  : 'text-[#FFF5E9]/80 hover:text-[#FFF5E9]'
              }`}
            >
              Sakharpuda Rituals
            </button>
            <button
              onClick={() => setActiveFilter('venue')}
              className={`px-4 py-1.5 rounded-xl transition-all cursor-pointer font-montserrat ${
                activeFilter === 'venue'
                  ? 'bg-[#D8C19A] text-[#10152F] font-bold shadow-sm'
                  : 'text-[#FFF5E9]/80 hover:text-[#FFF5E9]'
              }`}
            >
              Aditya Villa
            </button>
            <button
              onClick={() => setActiveFilter('candid')}
              className={`px-4 py-1.5 rounded-xl transition-all cursor-pointer font-montserrat ${
                activeFilter === 'candid'
                  ? 'bg-[#D8C19A] text-[#10152F] font-bold shadow-sm'
                  : 'text-[#FFF5E9]/80 hover:text-[#FFF5E9]'
              }`}
            >
              Guest Candids
            </button>
          </div>
        </div>

        {/* Empty state */}
        {filteredPhotos.length === 0 && (
          <div className="text-center py-16 bg-[#FFF5E9] text-[#342044] border-2 border-[#D8C19A] rounded-3xl p-8 max-w-md mx-auto space-y-4 shadow-xl">
            <ImageIcon className="w-12 h-12 text-[#A88B58] mx-auto" />
            <div>
              <h3 className="font-cormorant text-2xl font-bold text-[#342044]">
                No Photos in this Category
              </h3>
              <p className="text-xs text-[#73526E] mt-1">
                Upload your cherished pictures or restore the default engagement album.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleResetDefaultPhotos}
                className="px-4 py-2 text-xs font-medium text-[#342044] border border-[#D8C19A] rounded-full hover:bg-white transition-colors cursor-pointer"
              >
                Restore Default Photos
              </button>
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#342044] rounded-full hover:bg-[#21183F] transition-colors cursor-pointer"
              >
                Upload Photo
              </button>
            </div>
          </div>
        )}

        {/* Photos Grid: Warm Ivory & Gold Frames */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhotos.map((photo, index) => {
            const isLarge = index === 0;

            return (
              <div
                key={photo.id}
                onClick={() => setLightboxPhoto(photo)}
                className={`group relative bg-[#161B3D] border-2 border-[#D8C19A]/50 hover:border-[#D8C19A] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer ${
                  isLarge ? 'sm:col-span-2 sm:row-span-2' : ''
                }`}
              >
                <div
                  className={`relative overflow-hidden bg-[#21183F] ${
                    isLarge ? 'aspect-[4/3] sm:aspect-[16/10]' : 'aspect-[4/3]'
                  }`}
                >
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#10152F]/90 via-[#10152F]/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                  {/* Top Bar: Delete button & Like button */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPhotoToDelete(photo.id);
                      }}
                      className="p-1.5 bg-[#10152F]/70 hover:bg-red-600 backdrop-blur-md rounded-full text-white/90 hover:text-white transition-all cursor-pointer shadow-sm hover:scale-110"
                      title="Delete photo"
                      aria-label="Delete photo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleLike(photo.id, e)}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-[#10152F]/70 hover:bg-[#10152F] border border-[#D8C19A]/40 backdrop-blur-md rounded-full text-white text-xs transition-colors cursor-pointer"
                    >
                      <Heart className="w-3.5 h-3.5 fill-[#F4C8D7] text-[#F4C8D7]" />
                      <span className="tabular-nums font-medium text-[#FFF5E9]">{photo.likes}</span>
                    </button>
                  </div>

                  {/* Bottom details */}
                  <div className="absolute bottom-3 left-4 right-4 text-[#FFF5E9] space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-[#D8C19A] font-semibold block font-montserrat">
                      {photo.category} · {photo.timestamp}
                    </span>
                    <h3 className="font-cormorant text-lg font-bold line-clamp-1 text-[#FFF5E9]">
                      {photo.title}
                    </h3>
                    <p className="text-xs text-[#FFF5E9]/80 line-clamp-1">
                      {photo.caption}
                    </p>
                    <p className="text-[10px] text-[#D8C19A]/70">
                      By {photo.uploadedBy}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lightbox Modal */}
        {lightboxPhoto && (
          <div
            className="fixed inset-0 z-50 bg-[#10152F]/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            onClick={() => setLightboxPhoto(null)}
          >
            <div
              className="relative max-w-5xl w-full bg-[#161B3D] border-2 border-[#D8C19A] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightboxPhoto(null)}
                className="absolute top-4 right-4 z-20 p-2 text-white/80 hover:text-white bg-[#10152F]/70 hover:bg-[#10152F] border border-[#D8C19A]/40 rounded-full transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {filteredPhotos.length > 1 && (
                <>
                  <button
                    onClick={() => navigateLightbox('prev')}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 text-white bg-[#10152F]/70 hover:bg-[#10152F] border border-[#D8C19A]/40 rounded-full transition-colors cursor-pointer"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => navigateLightbox('next')}
                    className="absolute right-4 md:right-auto md:left-[calc(66%-2rem)] top-1/2 -translate-y-1/2 z-20 p-2.5 text-white bg-[#10152F]/70 hover:bg-[#10152F] border border-[#D8C19A]/40 rounded-full transition-colors cursor-pointer"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Image Canvas */}
              <div className="md:w-2/3 bg-black/80 flex items-center justify-center p-2 min-h-[300px]">
                <img
                  src={lightboxPhoto.imageUrl}
                  alt={lightboxPhoto.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl"
                />
              </div>

              {/* Photo Details Sidebar */}
              <div className="md:w-1/3 p-6 sm:p-8 text-[#FFF5E9] flex flex-col justify-between space-y-6 bg-[#21183F] border-l border-[#D8C19A]/30">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-[#D8C19A]">
                    <span className="uppercase tracking-widest font-semibold font-montserrat">
                      {lightboxPhoto.category}
                    </span>
                    <span>{lightboxPhoto.timestamp}</span>
                  </div>

                  <h3 className="font-cormorant text-2xl font-bold text-[#FFF5E9]">
                    {lightboxPhoto.title}
                  </h3>

                  <p className="text-sm text-[#FFF5E9]/80 leading-relaxed font-serif">
                    {lightboxPhoto.caption}
                  </p>

                  <div className="pt-2 border-t border-[#D8C19A]/20 text-xs text-[#D8C19A]/70">
                    <span>Uploaded by: </span>
                    <strong className="text-[#FFF5E9] font-medium">{lightboxPhoto.uploadedBy}</strong>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="space-y-3 pt-4 border-t border-[#D8C19A]/20">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => handleLike(lightboxPhoto.id, e)}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-[#10152F] bg-[#D8C19A] hover:bg-[#FFF5E9] rounded-full transition-colors cursor-pointer"
                    >
                      <Heart className="w-4 h-4 fill-[#342044] text-[#342044]" />
                      <span>Love It ({lightboxPhoto.likes})</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPhotoToDelete(lightboxPhoto.id)}
                      className="inline-flex items-center justify-center p-2.5 text-xs font-medium text-red-300 hover:text-white bg-red-950/40 hover:bg-red-600 border border-red-500/30 rounded-full transition-colors cursor-pointer"
                      title="Delete this photo from album"
                      aria-label="Delete this photo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <a
                      href={lightboxPhoto.imageUrl}
                      download={`Toshik_Tanaya_Engagement_${lightboxPhoto.id}.jpg`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center p-2.5 text-xs font-medium text-[#FFF5E9] bg-white/10 hover:bg-white/20 border border-[#D8C19A]/40 rounded-full transition-colors"
                      title="Download full resolution photo"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Upload Modal in Warm Ivory */}
        {isUploadModalOpen && (
          <div
            className="fixed inset-0 z-50 bg-[#10152F]/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsUploadModalOpen(false)}
          >
            <div
              className="relative max-w-lg w-full bg-[#FFF5E9] text-[#342044] rounded-3xl p-6 md:p-8 shadow-2xl border-2 border-[#D8C19A]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-[#73526E] hover:text-[#342044] rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2 mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#73526E] font-montserrat">
                  Guest Album Contribution
                </span>
                <h3 className="font-cormorant text-2xl font-bold text-[#342044]">
                  Share a Celebration Memory
                </h3>
                <p className="text-xs text-[#73526E]">
                  Upload a photo from your phone or camera to add to the live celebration gallery.
                </p>
              </div>

              {uploadSuccess ? (
                <div className="p-8 text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto border border-emerald-300">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-cormorant text-xl font-bold text-[#342044]">
                    Photo Added Successfully!
                  </h4>
                  <p className="text-xs text-[#73526E]">
                    Your memory is now part of Toshik & Tanaya's official gallery.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleUploadSubmit} className="space-y-4">
                  {/* File Selector */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#342044] block font-montserrat">
                      Choose Photo *
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    {selectedImageSrc ? (
                      <div className="relative rounded-2xl overflow-hidden aspect-[16/9] border border-[#D8C19A]">
                        <img
                          src={selectedImageSrc}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedImageSrc(null);
                            if (fileInputRef.current) fileInputRef.current.value = '';
                          }}
                          className="absolute top-2 right-2 p-1.5 bg-[#10152F]/70 text-white rounded-full text-xs hover:bg-[#10152F]"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full py-8 border-2 border-dashed border-[#D8C19A] rounded-2xl bg-white hover:bg-[#FFF8EF] transition-colors flex flex-col items-center justify-center gap-2 cursor-pointer shadow-sm"
                      >
                        <ImageIcon className="w-8 h-8 text-[#A88B58]" />
                        <span className="text-xs font-semibold text-[#342044]">
                          Tap to select a photo from your gallery or take a picture
                        </span>
                        <span className="text-[10px] text-[#73526E]">
                          Supports JPG, PNG, WEBP (Instant upload)
                        </span>
                      </button>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#342044] block font-montserrat">
                      Photo Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ring Exchange Celebration Smiles"
                      value={uploadTitle}
                      onChange={(e) => setUploadTitle(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs bg-white border border-[#D8C19A] rounded-xl focus:outline-none focus:border-[#342044]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#342044] block font-montserrat">
                        Category
                      </label>
                      <select
                        value={uploadCategory}
                        onChange={(e) => setUploadCategory(e.target.value as any)}
                        className="w-full px-3 py-2 text-xs bg-white border border-[#D8C19A] rounded-xl focus:outline-none focus:border-[#342044]"
                      >
                        <option value="candid">Candid Moments</option>
                        <option value="ceremony">Ring Ceremony</option>
                        <option value="haldi">Sakharpuda Ritual</option>
                        <option value="reception">Reception & Dinner</option>
                        <option value="venue">Venue & Decor</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#342044] block font-montserrat">
                        Your Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Meera Auntie"
                        value={uploadName}
                        onChange={(e) => setUploadName(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-[#D8C19A] rounded-xl focus:outline-none focus:border-[#342044]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#342044] block font-montserrat">
                      Caption / Short Note
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Share a short note about this joyful moment..."
                      value={uploadCaption}
                      onChange={(e) => setUploadCaption(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs bg-white border border-[#D8C19A] rounded-xl focus:outline-none focus:border-[#342044]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!selectedImageSrc}
                    className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#342044] hover:bg-[#21183F] disabled:opacity-50 rounded-full transition-all cursor-pointer shadow-md"
                  >
                    Post to Wedding Album
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {photoToDelete && (
          <div
            className="fixed inset-0 z-50 bg-[#10152F]/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setPhotoToDelete(null)}
          >
            <div
              className="relative max-w-sm w-full bg-[#FFF5E9] text-[#342044] rounded-3xl p-6 md:p-8 shadow-2xl border-2 border-[#D8C19A] space-y-5 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto border border-red-200">
                <Trash2 className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <h4 className="font-cormorant text-2xl font-bold text-[#342044]">
                  Delete Photo?
                </h4>
                <p className="text-xs text-[#73526E] leading-relaxed">
                  Are you sure you want to remove this photograph from the engagement celebration album?
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setPhotoToDelete(null)}
                  className="flex-1 py-2.5 text-xs font-semibold text-[#342044] bg-white hover:bg-[#FFF8EF] border border-[#D8C19A] rounded-full transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleDeletePhoto(photoToDelete)}
                  className="flex-1 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 rounded-full transition-all cursor-pointer shadow-md"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
