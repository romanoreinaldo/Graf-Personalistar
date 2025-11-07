
import React, { useState, useEffect } from 'react';
import type { Product, ProductVariation, SiteConfig, BannerSlide } from '../types';
import { ShippingType } from '../types';
import { useAppContext, useSiteConfig } from '../App';

type AdminView = 'view' | 'add' | 'profile' | 'settings';

const AdminPage: React.FC = () => {
  const [currentView, setCurrentView] = useState<AdminView>('settings');
  
  const renderView = () => {
    switch(currentView) {
      case 'view':
        return <ViewProducts />;
      case 'add':
        return <AddProductForm setView={setCurrentView} />;
      case 'profile':
        return <AdminProfile />;
      case 'settings':
        return <SiteSettings />;
      default:
        return <ViewProducts />;
    }
  };

  const getButtonClass = (view: AdminView) => {
    return `px-4 py-2 rounded-md font-medium transition-colors ${
      currentView === view 
        ? 'bg-[var(--color-primary)] text-white' 
        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
    }`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-6">Painel do Administrador</h1>
      <div className="flex flex-wrap gap-4 mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
        <button onClick={() => setCurrentView('settings')} className={getButtonClass('settings')}>Configurações do Site</button>
        <button onClick={() => setCurrentView('view')} className={getButtonClass('view')}>Gerenciar Produtos</button>
        <button onClick={() => setCurrentView('add')} className={getButtonClass('add')}>Adicionar Produto</button>
        <button onClick={() => setCurrentView('profile')} className={getButtonClass('profile')}>Perfil</button>
      </div>
      <div>
        {renderView()}
      </div>
    </div>
  );
};

