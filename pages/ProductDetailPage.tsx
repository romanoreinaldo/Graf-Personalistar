
import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../App';
import type { Product, ProductVariation } from '../types';

const DownloadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { products } = useAppContext();

  const product = useMemo(() => products.find(p => p.id === productId), [products, productId]);
  
  const [selectedImage, setSelectedImage] = useState(product?.imageUrl || '');
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | undefined>(product?.variations[0]);

  React.useEffect(() => {
    if (product) {
      setSelectedImage(product.imageUrl);
      setSelectedVariation(product.variations[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Produto não encontrado</h2>
        <Link to="/products" className="text-[var(--color-primary)] hover:underline mt-4 inline-block">
          Voltar para a lista de produtos
        </Link>
      </div>
    );
  }

  const handleVariationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const variationName = e.target.value;
    const variation = product.variations.find(v => v.name === variationName);
    setSelectedVariation(variation);
  };
  
  const inputClass = "w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]";
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Image Gallery */}
      <div className="flex flex-col-reverse md:flex-row gap-4">
        <div className="flex md:flex-col gap-2 justify-center md:justify-start">
          {product.imageGallery.map((img, index) => (
            <img 
              key={index}
              src={img}
              alt={`${product.name} - view ${index + 1}`}
              className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 ${selectedImage === img ? 'border-[var(--color-primary)]' : 'border-transparent'}`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
        <div className="flex-grow">
          <img src={selectedImage} alt={product.name} className="w-full h-auto object-contain rounded-lg shadow-lg" />
        </div>
      </div>

      {/* Product Details */}
      <div>
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          <Link to="/" className="hover:text-gray-900 dark:hover:text-white">INÍCIO</Link> &gt; <span className="uppercase text-gray-800 dark:text-white">{product.name}</span>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">{product.name}</h1>
        <p className="text-gray-500 text-sm mb-4">Código: {product.code}</p>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{product.description}</p>
        
        <div className="mb-6 border-t border-b border-gray-200 dark:border-gray-700 py-4">
            <ul className="space-y-2">
                {product.details.map((detail, index) => (
                    <li key={index} className="text-gray-600 dark:text-gray-300">
                        <span className="font-semibold text-gray-800 dark:text-white">&gt; {detail.split(':')[0]}:</span>
                        {detail.split(':')[1]}
                    </li>
                ))}
            </ul>
        </div>
        
        <button className="inline-flex items-center gap-2 text-sm text-[var(--color-primary)] hover:opacity-80 mb-6">
          <DownloadIcon />
          Baixar Gabarito
        </button>

        {/* Pricing & Options */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
          {selectedVariation && (
            <>
              <p className="text-gray-500 dark:text-gray-400">Por Apenas</p>
              <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] mb-2">
                R$ {selectedVariation.price.toFixed(2).replace('.', ',')}
              </p>
              {selectedVariation.discountPrice && (
                 <>
                  <p className="text-gray-500 dark:text-gray-400">ou <span className="font-bold text-gray-800 dark:text-white">R$ {selectedVariation.discountPrice.toFixed(2).replace('.', ',')}</span> integral via Depósito/Transferência</p>
                  <p className="text-gray-500 dark:text-gray-400">ou <span className="font-bold text-gray-800 dark:text-white">R$ {selectedVariation.discountPrice.toFixed(2).replace('.', ',')}</span> Pagando à vista via PIX</p>
                </>
              )}
            </>
          )}

          <div className="mt-6">
            <label htmlFor="variation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quantidade:</label>
            <select
                id="variation"
                value={selectedVariation?.name}
                onChange={handleVariationChange}
                className={inputClass}
            >
                {product.variations.map(v => (
                    <option key={v.name} value={v.name}>{v.name}</option>
                ))}
            </select>
          </div>
          <button className="w-full mt-6 bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-green-700 transform transition-transform duration-300 shadow-lg">
            COMPRAR AGORA
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
