import React, { useEffect, useState, useRef } from 'react';
import { 
  X, ChevronLeft, ChevronRight, Heart, Download, Info, Share2, 
  MapPin, Calendar, Camera, Gauge, Aperture, Compass, Sliders, Check,
  FileJson, Copy
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GalleryImage } from '../types';

interface ImageModalProps {
  image: GalleryImage;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  isLiked: boolean;
  onToggleLike: () => void;
}

export function ImageModal({ image, onClose, onNext, onPrev, isLiked, onToggleLike }: ImageModalProps) {
  const [showSpecs, setShowSpecs] = useState(true);
  const [copied, setCopied] = useState(false);
  const [copiedMetadata, setCopiedMetadata] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<'fit' | 'fill'>('fit');
  const [highResLoaded, setHighResLoaded] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);

  // Prevent background scrolling while modal is open
  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  // Keyboard Navigation & Escape Handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        setHighResLoaded(false);
        onNext();
      } else if (e.key === 'ArrowLeft') {
        setHighResLoaded(false);
        onPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onNext, onPrev]);

  // Click Outside backdrop handler
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) {
      onClose();
    }
  };

  // Safe direct high resolution source download handler
  const handleDownload = () => {
    // We open full-screen asset directly in a safe container for the photography student/instructor
    window.open(image.url, '_blank', 'noopener,noreferrer');
  };

  // Mock clip link share interaction
  const handleShare = () => {
    navigator.clipboard.writeText(image.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exportAsJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      id: image.id,
      title: image.title,
      category: image.category,
      artist: `${image.photographer} (@${image.photographerUsername})`,
      location: image.location,
      date: image.date,
      description: image.description,
      exif: image.specs
    }, null, 2));
    
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${image.title.toLowerCase().replace(/\s+/g, '_')}_metadata.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const copyMetadataSnippet = () => {
    const textSnippet = `--- PRISM EXPOSITION ARTWORK METADATA ---
Title: ${image.title}
Artist: ${image.photographer} (@${image.photographerUsername})
Category: ${image.category}
Date: ${image.date}
Location: ${image.location}

--- EXIF CAMERA SPECS ---
Camera Body: ${image.specs.camera}
Focal Length: ${image.specs.focalLength}
Aperture: ${image.specs.aperture}
Shutter Speed: ${image.specs.shutter}
ISO: ${image.specs.iso}
-----------------------------------------`;

    navigator.clipboard.writeText(textSnippet);
    setCopiedMetadata(true);
    setTimeout(() => setCopiedMetadata(false), 2000);
  };

  const cameraSpecs = [
    { icon: Camera, label: 'Body', value: image.specs.camera },
    { icon: Compass, label: 'Focal', value: image.specs.focalLength },
    { icon: Aperture, label: 'Aperture', value: image.specs.aperture },
    { icon: Gauge, label: 'Shutter', value: image.specs.shutter },
    { icon: Sliders, label: 'ISO', value: image.specs.iso },
  ];

  return (
    <div 
      ref={backdropRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-neutral-950/95 z-50 flex items-center justify-center p-0 md:p-6 backdrop-blur-xs select-none"
      id="exhibit-modal-overlay"
    >
      {/* Sleek Horizontal Loading Bar indicator for high-res asset loading */}
      {!highResLoaded && (
        <div className="absolute top-0 left-0 w-full h-[3px] bg-zinc-800 overflow-hidden">
          <div className="h-full bg-white/70 animate-[shimmer_1.5s_infinite] w-1/3 rounded-full" style={{
            backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)'
          }} />
        </div>
      )}

      {/* Primary Modal Canvas */}
      <div className="relative w-full h-full max-w-7xl mx-auto flex flex-col md:flex-row bg-neutral-900 md:rounded-3xl border border-neutral-800 overflow-hidden shadow-2xl">
        
        {/* Interactive Close button - Absolute Top Right (visible always) */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-40 bg-neutral-900/50 hover:bg-neutral-800 text-white hover:text-zinc-200 p-2.5 rounded-full border border-white/10 backdrop-blur-md transition-all duration-200 cursor-pointer"
          aria-label="Close exhibition modal"
          id="close-modal-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 1. Left Section: Immersive Interactive Photo Viewer */}
        <div className="relative grow h-2/3 md:h-full bg-neutral-950 flex items-center justify-center overflow-hidden">
          
          {/* Arrow Navigator: Prev image */}
          <button
            onClick={() => { setHighResLoaded(false); onPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-neutral-900/40 hover:bg-neutral-900/80 text-white/70 hover:text-white p-3 rounded-full border border-white/5 backdrop-blur-md transition-all cursor-pointer"
            id="prev-image-btn"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Arrow Navigator: Next image */}
          <button
            onClick={() => { setHighResLoaded(false); onNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-neutral-900/40 hover:bg-neutral-900/80 text-white/70 hover:text-white p-3 rounded-full border border-white/5 backdrop-blur-md transition-all cursor-pointer"
            id="next-image-btn"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* High-res Image Renderer */}
          <img
            src={image.url}
            alt={image.title}
            onLoad={() => setHighResLoaded(true)}
            referrerPolicy="no-referrer"
            className={`transition-all duration-500 ease-out cursor-zoom-in ${
              zoomLevel === 'fill' 
                ? 'w-full h-full object-cover' 
                : 'max-w-full max-h-full object-contain p-4 md:p-10'
            } ${highResLoaded ? 'scale-100 opacity-100' : 'scale-95 opacity-40'}`}
            onClick={() => setZoomLevel(zoomLevel === 'fit' ? 'fill' : 'fit')}
            style={{ transformOrigin: 'center' }}
          />

          {/* Scale Aspect Toggle Indicators */}
          <div className="absolute bottom-4 left-4 z-30 flex items-center gap-2">
            <button
              onClick={() => setZoomLevel(zoomLevel === 'fit' ? 'fill' : 'fit')}
              className="px-3 py-1.5 bg-neutral-900/60 border border-white/10 hover:bg-neutral-900/90 text-white text-xs font-mono font-medium rounded-lg backdrop-blur-sm transition-all cursor-pointer"
            >
              Zoom Mode: {zoomLevel === 'fit' ? 'Fit Screen' : 'Fill Canvas'}
            </button>
          </div>
        </div>

        {/* 2. Right Section: Rich Curated Camera Details Panel */}
        <AnimatePresence>
          {showSpecs && (
            <motion.div 
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="w-full md:w-96 h-1/3 md:h-full bg-neutral-900 shrink-0 border-t md:border-t-0 md:border-l border-neutral-800 flex flex-col"
              id="metadata-specs-sidebar"
            >
              {/* Scrollable details wrapper */}
              <div className="p-6 flex-1 overflow-y-auto space-y-6">
                
                {/* Title and location block */}
                <div className="space-y-2">
                  <span className="inline-block px-2.5 py-1 text-[10px] font-mono tracking-widest font-semibold uppercase bg-neutral-800 text-zinc-300 rounded border border-neutral-700">
                    {image.category}
                  </span>
                  <h2 className="font-display font-medium text-white text-xl sm:text-2xl tracking-normal">
                    {image.title}
                  </h2>
                  
                  <div className="flex flex-col gap-1.5 pt-1 text-sm text-zinc-400">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-zinc-500 shrink-0" />
                      <span className="truncate">{image.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-zinc-500 shrink-0" />
                      <span>Captured on {image.date}</span>
                    </div>
                  </div>
                </div>

                <hr className="border-neutral-800" />

                {/* Photographer Details Card */}
                <div className="bg-neutral-950/60 p-4 rounded-2xl border border-neutral-800/80 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img 
                      src={image.photographerAvatar} 
                      alt={image.photographer} 
                      className="w-11 h-11 rounded-full object-cover border border-neutral-800"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-sm font-semibold text-white font-sans">{image.photographer}</h4>
                      <p className="text-xs text-zinc-500 font-mono">@{image.photographerUsername}</p>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 px-2 py-1 bg-neutral-900 border border-neutral-800 rounded">
                    Artist
                  </span>
                </div>

                {/* Artwork Description */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-widest">About the piece</h4>
                  <p className="text-zinc-300 text-sm leading-relaxed font-sans font-light">
                    {image.description}
                  </p>
                </div>

                {/* Technical EXIF Camera Capture Specs */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-widest">Metadata / EXIF data</h4>
                  <div className="bg-neutral-950/40 p-1.5 rounded-xl border border-neutral-800/50 divide-y divide-neutral-800">
                    {cameraSpecs.map((spec, sidx) => {
                      const SpecIcon = spec.icon;
                      return (
                        <div key={sidx} className="flex items-center justify-between p-3 text-xs">
                          <div className="flex items-center gap-2.5 text-zinc-400 font-sans">
                            <SpecIcon className="w-3.5 h-3.5 text-zinc-500" />
                            <span>{spec.label}</span>
                          </div>
                          <span className="font-mono text-white text-right break-all max-w-[200px]">{spec.value || "N/A"}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Metadata Export and Snippet Tools */}
                  <div className="grid grid-cols-2 gap-2 pt-1.5">
                    <button
                      onClick={exportAsJSON}
                      className="flex items-center justify-center gap-2 py-2.5 px-3 bg-neutral-950 border border-neutral-800/80 hover:border-neutral-700 text-zinc-300 hover:text-white rounded-xl text-xs font-medium cursor-pointer transition-all hover:bg-neutral-800"
                      title="Download EXIF metadata as a JSON file"
                      id="export-metadata-json-btn"
                    >
                      <FileJson className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Export JSON</span>
                    </button>

                    <button
                      onClick={copyMetadataSnippet}
                      className="flex items-center justify-center gap-2 py-2.5 px-3 bg-neutral-950 border border-neutral-800/80 hover:border-neutral-700 text-zinc-300 hover:text-white rounded-xl text-xs font-medium cursor-pointer transition-all hover:bg-neutral-800"
                      title="Copy metadata snippet to clipboard"
                      id="export-metadata-snippet-btn"
                    >
                      {copiedMetadata ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-zinc-400" />
                          <span>Copy Snippet</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Toolbar Dock */}
              <div className="p-4 bg-neutral-950/80 border-t border-neutral-800 flex items-center justify-between gap-3">
                {/* Favorite Action Button inside Modal */}
                <button
                  onClick={onToggleLike}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border font-sans text-xs font-medium cursor-pointer transition-all ${
                    isLiked
                      ? 'bg-red-500 border-red-500 text-white hover:bg-red-600'
                      : 'bg-neutral-900 border-neutral-800 text-white hover:bg-neutral-800 hover:border-neutral-700'
                  }`}
                  id="modal-specs-like-btn"
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-white' : ''}`} />
                  <span>{isLiked ? 'Liked Artwork' : 'Like Artwork'}</span>
                </button>

                {/* Download Source Button */}
                <button
                  onClick={handleDownload}
                  className="p-3 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-zinc-300 hover:text-white rounded-xl hover:bg-neutral-800 cursor-pointer transition-all"
                  title="Open source High-Res asset in new window"
                  id="modal-specs-download-btn"
                >
                  <Download className="w-4 h-4" />
                </button>

                {/* Share copying Link button */}
                <button
                  onClick={handleShare}
                  className="p-3 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-zinc-300 hover:text-white rounded-xl hover:bg-neutral-800 cursor-pointer transition-all flex items-center justify-center relative min-w-[42px]"
                  title="Copy high resolution image link"
                  id="modal-specs-share-btn"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Share2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapsible Meta Sidebar action slider */}
        <button
          onClick={() => setShowSpecs(!showSpecs)}
          className="absolute bottom-4 right-4 z-40 hidden md:flex items-center gap-1.5 bg-neutral-900/80 border border-white/10 text-white hover:text-zinc-200 px-3 py-1.5 rounded-lg text-xs font-mono font-medium backdrop-blur-sm cursor-pointer hover:bg-neutral-800 transition-all"
        >
          <Info className="w-3.5 h-3.5" />
          <span>{showSpecs ? 'Hide Details' : 'Show Details'}</span>
        </button>
      </div>
    </div>
  );
}
