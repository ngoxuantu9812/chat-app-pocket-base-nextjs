// Type definitions for the admin panel

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  status: 'active' | 'inactive';
  image: string;
  createdAt: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  status: 'published' | 'draft' | 'archived';
  featured: boolean;
  publishDate: string;
  tags: string[];
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface Banner {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  position: 'header' | 'sidebar' | 'footer' | 'popup' | 'inline';
  status: 'active' | 'inactive' | 'scheduled';
  priority: number;
  startDate: string;
  endDate: string;
  clickCount: number;
  impressions: number;
  targetAudience: string;
  createdAt: string;
  updatedAt: string;
}

export interface Stone {
  id: string;
  name: string;
  description: string;
  type: 'natural' | 'engineered' | 'composite';
  category: 'marble' | 'granite' | 'limestone' | 'sandstone' | 'slate' | 'quartzite' | 'travertine';
  color: string;
  pattern: string;
  finish: 'polished' | 'honed' | 'brushed' | 'flamed' | 'sandblasted';
  hardness: number;
  porosity: 'low' | 'medium' | 'high';
  pricePerSqFt: number;
  thickness: number;
  origin: string;
  supplier: string;
  stock: number;
  minOrder: number;
  leadTime: number;
  rating: number;
  applications: string[];
  images: string[];
  specifications: {
    density: number;
    compressiveStrength: number;
    waterAbsorption: number;
    thermalConductivity: number;
  };
  status: 'available' | 'discontinued' | 'preorder';
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ConfigItem {
  key: string;
  label: string;
  type: 'string' | 'number' | 'boolean' | 'image' | 'color' | 'textarea' | 'select' | 'slider' | 'date' | 'time' | 'json';
  value: any;
  description?: string;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
}

export interface DashboardStats {
  totalProducts: number;
  totalPosts: number;
  activeBanners: number;
  stoneItems: number;
  totalUsers: number;
  pageViews: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}