const ViewProducts: React.FC = () => {
    const { products, deleteProduct } = useAppContext();
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Produtos Atuais</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-600">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nome</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Código</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Variações</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                        {products.map(product => (
                            <tr key={product.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{product.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{product.code}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{product.variations.length}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => {}} className="text-blue-500 hover:text-blue-700 mr-4">Editar</button>
                                    <button onClick={() => deleteProduct(product.id)} className="text-red-500 hover:text-red-700">Deletar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

interface AddProductFormProps {
  setView: (view: AdminView) => void;
}

const inputClass = "mt-1 block w-full px-3 py-2 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]";

const AddProductForm: React.FC<AddProductFormProps> = ({ setView }) => {
  const { addProduct } = useAppContext();
  const [formState, setFormState] = useState({ name: '', code: '', description: '', shipping: ShippingType.NEGOTIATE });
  const [imageUrls, setImageUrls] = useState<string[]>(['']);
  const [details, setDetails] = useState<string[]>(['']);
  const [variations, setVariations] = useState<Partial<ProductVariation>[]>([{ name: '', price: undefined, discountPrice: undefined }]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  
  const handleImageUrlChange = (index: number, value: string) => {
    setImageUrls(prev => prev.map((url, i) => i === index ? value : url));
  };
  const addImageUrl = () => setImageUrls(prev => [...prev, '']);
  const removeImageUrl = (index: number) => {
    if (imageUrls.length > 1) setImageUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleDetailChange = (index: number, value: string) => {
    setDetails(prev => prev.map((d, i) => i === index ? value : d));
  };
  const addDetail = () => setDetails(prev => [...prev, '']);
  const removeDetail = (index: number) => setDetails(prev => prev.filter((_, i) => i !== index));

  const handleVariationChange = (index: number, field: keyof ProductVariation, value: string) => {
    setVariations(prev => prev.map((v, i) => i === index ? { ...v, [field]: value } : v));
  };
  const addVariation = () => setVariations(prev => [...prev, { name: '', price: undefined, discountPrice: undefined }]);
  const removeVariation = (index: number) => setVariations(prev => prev.filter((_, i) => i !== index));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredImageUrls = imageUrls.filter(url => url.trim() !== '');
    if (filteredImageUrls.length === 0) {
        alert('Adicione pelo menos uma URL de imagem.');
        return;
    }

    const newProduct: Omit<Product, 'id'> = {
      ...formState,
      imageUrl: filteredImageUrls[0],
      imageGallery: filteredImageUrls,
      details: details.filter(d => d.trim() !== ''),
      variations: variations.map(v => ({
        name: v.name || '',
        price: parseFloat(String(v.price)) || 0,
        discountPrice: v.discountPrice ? parseFloat(String(v.discountPrice)) : undefined,
      })).filter(v => v.name && v.price > 0),
    };
    addProduct(newProduct);
    setView('view');
  };
  
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Adicionar Novo Produto</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nome do Produto</label>
            <input type="text" name="name" id="name" value={formState.name} onChange={handleChange} required className={inputClass} />
          </div>
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Código</label>
            <input type="text" name="code" id="code" value={formState.code} onChange={handleChange} required className={inputClass} />
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Descrição</label>
          <textarea name="description" id="description" value={formState.description} onChange={handleChange} required className={inputClass} rows={3}></textarea>
        </div>
        <div>
          <label htmlFor="shipping" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tipo de Frete</label>
          <select name="shipping" id="shipping" value={formState.shipping} onChange={handleChange} required className={inputClass}>
            {Object.values(ShippingType).map(type => ( <option key={type} value={type}>{type}</option> ))}
          </select>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-semibold mb-2">Imagens do Produto</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">A primeira URL será a imagem principal do produto.</p>
            {imageUrls.map((url, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                    <input type="url" value={url} onChange={(e) => handleImageUrlChange(index, e.target.value)} placeholder={`URL da Imagem ${index + 1}`} required={index === 0} className={`${inputClass} w-full`} />
                    {imageUrls.length > 1 && ( <button type="button" onClick={() => removeImageUrl(index)} className="text-red-500 hover:text-red-700 p-2 rounded-full bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500">&times;</button> )}
                </div>
            ))}
            <button type="button" onClick={addImageUrl} className="text-sm text-[var(--color-primary)] hover:opacity-80">+ Adicionar URL de Imagem</button>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-semibold mb-2">Detalhes do Produto</h3>
            {details.map((detail, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                    <input type="text" value={detail} onChange={(e) => handleDetailChange(index, e.target.value)} placeholder={`Detalhe ${index + 1}`} className={`${inputClass} w-full`} />
                    <button type="button" onClick={() => removeDetail(index)} className="text-red-500 hover:text-red-700 p-2 rounded-full bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500">&times;</button>
                </div>
            ))}
            <button type="button" onClick={addDetail} className="text-sm text-[var(--color-primary)] hover:opacity-80">+ Adicionar Detalhe</button>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="text-lg font-semibold mb-2">Variações de Preço</h3>
          {variations.map((variation, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-7 gap-3 mb-4 p-4 border border-gray-300 dark:border-gray-600 rounded-lg">
              <div className="md:col-span-3">
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">Nome Variação</label>
                <input type="text" value={variation.name} onChange={e => handleVariationChange(index, 'name', e.target.value)} required className={inputClass} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">Preço Padrão (R$)</label>
                <input type="number" value={variation.price || ''} onChange={e => handleVariationChange(index, 'price', e.target.value)} required className={inputClass} step="0.01" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">Preço com Desconto</label>
                <input type="number" value={variation.discountPrice || ''} onChange={e => handleVariationChange(index, 'discountPrice', e.target.value)} className={inputClass} step="0.01" />
              </div>
              {variations.length > 1 && ( <div className="md:col-span-7 flex justify-end"><button type="button" onClick={() => removeVariation(index)} className="text-xs text-red-500 hover:text-red-400">Remover</button></div> )}
            </div>
          ))}
          <button type="button" onClick={addVariation} className="text-sm text-[var(--color-primary)] hover:opacity-80">+ Adicionar Variação</button>
        </div>

        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button type="button" onClick={() => setView('view')} className="px-4 py-2 rounded-md font-medium bg-gray-500 text-white hover:bg-gray-400">Cancelar</button>
            <button type="submit" style={{ background: `linear-gradient(to right, var(--color-primary), var(--color-secondary))` }} className="px-4 py-2 rounded-md font-medium text-white hover:opacity-90">Adicionar Produto</button>
        </div>
      </form>
    </div>
  );
};

const AdminProfile: React.FC = () => {
    const [adminUser, setAdminUser] = useState({ name: "Admin", email: "admin@personalistar.com" });
    const [isEditing, setIsEditing] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAdminUser({...adminUser, [e.target.name]: e.target.value });
    }
    
    const handleSave = () => {
        setPasswordError('');
        if (password && password !== confirmPassword) {
            setPasswordError('As senhas não coincidem.');
            return;
        }
        console.log('Perfil salvo:', adminUser);
        if (password) console.log('Senha atualizada!');
        setPassword('');
        setConfirmPassword('');
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setPassword('');
        setConfirmPassword('');
        setPasswordError('');
    };
    
    const readOnlyClass = "mt-1 w-full p-2 bg-gray-100 dark:bg-gray-700 rounded-md read-only:border-transparent focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]";
    const editClass = "mt-1 w-full p-2 bg-gray-200 dark:bg-gray-600 rounded-md focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]";

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Perfil do Administrador</h2>
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg space-y-4">
                <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nome</label>
                    <input type="text" name="name" value={adminUser.name} onChange={handleChange} readOnly={!isEditing} className={isEditing ? editClass: readOnlyClass}/>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                    <input type="email" name="email" value={adminUser.email} onChange={handleChange} readOnly={!isEditing} className={isEditing ? editClass: readOnlyClass} />
                </div>
                
                {isEditing && (
                  <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                      <h3 className="text-md font-semibold mb-2">Alterar Senha</h3>
                      <div>
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nova Senha</label>
                          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Deixe em branco para não alterar" className={editClass} />
                      </div>
                      <div className="mt-2">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Confirmar Nova Senha</label>
                          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={editClass}/>
                      </div>
                      {passwordError && <p className="text-sm text-red-500 mt-2">{passwordError}</p>}
                  </div>
                )}

                <div className="flex justify-end space-x-4">
                    {isEditing ? (
                        <>
                            <button onClick={handleCancel} className="px-4 py-2 rounded-md font-medium bg-gray-500 text-white hover:bg-gray-400">Cancelar</button>
                            <button onClick={handleSave} className="px-4 py-2 rounded-md font-medium bg-green-600 text-white hover:bg-green-700">Salvar</button>
                        </>
                    ) : (
                        <button onClick={() => setIsEditing(true)} className="px-4 py-2 rounded-md font-medium bg-[var(--color-primary)] text-white hover:opacity-90">Editar</button>
                    )}
                </div>
            </div>
        </div>
    );
};

