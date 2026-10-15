import React, { useState, useEffect, useRef } from 'react';
import { Camera, Heart, Download, X, Plus, Filter, Image as ImageIcon, ChevronLeft, ChevronRight, Check, Trash2, RotateCcw } from 'lucide-react';
import { GalleryPhoto } from '../types/wedding';
import { INITIAL_GALLERY_PHOTOS } from '../data/weddingData';

const GALLERY_STORAGE_KEY = 'wedding_gallery_toshik_tanaya';

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
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImageSrc(event.target?.result as string);
      };
      reader.readAsDataURL(file);
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
    <section id="gallery" className="py-16 md:py-24 bg-[#FAF7F2] border-t border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#AA820A]">
              <Camera className="w-3.5 h-3.5" />
              <span>Memories & Moments</span>
            </div>
            <h2 className="font-playfair text-3xl md:text-4xl text-[#7A1B28]">
              Celebration Photo Gallery
            </h2>
            <p className="text-sm text-[#665753] leading-relaxed">
              Explore joyous highlights from the ceremonies and share your own candid photographs with Toshik & Tanaya to create our lifelong digital engagement album!
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {photos.length < INITIAL_GALLERY_PHOTOS.length && (
              <button
                onClick={handleResetDefaultPhotos}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#7A1B28] hover:bg-[#FAF0DC] border border-[#D4AF37]/50 rounded-xl transition-colors cursor-pointer"
                title="Restore default engagement photos"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restore Default Photos</span>
              </button>
            )}
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#7A1B28] hover:bg-[#58121C] rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Share Your Photo</span>
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 text-xs font-medium scrollbar-none">
          <div className="flex items-center gap-1.5 p-1 bg-white border border-[#E8DFC8] rounded-xl shrink-0">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#7A1B28] text-white shadow-sm'
                  : 'text-[#665753] hover:text-[#2D2421]'
              }`}
            >
              All Photos ({photos.length})
            </button>
            <button
              onClick={() => setActiveFilter('ceremony')}
              className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeFilter === 'ceremony'
                  ? 'bg-[#7A1B28] text-white shadow-sm'
                  : 'text-[#665753] hover:text-[#2D2421]'
              }`}
            >
              Ring Ceremony & Altar
            </button>
            <button
              onClick={() => setActiveFilter('haldi')}
              className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeFilter === 'haldi'
                  ? 'bg-[#7A1B28] text-white shadow-sm'
                  : 'text-[#665753] hover:text-[#2D2421]'
              }`}
            >
              Sakharpuda Rituals
            </button>
            <button
              onClick={() => setActiveFilter('venue')}
              className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeFilter === 'venue'
                  ? 'bg-[#7A1B28] text-white shadow-sm'
                  : 'text-[#665753] hover:text-[#2D2421]'
              }`}
            >
              Aditya Villa
            </button>
            <button
              onClick={() => setActiveFilter('candid')}
              className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeFilter === 'candid'
                  ? 'bg-[#7A1B28] text-white shadow-sm'
                  : 'text-[#665753] hover:text-[#2D2421]'
              }`}
            >
              Guest Candids
            </button>
          </div>
        </div>

        {/* Empty state if all photos in category are deleted */}
        {filteredPhotos.length === 0 && (
          <div className="text-center py-16 bg-white border border-[#E8DFC8] rounded-2xl p-8 max-w-md mx-auto space-y-4">
            <ImageIcon className="w-12 h-12 text-[#D4AF37] mx-auto" />
            <div>
              <h3 className="font-playfair text-xl font-bold text-[#7A1B28]">
                No Photos in this Category
              </h3>
              <p className="text-xs text-[#665753] mt-1">
                Upload your cherished pictures or restore the default wedding album.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleResetDefaultPhotos}
                className="px-4 py-2 text-xs font-medium text-[#7A1B28] border border-[#D4AF37] rounded-xl hover:bg-[#FAF7F2] transition-colors cursor-pointer"
              >
                Restore Default Photos
              </button>
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#7A1B28] rounded-xl hover:bg-[#58121C] transition-colors cursor-pointer"
              >
                Upload Photo
              </button>
            </div>
          </div>
        )}

        {/* Photos Grid: Responsive Bento & Masonry Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhotos.map((photo, index) => {
            const isLarge = index === 0;

            return (
              <div
                key={photo.id}
                onClick={() => setLightboxPhoto(photo)}
                className={`group relative bg-white border border-[#E8DFC8] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer ${
                  isLarge ? 'sm:col-span-2 sm:row-span-2' : ''
                }`}
              >
                <div
                  className={`relative overflow-hidden bg-[#EFE6D5] ${
                    isLarge ? 'aspect-[4/3] sm:aspect-[16/10]' : 'aspect-[4/3]'
                  }`}
                >
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Top Bar inside card: Delete button & Like button */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPhotoToDelete(photo.id);
                      }}
                      className="p-1.5 bg-black/50 hover:bg-red-600 backdrop-blur-md rounded-full text-white/90 hover:text-white transition-all cursor-pointer shadow-sm hover:scale-110"
                      title="Delete photo"
                      aria-label="Delete photo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleLike(photo.id, e)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full text-white text-xs transition-colors cursor-pointer"
                    >
                      <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                      <span className="tabular-nums font-medium">{photo.likes}</span>
                    </button>
                  </div>

                  {/* Bottom details */}
                  <div className="absolute bottom-3 left-3 right-3 text-white space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-[#F2CB60] font-semibold block">
                      {photo.category} · {photo.timestamp}
                    </span>
                    <h3 className="font-playfair text-base font-bold line-clamp-1">
                      {photo.title}
                    </h3>
                    <p className="text-xs text-white/80 line-clamp-1">
                      {photo.caption}
                    </p>
                    <p className="text-[10px] text-white/60">
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
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            onClick={() => setLightboxPhoto(null)}
          >
            <div
              className="relative max-w-5xl w-full bg-[#1A1211] border border-[#3E2B2A] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxPhoto(null)}
                className="absolute top-4 right-4 z-20 p-2 text-white/80 hover:text-white bg-black/50 hover:bg-black/70 rounded-full transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev / Next controls */}
              {filteredPhotos.length > 1 && (
                <>
                  <button
                    onClick={() => navigateLightbox('prev')}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 text-white bg-black/50 hover:bg-black/80 rounded-full transition-colors cursor-pointer"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => navigateLightbox('next')}
                    className="absolute right-4 md:right-auto md:left-[calc(66%-2rem)] top-1/2 -translate-y-1/2 z-20 p-2.5 text-white bg-black/50 hover:bg-black/80 rounded-full transition-colors cursor-pointer"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Image Canvas */}
              <div className="md:w-2/3 bg-black flex items-center justify-center p-2 min-h-[300px]">
                <img
                  src={lightboxPhoto.imageUrl}
                  alt={lightboxPhoto.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg"
                />
              </div>

              {/* Photo Details Sidebar */}
              <div className="md:w-1/3 p-6 text-white flex flex-col justify-between space-y-6 bg-[#241716]">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-[#E8C574]">
                    <span className="uppercase tracking-widest font-semibold">
                      {lightboxPhoto.category}
                    </span>
                    <span>{lightboxPhoto.timestamp}</span>
                  </div>

                  <h3 className="font-playfair text-2xl font-bold text-white">
                    {lightboxPhoto.title}
                  </h3>

                  <p className="text-sm text-white/80 leading-relaxed">
                    {lightboxPhoto.caption}
                  </p>

                  <div className="pt-2 border-t border-white/10 text-xs text-white/60">
                    <span>Uploaded by: </span>
                    <strong className="text-white font-medium">{lightboxPhoto.uploadedBy}</strong>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => handleLike(lightboxPhoto.id, e)}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors cursor-pointer"
                    >
                      <Heart className="w-4 h-4 fill-white" />
                      <span>Love It ({lightboxPhoto.likes})</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPhotoToDelete(lightboxPhoto.id)}
                      className="inline-flex items-center justify-center p-2.5 text-xs font-medium text-red-400 hover:text-white bg-red-950/40 hover:bg-red-600 border border-red-500/30 rounded-xl transition-colors cursor-pointer"
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
                      className="inline-flex items-center justify-center p-2.5 text-xs font-medium text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
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

        {/* Upload Modal */}
        {isUploadModalOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsUploadModalOpen(false)}
          >
            <div
              className="relative max-w-lg w-full bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-[#E8DFC8]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-[#8A7A75] hover:text-[#2D2421] rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2 mb-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#AA820A]">
                  Guest Album Contribution
                </span>
                <h3 className="font-playfair text-2xl font-bold text-[#7A1B28]">
                  Share a Celebration Memory
                </h3>
                <p className="text-xs text-[#665753]">
                  Upload a photo from your phone or camera to add to the live celebration gallery.
                </p>
              </div>

              {uploadSuccess ? (
                <div className="p-8 text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-playfair text-xl font-bold text-[#2D2421]">
                    Photo Added Successfully!
                  </h4>
                  <p className="text-xs text-[#665753]">
                    Your memory is now part of Toshik & Tanaya's official gallery.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleUploadSubmit} className="space-y-4">
                  {/* File Selector */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#4A3E3D] block">
                      Choose Photo *
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      required
                      className="hidden"
                    />

                    {selectedImageSrc ? (
                      <div className="relative rounded-xl overflow-hidden aspect-[16/9] border border-[#E8DFC8]">
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
                          className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-full text-xs hover:bg-black/80"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full py-8 border-2 border-dashed border-[#D4AF37]/50 rounded-2xl bg-[#FAF7F2] hover:bg-[#FAF3DE] transition-colors flex flex-col items-center justify-center gap-2 cursor-pointer"
                      >
                        <ImageIcon className="w-8 h-8 text-[#AA820A]" />
                        <span className="text-xs font-semibold text-[#7A1B28]">
                          Tap to select a photo from your gallery or take a picture
                        </span>
                        <span className="text-[10px] text-[#8A7A75]">
                          Supports JPG, PNG, WEBP (Instant upload)
                        </span>
                      </button>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#4A3E3D] block">
                      Photo Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ring Exchange Celebration Smiles"
                      value={uploadTitle}
                      onChange={(e) => setUploadTitle(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs bg-[#FAF7F2] border border-[#E8DFC8] rounded-xl focus:outline-none focus:border-[#7A1B28]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#4A3E3D] block">
                        Category
                      </label>
                      <select
                        value={uploadCategory}
                        onChange={(e) => setUploadCategory(e.target.value as any)}
                        className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E8DFC8] rounded-xl focus:outline-none focus:border-[#7A1B28]"
                      >
                        <option value="candid">Candid Moments</option>
                        <option value="ceremony">Ring Ceremony</option>
                        <option value="haldi">Sakharpuda Ritual</option>
                        <option value="reception">Reception & Dinner</option>
                        <option value="venue">Venue & Decor</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#4A3E3D] block">
                        Your Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Meera Auntie"
                        value={uploadName}
                        onChange={(e) => setUploadName(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs bg-[#FAF7F2] border border-[#E8DFC8] rounded-xl focus:outline-none focus:border-[#7A1B28]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#4A3E3D] block">
                      Caption / Short Note
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Share a short note about this joyful moment..."
                      value={uploadCaption}
                      onChange={(e) => setUploadCaption(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs bg-[#FAF7F2] border border-[#E8DFC8] rounded-xl focus:outline-none focus:border-[#7A1B28]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!selectedImageSrc}
                    className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#7A1B28] hover:bg-[#58121C] disabled:opacity-50 rounded-xl transition-all cursor-pointer shadow-sm"
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
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setPhotoToDelete(null)}
          >
            <div
              className="relative max-w-sm w-full bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-[#E8DFC8] space-y-5 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
                <Trash2 className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <h4 className="font-playfair text-2xl font-bold text-[#7A1B28]">
                  Delete Photo?
                </h4>
                <p className="text-xs text-[#665753] leading-relaxed">
                  Are you sure you want to remove this photograph from the engagement celebration album?
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setPhotoToDelete(null)}
                  className="flex-1 py-2.5 text-xs font-semibold text-[#4A3E3D] bg-[#FAF7F2] hover:bg-[#F3EDE2] border border-[#E8DFC8] rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleDeletePhoto(photoToDelete)}
                  className="flex-1 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all cursor-pointer shadow-md"
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
