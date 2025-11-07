
import React from 'react';
import { useSiteConfig } from '../App';
import { WhatsAppIcon } from '../assets/icons';

const FloatingWhatsApp: React.FC = () => {
    const { siteConfig } = useSiteConfig();
    const phoneNumber = siteConfig.companyInfo.phone2.replace(/\D/g, '');

    if (!phoneNumber) return null;

    return (
        <a
            href={`https://wa.me/55${phoneNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 bg-[#25D366] w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 hover:bg-[#128C7E] transition-all duration-300 z-50"
            aria-label="Contact us on WhatsApp"
        >
            <WhatsAppIcon className="w-8 h-8" />
        </a>
    );
}

export default FloatingWhatsApp;
