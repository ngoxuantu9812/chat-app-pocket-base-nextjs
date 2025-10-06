// API simulation for the admin panel

import { 
  Product, 
  Post, 
  Banner, 
  Stone, 
  ConfigItem, 
  DashboardStats, 
  ApiResponse 
} from './types';
import { 
  mockProducts, 
  mockPosts, 
  mockBanners, 
  mockStones, 
  mockConfigs 
} from './mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Products API
export const productsApi = {
  getAll: async (): Promise<ApiResponse<Product[]>> => {
    await delay(500);
    return { success: true, data: mockProducts };
  },

  getById: async (id: string): Promise<ApiResponse<Product>> => {
    await delay(300);
    const product = mockProducts.find(p => p.id === id);
    if (product) {
      return { success: true, data: product };
    }
    return { success: false, error: 'Product not found' };
  },

  create: async (product: Omit<Product, 'id' | 'createdAt'>): Promise<ApiResponse<Product>> => {
    await delay(800);
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    return { success: true, data: newProduct, message: 'Product created successfully' };
  },

  update: async (id: string, product: Partial<Product>): Promise<ApiResponse<Product>> => {
    await delay(800);
    const existingProduct = mockProducts.find(p => p.id === id);
    if (existingProduct) {
      const updatedProduct = { ...existingProduct, ...product };
      return { success: true, data: updatedProduct, message: 'Product updated successfully' };
    }
    return { success: false, error: 'Product not found' };
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    await delay(500);
    return { success: true, message: 'Product deleted successfully' };
  },
};

// Posts API
export const postsApi = {
  getAll: async (): Promise<ApiResponse<Post[]>> => {
    await delay(500);
    return { success: true, data: mockPosts };
  },

  getById: async (id: string): Promise<ApiResponse<Post>> => {
    await delay(300);
    const post = mockPosts.find(p => p.id === id);
    if (post) {
      return { success: true, data: post };
    }
    return { success: false, error: 'Post not found' };
  },

  create: async (post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Post>> => {
    await delay(800);
    const newPost: Post = {
      ...post,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    return { success: true, data: newPost, message: 'Post created successfully' };
  },

  update: async (id: string, post: Partial<Post>): Promise<ApiResponse<Post>> => {
    await delay(800);
    const existingPost = mockPosts.find(p => p.id === id);
    if (existingPost) {
      const updatedPost = { 
        ...existingPost, 
        ...post, 
        updatedAt: new Date().toISOString().split('T')[0] 
      };
      return { success: true, data: updatedPost, message: 'Post updated successfully' };
    }
    return { success: false, error: 'Post not found' };
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    await delay(500);
    return { success: true, message: 'Post deleted successfully' };
  },
};

// Banners API
export const bannersApi = {
  getAll: async (): Promise<ApiResponse<Banner[]>> => {
    await delay(500);
    return { success: true, data: mockBanners };
  },

  getById: async (id: string): Promise<ApiResponse<Banner>> => {
    await delay(300);
    const banner = mockBanners.find(b => b.id === id);
    if (banner) {
      return { success: true, data: banner };
    }
    return { success: false, error: 'Banner not found' };
  },

  create: async (banner: Omit<Banner, 'id' | 'createdAt' | 'updatedAt' | 'clickCount' | 'impressions'>): Promise<ApiResponse<Banner>> => {
    await delay(800);
    const newBanner: Banner = {
      ...banner,
      id: Date.now().toString(),
      clickCount: 0,
      impressions: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    return { success: true, data: newBanner, message: 'Banner created successfully' };
  },

  update: async (id: string, banner: Partial<Banner>): Promise<ApiResponse<Banner>> => {
    await delay(800);
    const existingBanner = mockBanners.find(b => b.id === id);
    if (existingBanner) {
      const updatedBanner = { 
        ...existingBanner, 
        ...banner, 
        updatedAt: new Date().toISOString().split('T')[0] 
      };
      return { success: true, data: updatedBanner, message: 'Banner updated successfully' };
    }
    return { success: false, error: 'Banner not found' };
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    await delay(500);
    return { success: true, message: 'Banner deleted successfully' };
  },
};

// Stones API
export const stonesApi = {
  getAll: async (): Promise<ApiResponse<Stone[]>> => {
    await delay(500);
    return { success: true, data: mockStones };
  },

  getById: async (id: string): Promise<ApiResponse<Stone>> => {
    await delay(300);
    const stone = mockStones.find(s => s.id === id);
    if (stone) {
      return { success: true, data: stone };
    }
    return { success: false, error: 'Stone not found' };
  },

  create: async (stone: Omit<Stone, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Stone>> => {
    await delay(800);
    const newStone: Stone = {
      ...stone,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    return { success: true, data: newStone, message: 'Stone created successfully' };
  },

  update: async (id: string, stone: Partial<Stone>): Promise<ApiResponse<Stone>> => {
    await delay(800);
    const existingStone = mockStones.find(s => s.id === id);
    if (existingStone) {
      const updatedStone = { 
        ...existingStone, 
        ...stone, 
        updatedAt: new Date().toISOString().split('T')[0] 
      };
      return { success: true, data: updatedStone, message: 'Stone updated successfully' };
    }
    return { success: false, error: 'Stone not found' };
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    await delay(500);
    return { success: true, message: 'Stone deleted successfully' };
  },
};

// Config API
export const configApi = {
  getAll: async (): Promise<ApiResponse<Record<string, ConfigItem[]>>> => {
    await delay(500);
    return { success: true, data: mockConfigs };
  },

  update: async (configs: Record<string, any>): Promise<ApiResponse<void>> => {
    await delay(1000);
    return { success: true, message: 'Configuration updated successfully' };
  },
};

// Dashboard API
export const dashboardApi = {
  getStats: async (): Promise<ApiResponse<DashboardStats>> => {
    await delay(800);
    const stats: DashboardStats = {
      totalProducts: mockProducts.length,
      totalPosts: mockPosts.length,
      activeBanners: mockBanners.filter(b => b.status === 'active').length,
      stoneItems: mockStones.length,
      totalUsers: 2847,
      pageViews: 125847,
    };
    return { success: true, data: stats };
  },
};

// Upload API simulation
export const uploadApi = {
  uploadFile: async (file: File): Promise<ApiResponse<{ url: string }>> => {
    await delay(1500);
    // Simulate file upload
    const url = `/uploads/${Date.now()}-${file.name}`;
    return { success: true, data: { url }, message: 'File uploaded successfully' };
  },
};