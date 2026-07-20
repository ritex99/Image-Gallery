import React, { useState, useEffect } from 'react';
import { GALLERY_IMAGES } from './data';
import { GalleryLayout, GalleryImage } from './types';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { GalleryGrid } from './components/GalleryGrid';
import { ImageModal } from './components/ImageModal';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Calendar, Heart, ShieldCheck, Paintbrush } from 'lucide-react';

export default function App() {
  // Main State Variables
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [layout, setLayout] = useState<GalleryLayout>('grid_uniform');
  const [likedImageIds, setLikedImageIds] = useState<string[]>([]);

  // Establish state initialization for liked assets from localStorage
  useEffect(() => {
    try {
      const storedLikes = localStorage.getItem('prism_gallery_likes');
      if (storedLikes) {
        setLikedImageIds(JSON.parse(storedLikes));
      }
    } catch (e) {
      console.error('Error fetching liked images list from localStorage:', e);
    }
  }, []);

  // Update liked images list state & localStorage helper
  const handleToggleLike = (imageId: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation(); // Avoid triggering open modal on background card click
    }
    
    const nextLikes = likedImageIds.includes(imageId)
      ? likedImageIds.filter((id) => id !== imageId)
      : [...likedImageIds, imageId];

    setLikedImageIds(nextLikes);
    try {
      localStorage.setItem('prism_gallery_likes', JSON.stringify(nextLikes));
    } catch (err) {
      console.error('Failed to write liked collection to storage:', err);
    }
  };

  // Derived filter logic for Curated Art Inventory
  const filteredImages = GALLERY_IMAGES.filter((img) => {
    // 1. Filter by category if not set on "All"
    if (selectedCategory !== 'All' && img.category !== selectedCategory) {
      return false;
    }

    // 2. Filter by Liked status only
    if (favoritesOnly && !likedImageIds.includes(img.id)) {
      return false;
    }

    // 3. Filter by search query fuzzy match
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = img.title.toLowerCase().includes(q);
      const matchArtist = img.photographer.toLowerCase().includes(q);
      const matchLocale = img.location.toLowerCase().includes(q);
      const matchDesc = img.description.toLowerCase().includes(q);
      const matchCat = img.category.toLowerCase().includes(q);

      return matchTitle || matchArtist || matchLocale || matchDesc || matchCat;
    }

    return true;
  });

  // Safe navigation handlers inside active filter bounds
  const handleSelectImageIndex = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleNextImage = () => {
    if (selectedImageIndex === null || filteredImages.length === 0) return;
    const nextIdx = (selectedImageIndex + 1) % filteredImages.length;
    setSelectedImageIndex(nextIdx);
  };

  const handlePrevImage = () => {
    if (selectedImageIndex === null || filteredImages.length === 0) return;
    const prevIdx = (selectedImageIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImageIndex(prevIdx);
  };

  // Reset active filter configuration helper
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setFavoritesOnly(false);
  };

  const currentModalImage = selectedImageIndex !== null ? filteredImages[selectedImageIndex] : null;

  return (
    <div className="min-h-screen bg-slate-50/50 text-zinc-900 flex flex-col font-sans" id="app-root-frame">
      {/* Upper Brand Exhibition Bar */}
      <Header totalCount={GALLERY_IMAGES.length} filteredCount={filteredImages.length} />

      {/* Main Core Content Canvas */}
      <main className="grow max-w-7xl w-full mx-auto px-6 py-8 flex flex-col gap-8">
        
        {/* Curated Interactive Showcase Promo Banner */}
        <motion.section 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative bg-zinc-950 text-white rounded-3xl overflow-hidden p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-zinc-800 shadow-sm"
          id="showcase-banner-section"
        >
          {/* Subtle abstract ambient glow under bottom */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-zinc-800 rounded-full blur-3xl opacity-30 pointer-events-none" />
          
          <div className="space-y-3 max-w-2xl relative z-10">
            <div className="flex items-center gap-2 text-zinc-400 font-mono text-xs uppercase tracking-widest">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span>EXHIBITION ONLINE</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-semibold tracking-tight">
              A light refractor through perspective.
            </h2>
            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              Explore custom-curated fine-art compositions across distinct artistic mediums ranging from natural geometric dunes to luminescent street-level architecture. Mark your favorite pieces and zoom close to explore capture metadata.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full md:w-auto relative z-10 pt-2 md:pt-0">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-center">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">REPRESENTATIONS</span>
              <span className="font-display font-semibold text-lg text-white">15 works</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-center">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">RESOLUTION</span>
              <span className="font-display font-semibold text-lg text-white">Full EXIF</span>
            </div>
          </div>
        </motion.section>

        {/* 1. Interactive Filters and query matching deck */}
        <section className="space-y-4" id="interactivity-filtering-deck">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-display text-lg font-semibold text-zinc-900">Interactive Navigation Deck</h3>
              <p className="text-xs text-zinc-500">Isolate photography styles, liked items, layouts, or terms in real time.</p>
            </div>
          </div>
          <FilterBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            favoritesOnly={favoritesOnly}
            setFavoritesOnly={setFavoritesOnly}
            layout={layout}
            setLayout={setLayout}
            favoritesCount={likedImageIds.length}
          />
        </section>

        {/* 2. Responsive Multi-Layout Media Showcase Grid */}
        <section className="space-y-4 min-h-[400px]">
          <GalleryGrid
            images={filteredImages}
            layout={layout}
            likedImageIds={likedImageIds}
            onToggleLike={handleToggleLike}
            onSelectImage={handleSelectImageIndex}
            onResetFilters={handleResetFilters}
          />
        </section>
      </main>

      {/* Persistent Lightbox ZOOM Modal Renderer */}
      <AnimatePresence>
        {currentModalImage && selectedImageIndex !== null && (
          <ImageModal
            image={currentModalImage}
            onClose={() => setSelectedImageIndex(null)}
            onNext={handleNextImage}
            onPrev={handlePrevImage}
            isLiked={likedImageIds.includes(currentModalImage.id)}
            onToggleLike={() => handleToggleLike(currentModalImage.id)}
          />
        )}
      </AnimatePresence>

      {/* Beautiful Editorial-style Site Footer */}
      <footer className="mt-auto bg-zinc-950 text-zinc-500 border-t border-zinc-800 py-12" id="site-footer">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-white" />
              <h4 className="font-display text-white font-semibold text-sm tracking-widest uppercase">PRISM EXPOSITION</h4>
            </div>
            <p className="text-xs text-zinc-400 font-light leading-relaxed max-w-sm">
              An interactive virtual museum representing fine photography catalogs. Built using high fidelity React architectures in continuous flow.
            </p>
          </div>

          <div className="space-y-2.5">
            <h5 className="text-[11px] font-mono font-semibold tracking-widest text-zinc-300 uppercase">CURATOR DETAILS</h5>
            <div className="text-xs space-y-1.5 font-light text-zinc-400">
              <p>Chief Coordinator: <span className="text-zinc-200">Elena Rostova</span></p>
              <p>Assistant Archivist: <span className="text-zinc-200">Liam Harrison</span></p>
              <p>Exhibition Engine: <span className="font-mono text-zinc-500 text-[10px]">V4.1.14 / React 19</span></p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <h5 className="text-[11px] font-mono tracking-widest font-semibold text-zinc-300 uppercase">AUTHENTICATION GUIDES</h5>
            <div className="flex items-center gap-1.5 text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Full-screen lightbox safe content loaded of Unsplash APIs.</span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-400">
              <Paintbrush className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Curated and styled using responsive mobile-first Tailwind CSS.</span>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-8 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 PRISM Fine-Arts Inc. All rights reserved.</p>
          <div className="flex items-center gap-4 text-zinc-400">
            <span>License: Apache-2.0</span>
            <span>·</span>
            <span>Terms of Art Curators</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
