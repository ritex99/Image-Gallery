import { GalleryImage } from './types';

export const CATEGORIES = ['All', 'Nature', 'Architecture', 'Travel', 'Technology', 'Minimalist'];

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 'img-1',
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=75',
    title: 'Silent Summit Peaks',
    category: 'Nature',
    photographer: 'Sven-Erik Arndt',
    photographerUsername: 'sven_erik',
    photographerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
    description: 'A majestic view of snow-capped mountain peaks towering over light fluffy clouds, captured during the first golden rays of alpine sunrise.',
    likes: 342,
    downloads: 1205,
    date: 'February 12, 2026',
    location: 'Chamonix, French Alps',
    specs: {
      camera: 'Sony Alpha 7R V',
      aperture: 'f/8.0',
      shutter: '1/250s',
      iso: '100',
      focalLength: '35mm'
    }
  },
  {
    id: 'img-2',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=75',
    title: 'Concrete Minimalist Villa',
    category: 'Architecture',
    photographer: 'Amanda Lindgren',
    photographerUsername: 'amandalind',
    photographerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
    description: 'A striking modern dwelling showcasing brutalist architecture influences, nestled perfectly with integrated warm ambient path lighting.',
    likes: 512,
    downloads: 2439,
    date: 'April 08, 2026',
    location: 'Södermalm, Sweden',
    specs: {
      camera: 'Fujifilm GFX 100S',
      aperture: 'f/4.0',
      shutter: '1/60s',
      iso: '400',
      focalLength: '23mm'
    }
  },
  {
    id: 'img-3',
    url: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1600&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=600&q=75',
    title: 'Winding Streets of Venice',
    category: 'Travel',
    photographer: 'Matteo Silva',
    photographerUsername: 'msilva',
    photographerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    description: 'Cobblestone streets and narrow canal crosswalks. A glimpse into the morning walks of Venice away from tourist hotspots.',
    likes: 289,
    downloads: 912,
    date: 'March 22, 2026',
    location: 'Venice, Italy',
    specs: {
      camera: 'Leica Q3',
      aperture: 'f/2.8',
      shutter: '1/500s',
      iso: '200',
      focalLength: '28mm'
    }
  },
  {
    id: 'img-4',
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=75',
    title: 'Cybernetic Pulse',
    category: 'Technology',
    photographer: 'Hiroshi Tanaka',
    photographerUsername: 'ht_cyber',
    photographerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80',
    description: 'Macro details exposing glowing geometric pathways of a modern computer processor and integrated printed electrical micro-circuitry.',
    likes: 411,
    downloads: 1892,
    date: 'January 15, 2026',
    location: 'Akihabara, Japan',
    specs: {
      camera: 'Canon EOS R5',
      aperture: 'f/5.6',
      shutter: '1/125s',
      iso: '800',
      focalLength: '100mm Macro'
    }
  },
  {
    id: 'img-5',
    url: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?auto=format&fit=crop&w=1600&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?auto=format&fit=crop&w=600&q=75',
    title: 'Golden Sand Ripples',
    category: 'Minimalist',
    photographer: 'Elena Rostova',
    photographerUsername: 'elena_r',
    photographerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80',
    description: 'Perfect geometric wind-carved desert sand ripples at twilight creating beautiful smooth alternating lines of shadow and soft orange light.',
    likes: 671,
    downloads: 3824,
    date: 'May 05, 2026',
    location: 'Namib Desert, Namibia',
    specs: {
      camera: 'Nikon Z9',
      aperture: 'f/11.0',
      shutter: '1/30s',
      iso: '64',
      focalLength: '70mm'
    }
  },
  {
    id: 'img-6',
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=75',
    title: 'Misty Redwood Sanctuary',
    category: 'Nature',
    photographer: 'Taylor Brooks',
    photographerUsername: 'tbrooks',
    photographerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80',
    description: 'Giant sequoia redwoods disappear into a dense, atmospheric, rolling morning mountain mist in Northern California forests.',
    likes: 489,
    downloads: 3012,
    date: 'September 19, 2025',
    location: 'Yosemite, California',
    specs: {
      camera: 'Sony Alpha 7 IV',
      aperture: 'f/5.6',
      shutter: '1/160s',
      iso: '200',
      focalLength: '24mm'
    }
  },
  {
    id: 'img-7',
    url: 'https://images.unsplash.com/photo-1495147478759-4836e2f7f605?auto=format&fit=crop&w=1600&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1495147478759-4836e2f7f605?auto=format&fit=crop&w=600&q=75',
    title: 'Infinite Spiral Geometry',
    category: 'Architecture',
    photographer: 'Amanda Lindgren',
    photographerUsername: 'amandalind',
    photographerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
    description: 'Looking directly down the perfect mathematical symmetry of a spiral staircase, showing rhythmic concrete and dark steel lines.',
    likes: 395,
    downloads: 1450,
    date: 'March 14, 2026',
    location: 'Munich, Germany',
    specs: {
      camera: 'Fujifilm GFX 100S',
      aperture: 'f/8.0',
      shutter: '1/80s',
      iso: '160',
      focalLength: '18mm'
    }
  },
  {
    id: 'img-8',
    url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1600&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=75',
    title: 'Mysterious Desert Spires',
    category: 'Travel',
    photographer: 'Elena Rostova',
    photographerUsername: 'elena_r',
    photographerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80',
    description: 'Tufa pinnacle rock formations rise dramatically from dry scorched earth under a starry celestial night sky.',
    likes: 312,
    downloads: 1102,
    date: 'January 28, 2026',
    location: 'Mono Lake, California',
    specs: {
      camera: 'Nikon Z9',
      aperture: 'f/2.8',
      shutter: '15s (Long Exposure)',
      iso: '3200',
      focalLength: '14mm'
    }
  },
  {
    id: 'img-9',
    url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=75',
    title: 'Analog Workstation Calm',
    category: 'Technology',
    photographer: 'Liam Harrison',
    photographerUsername: 'liamharris',
    photographerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80',
    description: 'An aesthetic desk setup featuring high fidelity mechanical keyboards, warm retro CRT display glare, and clean minimalist dark design.',
    likes: 832,
    downloads: 4122,
    date: 'May 11, 2026',
    location: 'London, United Kingdom',
    specs: {
      camera: 'Sony Alpha 7S III',
      aperture: 'f/1.8',
      shutter: '1/125s',
      iso: '320',
      focalLength: '50mm'
    }
  },
  {
    id: 'img-10',
    url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1600&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=75',
    title: 'Isolated Coastal Monolith',
    category: 'Minimalist',
    photographer: 'Taylor Brooks',
    photographerUsername: 'tbrooks',
    photographerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80',
    description: 'A striking minimalist coastal view of a single basalt rock monolith standing solitary against high winds and white ocean surf.',
    likes: 540,
    downloads: 2199,
    date: 'November 02, 2025',
    location: 'Vik, Iceland',
    specs: {
      camera: 'Sony Alpha 7 IV',
      aperture: 'f/8.0',
      shutter: '1/1000s',
      iso: '100',
      focalLength: '135mm'
    }
  },
  {
    id: 'img-11',
    url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=75',
    title: 'Luminous Shinjuku Nights',
    category: 'Architecture',
    photographer: 'Hiroshi Tanaka',
    photographerUsername: 'ht_cyber',
    photographerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80',
    description: 'Stunning night neon reflection on rainy pavements of Tokyo\'s iconic alleyways and skyscrapers, glowing in red, purple and teal.',
    likes: 954,
    downloads: 5013,
    date: 'April 19, 2026',
    location: 'Shinjuku, Tokyo',
    specs: {
      camera: 'Canon EOS R5',
      aperture: 'f/2.0',
      shutter: '1/160s',
      iso: '1600',
      focalLength: '50mm'
    }
  },
  {
    id: 'img-12',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=75',
    title: 'Emerald Wave Crest',
    category: 'Nature',
    photographer: 'Matteo Silva',
    photographerUsername: 'msilva',
    photographerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    description: 'An incredibly clear macro view of the swell of a powerful emerald green ocean wave cresting right before clean breakdown.',
    likes: 620,
    downloads: 3345,
    date: 'February 28, 2026',
    location: 'Oahu, Hawaii',
    specs: {
      camera: 'Leica Q3',
      aperture: 'f/4.0',
      shutter: '1/2000s',
      iso: '100',
      focalLength: '28mm'
    }
  },
  {
    id: 'img-13',
    url: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1600&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=75',
    title: 'Neon Prism Distortions',
    category: 'Technology',
    photographer: 'Elena Rostova',
    photographerUsername: 'elena_r',
    photographerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80',
    description: 'A beautiful conceptual art piece capturing holographic color wave patterns refracting through heavy high index optical glass prisms.',
    likes: 476,
    downloads: 2200,
    date: 'June 01, 2025',
    location: 'Karlsruhe, Germany',
    specs: {
      camera: 'Nikon Z9',
      aperture: 'f/5.6',
      shutter: '1/250s',
      iso: '100',
      focalLength: '105mm Macro'
    }
  },
  {
    id: 'img-14',
    url: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1600&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=600&q=75',
    title: 'Tropical Solitude Harbor',
    category: 'Travel',
    photographer: 'Taylor Brooks',
    photographerUsername: 'tbrooks',
    photographerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80',
    description: 'An idyllic drone viewpoint looking straight down over crystal clear lagoon shores with a lone wooden pier leading into deep turquoise oceans.',
    likes: 712,
    downloads: 5012,
    date: 'December 12, 2025',
    location: 'Bora Bora, French Polynesia',
    specs: {
      camera: 'DJI Mavic 3 Pro',
      aperture: 'f/2.8',
      shutter: '1/1250s',
      iso: '100',
      focalLength: '24mm equivalent'
    }
  },
  {
    id: 'img-15',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=75',
    title: 'Morning Light Shadowplay',
    category: 'Minimalist',
    photographer: 'Liam Harrison',
    photographerUsername: 'liamharris',
    photographerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80',
    description: 'Minimal shadow projection of olive leaves dancing on a warm textured sand-stone wall surface during late summer morning hours.',
    likes: 388,
    downloads: 1699,
    date: 'August 14, 2025',
    location: 'Andalusia, Spain',
    specs: {
      camera: 'Sony Alpha 7S III',
      aperture: 'f/5.6',
      shutter: '1/400s',
      iso: '100',
      focalLength: '85mm'
    }
  }
];
