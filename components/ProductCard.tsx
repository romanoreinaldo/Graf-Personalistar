
import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const startingPrice = product.variations.length > 0
    ? Math.min(...product.variations.map(v => v.price))
    : 0;

  return (
    <Link to={`/product/${product.id}`} className="block">
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-[var(--color-primary)]/40 transition-shadow duration-300 group h-full flex flex-col">
        <div className="overflow-hidden">
          <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{product.name}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 h-12 overflow-hidden flex-grow">{product.description}</p>
          <div className="flex justify-between items-center mt-auto">
            <p className="text-lg font-extrabold" style={{ color: 'var(--color-primary)'}}>
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">A partir de</span><br/>
              R${startingPrice.toFixed(2).replace('.', ',')}
            </p>
            <span className="bg-[var(--color-primary)]/20 text-[var(--color-primary)] text-xs font-semibold px-2.5 py-1 rounded-full">
              {product.shipping}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
