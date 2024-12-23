import React, { useState, useEffect } from 'react';
import { Product, ProductAlert } from './types/product';
import { ProductForm } from './components/ProductForm';
import { ProductList } from './components/ProductList';
import { AlertList } from './components/AlertList';
import { checkExpiration, checkStock } from './utils/alerts';
import { Package } from 'lucide-react';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [alerts, setAlerts] = useState<ProductAlert[]>([]);

  useEffect(() => {
    const newAlerts: ProductAlert[] = [];
    products.forEach(product => {
      const expirationAlert = checkExpiration(product);
      const stockAlert = checkStock(product);
      
      if (expirationAlert) newAlerts.push(expirationAlert);
      if (stockAlert) newAlerts.push(stockAlert);
    });
    setAlerts(newAlerts);
  }, [products]);

  const handleAddProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity < 0) return;
    setProducts(prev =>
      prev.map(product =>
        product.id === id ? { ...product, quantity } : product
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Package className="w-8 h-8 mr-2" />
              Controle de Estoque
            </h1>
          </div>

          <div className="space-y-8">
            <AlertList alerts={alerts} />
            
            <div className="grid grid-cols-1 gap-8 md:grid-cols-[2fr,1fr]">
              <div className="space-y-8">
                <ProductList
                  products={products}
                  onUpdateQuantity={handleUpdateQuantity}
                />
              </div>
              
              <div>
                <ProductForm onAddProduct={handleAddProduct} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;