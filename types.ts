
export enum ShippingType {
  FREE = 'Frete Grátis',
  PAID = 'Frete a Calcular',
  NEGOTIATE = 'A Combinar',
}

export interface ProductVariation {
  name: string; // e.g., "1000 Unidades"
  price: number;
  discountPrice?: number; // e.g., Price for PIX or Transfer
}

export interface Product {
  id: string;
  name: string;
  code: string;
  description: string;
  details: string[];
  imageUrl: string;
  imageGallery: string[];
  shipping: ShippingType;
  variations: ProductVariation[];
}

// --- New Types for Site Configuration CMS ---

export type ThemeMode = 'dark' | 'light';

export interface CompanyInfo {
  address: string;
  phone1: string;
  phone2: string;
  instagramUser: string;
}

export interface ThemeSettings {
  mode: ThemeMode;
  primaryColor: string;
  secondaryColor: string;
}

export interface SiteAssets {
  logoUrl: string;
  faviconUrl: string;
}

export interface BannerSlide {
  imageUrl: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

export interface HomePageContent {
  heroTitle: string;
  heroSubtitle: string;
  bannerSlides: BannerSlide[];
}

export interface SiteConfig {
  companyInfo: CompanyInfo;
  theme: ThemeSettings;
  assets: SiteAssets;
  content: {
    home: HomePageContent;
  };
}
