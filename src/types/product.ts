export interface Product {
  id: string;
  name: string;
  quantity: number;
  expirationDate: string;
  minStockLevel: number;
}

export interface ProductAlert {
  type: 'expiration' | 'stock';
  message: string;
  severity: 'warning' | 'danger';
  productId: string;
}