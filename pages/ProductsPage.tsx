
import React from 'react';
import ProductCard from '../components/ProductCard';
import { useAppContext } from '../App';

const ProductsPage: React.FC = () => {
  const { products } = useAppContext();

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
        Todos os Nossos Produtos
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
