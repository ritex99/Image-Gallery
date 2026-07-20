import React from 'react';
import { ArrowRight, ImageOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GalleryImage, GalleryLayout } from '../types';
import { ImageCard } from './ImageCard';

interface GalleryGridProps {
  images: GalleryImage[];
  layout: GalleryLayout;
  likedImageIds: string[];
  onToggleLike: (imageId: string, e: React.MouseEvent) => void;
  onSelectImage: (index: number) => void;
  onResetFilters?: () => void;
}

export function GalleryGrid({
  images,
  layout,
  likedImageIds,
  onToggleLike,
  onSelectImage,
  onResetFilters,
}: GalleryGridProps) {
  if (images.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full flex flex-col items-center justify-center py-20 text-center bg-zinc-50 border border-zinc-200/50 rounded-3xl p-8"
        id="empty-gallery-grid-state"
      >
        <div className="bg-zinc-200 text-zinc-500 rounded-full p-4 mb-4">
          <ImageOff className="w-8 h-8" />
        </div>
        <h3 className="font-display text-lg font-semibold text-zinc-900 mb-2">No photography works found</h3>
        <p className="text-sm text-zinc-500 max-w-md mb-6 leading-relaxed">
          We couldn't find any exhibition pieces matching your active combination of categories, favorites, and search queries.
        </p>
        
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-2 text-xs font-semibold px-4 py-2.5 bg-zinc-950 text-white rounded-xl hover:bg-zinc-800 transition-colors shadow-xs cursor-pointer"
          >
            <span>Reset filters and query</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </motion.div>
    );
  }

  // Animation layout transitions using frame rate preservation on parent container
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 25 } },
  };

  // Render Masonry (Tailwind CSS multi-columns layout)
  if (layout === 'masonry') {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 [column-fill:_balance] w-full"
        id="gallery-masonry-view"
      >
        <AnimatePresence mode="popLayout">
          {images.map((image, index) => {
            const isLiked = likedImageIds.includes(image.id);
            return (
              <motion.div
                key={image.id}
                variants={itemVariants}
                className="break-inside-avoid mb-6"
                layoutId={image.id}
              >
                <ImageCard
                  image={image}
                  layout={layout}
                  isLiked={isLiked}
                  onToggleLike={(e) => onToggleLike(image.id, e)}
                  onSelect={() => onSelectImage(index)}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    );
  }

  // Render Compact list view
  if (layout === 'compact') {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-4 max-w-4xl mx-auto w-full"
        id="gallery-compact-view"
      >
        <AnimatePresence mode="popLayout">
          {images.map((image, index) => {
            const isLiked = likedImageIds.includes(image.id);
            return (
              <motion.div
                key={image.id}
                variants={itemVariants}
                layoutId={image.id}
              >
                <ImageCard
                  image={image}
                  layout={layout}
                  isLiked={isLiked}
                  onToggleLike={(e) => onToggleLike(image.id, e)}
                  onSelect={() => onSelectImage(index)}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    );
  }

  // Default: Uniform regular Grid
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full"
      id="gallery-grid-uniform-view"
    >
      <AnimatePresence mode="popLayout">
        {images.map((image, index) => {
          const isLiked = likedImageIds.includes(image.id);
          const isFeatured = layout === 'grid_uniform' && image.title === 'Infinite Spiral Geometry';
          return (
            <motion.div
              key={image.id}
              variants={itemVariants}
              layoutId={image.id}
              className={isFeatured ? 'md:col-span-2 md:row-span-2' : ''}
            >
              <ImageCard
                image={image}
                layout={layout}
                isLiked={isLiked}
                onToggleLike={(e) => onToggleLike(image.id, e)}
                onSelect={() => onSelectImage(index)}
                isFeatured={isFeatured}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
}
