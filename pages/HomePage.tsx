
import React from 'react';
import ProductCard from '../components/ProductCard';
import BannerCarousel from '../components/BannerCarousel';
import { useAppContext, useSiteConfig } from '../App';
import { MapPinIcon, PhoneIcon, ClockIcon, WhatsAppIcon } from '../assets/icons';

const HomePage: React.FC = () => {
  const { products } = useAppContext();
  const { siteConfig } = useSiteConfig();
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="space-y-24">
      {/* Hero Section - Replaced with Banner */}
      <section className="relative -mt-12">
         <BannerCarousel slides={siteConfig.content.home.bannerSlides} />
      </section>

      {/* Featured Products Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">Nossos Destaques</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 md:p-12 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">Entre em Contato</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Estamos prontos para atender você!</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
                <MapPinIcon className="w-12 h-12 text-[var(--color-secondary)] mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Endereço</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1 max-w-xs">{siteConfig.companyInfo.address}</p>
            </div>
            <div className="flex flex-col items-center">
                <PhoneIcon className="w-12 h-12 text-[var(--color-secondary)] mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Telefones</h3>
                <a href={`tel:${siteConfig.companyInfo.phone1}`} className="text-gray-600 dark:text-gray-400 mt-1 hover:text-gray-900 dark:hover:text-white">{siteConfig.companyInfo.phone1}</a>
                <a href={`https://wa.me/55${siteConfig.companyInfo.phone2.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 dark:text-gray-400 mt-1 hover:text-gray-900 dark:hover:text-white">
                  <WhatsAppIcon className="w-4 h-4 mr-2"/>{siteConfig.companyInfo.phone2}
                </a>
            </div>
            <div className="flex flex-col items-center">
                <ClockIcon className="w-12 h-12 text-[var(--color-secondary)] mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Funcionamento</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Seg-Sex: 08h-19h</p>
                <p className="text-gray-600 dark:text-gray-400">Sáb: 08h-18h | Dom: 08:30h-15:30h</p>
            </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
