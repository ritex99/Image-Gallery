import { Camera, Calendar, Flame } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  totalCount: number;
  filteredCount: number;
}

export function Header({ totalCount, filteredCount }: HeaderProps) {
  return (
    <header className="border-b border-zinc-200 bg-white/80 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Logo and Brand */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex items-center gap-3"
          id="brand-header-section"
        >
          <div className="bg-zinc-950 text-white p-2.5 rounded-lg flex items-center justify-center shadow-sm">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-zinc-900">
              PRISM<span className="text-zinc-400 font-light font-sans ml-1 text-base tracking-widest uppercase">Exposition</span>
            </h1>
            <p className="text-xs text-zinc-500 font-mono">Curated Fine-Art Photography Gallery</p>
          </div>
        </motion.div>

        {/* Curator Notes & Metrics */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          className="flex items-center gap-6 text-xs font-mono text-zinc-600 sm:self-end md:self-auto"
          id="metrics-header-section"
        >
          <div className="hidden sm:flex items-center gap-2 border-r border-zinc-200 pr-5">
            <Calendar className="w-4 h-4 text-zinc-400" />
            <span>Exhibition: Summer 2026</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-zinc-400">ARCHIVE</span>
              <span className="font-semibold text-zinc-900">{totalCount} Works</span>
            </div>
            <div className="flex flex-col bg-zinc-50 px-2.5 py-1 rounded border border-zinc-200">
              <span className="text-zinc-400 flex items-center gap-1">
                <Flame className="w-3 h-3 text-amber-500 inline" /> ACTIVE VIEW
              </span>
              <span className="font-semibold text-zinc-900 font-sans">{filteredCount} matches</span>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
