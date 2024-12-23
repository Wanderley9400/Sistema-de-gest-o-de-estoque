import React, { useState } from 'react';
import { Product } from '../types/product';
import { PlusCircle } from 'lucide-react';

interface ProductFormProps {
  onAddProduct: (product: Product) => void;
}

export function ProductForm({ onAddProduct }: ProductFormProps) {
  const [product, setProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    quantity: 0,
    expirationDate: '',
    minStockLevel: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProduct({
      ...product,
      id: crypto.randomUUID()
    });
    setProduct({
      name: '',
      quantity: 0,
      expirationDate: '',
      minStockLevel: 0
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Adicionar Produto</h2>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome do Produto</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={product.name}
            onChange={(e) => setProduct(prev => ({ ...prev, name: e.target.value }))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Quantidade</label>
          <input
            type="number"
            required
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={product.quantity}
            onChange={(e) => setProduct(prev => ({ ...prev, quantity: parseInt(e.target.value) }))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Data de Validade</label>
          <input
            type="date"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={product.expirationDate}
            onChange={(e) => setProduct(prev => ({ ...prev, expirationDate: e.target.value }))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Estoque Mínimo</label>
          <input
            type="number"
            required
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={product.minStockLevel}
            onChange={(e) => setProduct(prev => ({ ...prev, minStockLevel: parseInt(e.target.value) }))}
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Adicionar Produto
        </button>
      </div>
    </form>
  );
}