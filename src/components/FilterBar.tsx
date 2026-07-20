import { Search, Heart, Grid, Columns, List, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { GalleryLayout } from '../types';
import { CATEGORIES } from '../data';

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  favoritesOnly: boolean;
  setFavoritesOnly: (favOnly: boolean) => void;
  layout: GalleryLayout;
  setLayout: (layout: GalleryLayout) => void;
  favoritesCount: number;
}

export function FilterBar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  favoritesOnly,
  setFavoritesOnly,
  layout,
  setLayout,
  favoritesCount,
}: FilterBarProps) {
  const isFiltered = searchQuery !== '' || selectedCategory !== 'All' || favoritesOnly;

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setFavoritesOnly(false);
  };

  return (
    <div className="w-full bg-zinc-50/50 p-4 rounded-2xl border border-zinc-200 flex flex-col gap-4 shadow-xs" id="filter-bar-container">
      {/* Search and Layout Actions */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search Bar Input */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search exhibitions by title, artist, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-sm pl-10 pr-4 py-2.5 bg-white border border-zinc-200 focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950 focus:outline-hidden rounded-xl transition-all duration-200 placeholder-zinc-400 font-sans"
            id="search-input"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Favorites and Layout selectors */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          {/* Favorites Filter */}
          <button
            onClick={() => setFavoritesOnly(!favoritesOnly)}
            className={`flex items-center gap-2 text-xs font-medium px-4 py-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
              favoritesOnly
                ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100/70 shadow-xs'
                : 'bg-white border-zinc-200 text-zinc-700 hover:border-zinc-300'
            }`}
            id="favorites-filter-toggle"
          >
            <Heart className={`w-4 h-4 ${favoritesOnly ? 'fill-red-500 text-red-500' : 'text-zinc-500'}`} />
            <span>Liked ({favoritesCount})</span>
          </button>

          <span className="w-[1px] h-6 bg-zinc-200 hidden sm:block" />

          {/* Layout Selectors */}
          <div className="flex bg-white border border-zinc-200 rounded-xl p-1 gap-0.5">
            {[
              { id: 'grid_uniform', icon: Grid, label: 'Grid' },
              { id: 'masonry', icon: Columns, label: 'Masonry' },
              { id: 'compact', icon: List, label: 'Compact' },
            ].map((opt) => {
              const Icon = opt.icon;
              const isActive = layout === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setLayout(opt.id as GalleryLayout)}
                  className={`relative p-2 rounded-lg flex items-center gap-1.5 transition-all text-xs font-medium cursor-pointer ${
                    isActive
                      ? 'bg-zinc-950 text-white shadow-xs'
                      : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 w-full sm:w-auto'
                  }`}
                  title={`${opt.label} Layout`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <span className="w-full h-[1px] bg-zinc-200" />

      {/* Category Tabs & Reset button */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
        {/* Tabs for Category filtering */}
        <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none items-center">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="relative px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap overflow-hidden"
              >
                {/* Background highlight using framer motion layoutId for high premium visual flow */}
                {isSelected && (
                  <motion.div
                    layoutId="activeCategoryBg"
                    className="absolute inset-0 bg-zinc-900 rounded-lg -z-0"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 transition-colors duration-200 ${
                  isSelected ? 'text-white' : 'text-zinc-600 hover:text-zinc-950'
                }`}>
                  {cat}
                </span>
              </button>
            );
          })}
        </div>

        {/* Reset filters if any are applied */}
        {isFiltered && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-950 transition-colors font-medium self-end sm:self-auto cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset filters</span>
          </motion.button>
        )}
      </div>
    </div>
  );
}
