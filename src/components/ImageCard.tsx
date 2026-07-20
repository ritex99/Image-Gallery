import React, { useState } from 'react';
import { Heart, MapPin, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GalleryImage, GalleryLayout } from '../types';

interface ImageCardProps {
  image: GalleryImage;
  layout: GalleryLayout;
  isLiked: boolean;
  onToggleLike: (e: React.MouseEvent) => void;
  onSelect: () => void;
  isFeatured?: boolean;
}

export function ImageCard({ image, layout, isLiked, onToggleLike, onSelect, isFeatured }: ImageCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Set card design base classes based on the active layout choice
  const isCompact = layout === 'compact';
  
  return (
    <motion.div
      layout
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onSelect}
      className={`group relative overflow-hidden bg-zinc-100 border border-zinc-200/60 rounded-2xl cursor-pointer transition-shadow hover:shadow-lg focus-within:ring-2 focus-within:ring-zinc-950 outline-hidden ${
        isCompact 
          ? 'h-36 sm:h-44 flex flex-row' 
          : 'flex flex-col w-full h-full'
      }`}
      id={`image-card-${image.id}`}
    >
      {/* Loading Skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-zinc-200 animate-pulse flex items-center justify-center">
          <span className="text-xs font-mono text-zinc-400">Loading fine art asset...</span>
        </div>
      )}

      {/* Image Element */}
      <div className={`relative overflow-hidden shrink-0 ${
        isCompact ? 'w-1/3 sm:w-1/4 h-full border-r border-zinc-200' 
        : isFeatured ? 'w-full flex-1 min-h-[300px] group-hover:scale-105 transition-transform duration-500 ease-out'
        : 'w-full aspect-[4/3] group-hover:scale-105 transition-transform duration-500 ease-out'
      }`}
      style={layout === 'masonry' && !isCompact ? { aspectRatio: 'auto' } : undefined}
      >
        <img
          src={image.thumbnailUrl}
          alt={image.title}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          referrerPolicy="no-referrer"
          className={`w-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${layout === 'masonry' && !isCompact ? 'h-auto' : 'h-full'}`}
        />

        {/* Hover Action Hoverlay (only for standard grids / masonry, hidden on mobile for better interactive response) */}
        {!isCompact && (
          <AnimatePresence>
            {isHovered && isLoaded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/30 to-transparent flex flex-col justify-end p-4 hidden md:flex"
              >
                <div className="flex justify-between items-end gap-2">
                  <div className="space-y-1 select-none">
                    <span className="inline-block px-2 py-0.5 text-[9px] font-mono tracking-wider font-medium uppercase bg-white/20 text-white rounded">
                      {image.category}
                    </span>
                    <h3 className="text-sm font-semibold text-white tracking-tight leading-tight">{image.title}</h3>
                    <div className="flex items-center gap-1 text-zinc-300 text-[11px]">
                      <MapPin className="w-3 h-3 shrink-0" />
                      <span className="truncate">{image.location}</span>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md text-white p-2 rounded-xl group-hover:scale-100 scale-90 transition-transform duration-300">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* Detail Block for Grid / Compact Display */}
      <div className={`p-4 flex flex-col justify-between shrink-0 grow ${
        isCompact ? 'w-2/3 sm:w-3/4 bg-white' : 'border-t border-zinc-100 bg-white'
      }`}>
        {/* Top Metadata Row */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[10px] font-mono font-semibold tracking-wider text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded uppercase">
              {image.category}
            </span>
            <span className="text-[10px] font-mono text-zinc-400">{image.date}</span>
          </div>

          <h3 className="font-display font-medium text-zinc-900 tracking-tight text-sm sm:text-base mb-1.5 truncate group-hover:text-zinc-600 transition-colors">
            {image.title}
          </h3>

          {/* Description shown in compact and occasionally elsewhere */}
          <p className="text-zinc-500 text-xs line-clamp-1 sm:line-clamp-2 pr-4 leading-relaxed font-sans">
            {image.description}
          </p>
        </div>

        {/* Bottom Photographer info & Actions */}
        <div className="flex items-center justify-between gap-4 mt-3 pt-3 border-t border-zinc-100">
          <div className="flex items-center gap-2 max-w-[70%]">
            <img
              src={image.photographerAvatar}
              alt={image.photographer}
              className="w-5.5 h-5.5 rounded-full object-cover border border-zinc-200 shrink-0"
              referrerPolicy="no-referrer"
            />
            <span className="text-xs font-medium text-zinc-700 truncate font-sans">
              {image.photographer}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Quick Interactive Like Button inside Card footprint */}
            <button
              onClick={onToggleLike}
              className={`p-2 rounded-xl border cursor-pointer transition-all ${
                isLiked
                  ? 'bg-red-50 border-red-100 text-red-500 hover:bg-red-100/70'
                  : 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200 text-zinc-400 hover:text-zinc-600'
              }`}
              title={isLiked ? "Unlike work" : "Like work"}
              id={`like-btn-card-${image.id}`}
            >
              <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-red-500' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
