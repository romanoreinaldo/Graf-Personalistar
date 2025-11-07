
import React from 'react';
import { InstagramIcon, WhatsAppIcon, MapPinIcon, PhoneIcon } from '../assets/icons';
import { useSiteConfig } from '../App';

const Footer: React.FC = () => {
  const { siteConfig } = useSiteConfig();
  const { companyInfo, assets } = siteConfig;

  const hours = [
    { day: 'Segunda-feira', time: '08:00–19:00' },
    { day: 'Terça-feira', time: '08:00–19:00' },
    { day: 'Quarta-feira', time: '08:00–19:00' },
    { day: 'Quinta-feira', time: '08:00–19:00' },
    { day: 'Sexta-feira', time: '08:00–19:00' },
    { day: 'Sábado', time: '08:00–18:00' },
    { day: 'Domingo', time: '08:30–15:30' },
  ];

  const phone2NumberOnly = companyInfo.phone2.replace(/\D/g, '');

  return (
    <footer className="bg-gray-100 dark:bg-gray-950 border-t border-[var(--color-primary)]/20 text-gray-600 dark:text-gray-400">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="flex flex-col items-start">
            {assets.logoUrl ? (
               <img src={assets.logoUrl} alt="Gráfica Personalistar Logo" className="h-16 w-auto mb-4" />
            ) : (
               <span className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Personalistar</span>
            )}
            <p className="text-sm">Sua parceira em impressão e personalização. Qualidade e criatividade em cada detalhe.</p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPinIcon className="w-5 h-5 mr-3 mt-1 text-[var(--color-secondary)] flex-shrink-0" />
                <span>{companyInfo.address}</span>
              </li>
              <li className="flex items-center">
                <PhoneIcon className="w-5 h-5 mr-3 text-[var(--color-secondary)]" />
                <a href={`tel:${companyInfo.phone1}`} className="hover:text-gray-900 dark:hover:text-white">{companyInfo.phone1}</a>
              </li>
              <li className="flex items-center">
                <WhatsAppIcon className="w-5 h-5 mr-3 text-[var(--color-secondary)]" />
                <a href={`https://wa.me/55${phone2NumberOnly}`} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-white">{companyInfo.phone2}</a>
              </li>
            </ul>
          </div>
          
          {/* Opening Hours */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Horário de Funcionamento</h3>
            <ul className="space-y-2 text-sm">
              {hours.map(h => (
                <li key={h.day} className="flex justify-between">
                  <span>{h.day}</span>
                  <span className="font-mono">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Siga-nos</h3>
            <a href={`https://instagram.com/${companyInfo.instagramUser}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 text-lg hover:text-gray-900 dark:hover:text-white transition-colors">
              <InstagramIcon className="w-8 h-8"/>
              <span>@{companyInfo.instagramUser}</span>
            </a>
          </div>

        </div>
        <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Gráfica Personalistar. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
