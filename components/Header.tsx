
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppContext, useSiteConfig } from '../App';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAppContext();
  const { siteConfig } = useSiteConfig();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `relative px-3 py-2 text-sm font-medium transition-colors duration-300 ${
      isActive 
        ? 'text-[var(--color-primary)]' 
        : 'text-gray-600 dark:text-gray-300 hover:text-[var(--color-primary)] dark:hover:text-[var(--color-primary)]'
    } after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-0.5 after:w-0 after:bg-[var(--color-primary)] after:transition-all after:duration-300 after:-translate-x-1/2 ${isActive ? 'after:w-full' : 'group-hover:after:w-full'}`;

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 shadow-md">
      <div className="bg-[var(--color-primary)] h-1.5"></div>
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <NavLink to="/" className="flex items-center space-x-2">
          {siteConfig.assets.logoUrl ? (
            <img src={siteConfig.assets.logoUrl} alt="Gráfica Personalistar Logo" className="h-12 w-auto" />
          ) : (
            <span className="text-xl font-bold">Personalistar</span>
          )}
        </NavLink>
        <div className="hidden md:flex items-center space-x-2">
          <NavLink to="/" className={navLinkClasses}>PÁGINA INICIAL</NavLink>
          <NavLink to="/pedido-personalizado" className={navLinkClasses}>PEDIDO PERSONALIZADO</NavLink>
          <NavLink to="/balcoes-de-retirada" className={navLinkClasses}>BALCÕES DE RETIRADA</NavLink>
          <NavLink to="/contato" className={navLinkClasses}>CONTATO</NavLink>
          <NavLink to="/products" className={navLinkClasses}>PRODUTOS</NavLink>
        </div>
        <div>
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <NavLink to="/admin" className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                Admin
              </NavLink>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors"
              >
                Sair
              </button>
            </div>
          ) : (
             <NavLink to="/login" className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                Login
              </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