const SiteSettings = () => {
    const { siteConfig, updateSiteConfig } = useSiteConfig();
    const [config, setConfig] = useState<SiteConfig>(siteConfig);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        setConfig(siteConfig);
    }, [siteConfig]);

    const handleNestedChange = (path: string, value: any) => {
        setConfig(prev => {
            const keys = path.split('.');
            let current = prev;
            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = value;
            return { ...prev };
        });
    };

    const handleSlideChange = (index: number, field: keyof BannerSlide, value: any) => {
        const newSlides = [...config.content.home.bannerSlides];
        newSlides[index] = { ...newSlides[index], [field]: value };
        handleNestedChange('content.home.bannerSlides', newSlides);
    };
    
    const addSlide = () => {
        const newSlide = { imageUrl: '', title: '', subtitle: '', buttonText: '', buttonLink: '' };
        handleNestedChange('content.home.bannerSlides', [...config.content.home.bannerSlides, newSlide]);
    };

    const removeSlide = (index: number) => {
        const newSlides = config.content.home.bannerSlides.filter((_, i) => i !== index);
        handleNestedChange('content.home.bannerSlides', newSlides);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (loadEvent) => {
                const base64Url = loadEvent.target?.result as string;
                callback(base64Url);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        updateSiteConfig(config);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    }
    
    const fileInputClass = `${inputClass} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[var(--color-primary)]/20 file:text-[var(--color-primary)] hover:file:bg-[var(--color-primary)]/30 cursor-pointer`;
    const subSectionClass = "bg-gray-100 dark:bg-gray-700 p-6 rounded-lg";
    const subSectionTitleClass = "text-xl font-semibold mb-4 border-b border-gray-300 dark:border-gray-600 pb-2";

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-semibold">Configurações Gerais do Site</h2>

            {/* General Info */}
            <div className={subSectionClass}>
                <h3 className={subSectionTitleClass}>Informações da Empresa</h3>
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium">Endereço</label>
                        <input type="text" value={config.companyInfo.address} onChange={e => handleNestedChange('companyInfo.address', e.target.value)} className={inputClass} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium">Telefone 1</label>
                            <input type="text" value={config.companyInfo.phone1} onChange={e => handleNestedChange('companyInfo.phone1', e.target.value)} className={inputClass} />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Telefone 2 (WhatsApp)</label>
                            <input type="text" value={config.companyInfo.phone2} onChange={e => handleNestedChange('companyInfo.phone2', e.target.value)} className={inputClass} />
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium">Usuário do Instagram (sem @)</label>
                        <input type="text" value={config.companyInfo.instagramUser} onChange={e => handleNestedChange('companyInfo.instagramUser', e.target.value)} className={inputClass} />
                    </div>
                </div>
            </div>

            {/* Appearance */}
            <div className={subSectionClass}>
                <h3 className={subSectionTitleClass}>Aparência</h3>
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium">Tema do Site</label>
                        <select value={config.theme.mode} onChange={e => handleNestedChange('theme.mode', e.target.value)} className={inputClass}>
                            <option value="dark">Escuro</option>
                            <option value="light">Claro</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium flex items-center gap-2">Cor Primária <div className="w-4 h-4 rounded-full" style={{backgroundColor: config.theme.primaryColor}}></div></label>
                            <input type="color" value={config.theme.primaryColor} onChange={e => handleNestedChange('theme.primaryColor', e.target.value)} className={`${inputClass} w-full h-10 p-1`} />
                        </div>
                        <div>
                            <label className="text-sm font-medium flex items-center gap-2">Cor Secundária <div className="w-4 h-4 rounded-full" style={{backgroundColor: config.theme.secondaryColor}}></div></label>
                            <input type="color" value={config.theme.secondaryColor} onChange={e => handleNestedChange('theme.secondaryColor', e.target.value)} className={`${inputClass} w-full h-10 p-1`} />
                        </div>
                    </div>
                     <div>
                        <label className="text-sm font-medium">Logo</label>
                        <div className="mt-1 flex items-center gap-4">
                          {config.assets.logoUrl && <img src={config.assets.logoUrl} alt="Pré-visualização da Logo" className="h-12 w-auto bg-gray-500/20 p-1 rounded" />}
                          <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, (url) => handleNestedChange('assets.logoUrl', url))} className={fileInputClass} />
                        </div>
                    </div>
                     <div>
                        <label className="text-sm font-medium">Favicon</label>
                         <div className="mt-1 flex items-center gap-4">
                          {config.assets.faviconUrl && <img src={config.assets.faviconUrl} alt="Pré-visualização do Favicon" className="h-8 w-8" />}
                          <input type="file" accept="image/x-icon,image/png,image/svg+xml" onChange={(e) => handleFileChange(e, (url) => handleNestedChange('assets.faviconUrl', url))} className={fileInputClass} />
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Home Page Content */}
            <div className={subSectionClass}>
                <h3 className={subSectionTitleClass}>Slides do Banner (Página Inicial)</h3>
                <div className="space-y-6">
                    {config.content.home.bannerSlides.map((slide, index) => (
                        <div key={index} className="p-4 border border-gray-400 dark:border-gray-600 rounded-lg space-y-3 relative">
                            <h4 className="font-semibold">Slide {index + 1}</h4>
                            <div>
                                <label className="text-xs">Imagem do Slide</label>
                                <div className="flex items-center gap-4">
                                    {slide.imageUrl && <img src={slide.imageUrl} alt="preview" className="h-16 w-auto rounded bg-gray-500/20" />}
                                    <input type="file" accept="image/*" onChange={e => handleFileChange(e, url => handleSlideChange(index, 'imageUrl', url))} className={fileInputClass} />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs">Título</label>
                                <input type="text" value={slide.title} onChange={e => handleSlideChange(index, 'title', e.target.value)} className={inputClass} />
                            </div>
                            <div>
                                <label className="text-xs">Subtítulo</label>
                                <input type="text" value={slide.subtitle} onChange={e => handleSlideChange(index, 'subtitle', e.target.value)} className={inputClass} />
                            </div>
                             <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs">Texto do Botão</label>
                                    <input type="text" value={slide.buttonText} onChange={e => handleSlideChange(index, 'buttonText', e.target.value)} className={inputClass} />
                                </div>
                                <div>
                                    <label className="text-xs">Link do Botão (ex: /products)</label>
                                    <input type="text" value={slide.buttonLink} onChange={e => handleSlideChange(index, 'buttonLink', e.target.value)} className={inputClass} />
                                </div>
                             </div>
                             <button onClick={() => removeSlide(index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1 text-xs">Remover Slide</button>
                        </div>
                    ))}
                    <button onClick={addSlide} className="text-sm font-medium text-[var(--color-primary)] hover:opacity-80">+ Adicionar Novo Slide</button>
                </div>
            </div>

            <div className="flex justify-end items-center mt-8">
                {saved && <span className="text-green-500 mr-4">Alterações salvas com sucesso!</span>}
                <button onClick={handleSave} className="px-6 py-2 rounded-md font-medium bg-green-600 text-white hover:bg-green-700">
                    Salvar Alterações
                </button>
            </div>
        </div>
    );
};

export default AdminPage;
