export interface ImageSpecs {
  camera: string;
  aperture: string;
  shutter: string;
  iso: string;
  focalLength: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  thumbnailUrl: string;
  title: string;
  category: string;
  photographer: string;
  photographerUsername: string;
  photographerAvatar: string;
  description: string;
  likes: number;
  downloads: number;
  date: string;
  location: string;
  specs: ImageSpecs;
}

export type GalleryLayout = 'grid_uniform' | 'masonry' | 'compact';
