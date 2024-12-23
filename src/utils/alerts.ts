import { Product, ProductAlert } from '../types/product';

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export function checkExpiration(product: Product): ProductAlert | null {
  const today = new Date();
  const expDate = new Date(product.expirationDate);
  const daysUntilExpiration = Math.ceil((expDate.getTime() - today.getTime()) / DAY_IN_MS);

  if (daysUntilExpiration <= 0) {
    return {
      type: 'expiration',
      message: `${product.name} VENCIDO!`,
      severity: 'danger',
      productId: product.id
    };
  } else if (daysUntilExpiration <= 30) {
    return {
      type: 'expiration',
      message: `${product.name} vence em ${daysUntilExpiration} dias`,
      severity: 'warning',
      productId: product.id
    };
  }
  return null;
}

export function checkStock(product: Product): ProductAlert | null {
  if (product.quantity <= 0) {
    return {
      type: 'stock',
      message: `${product.name} está sem estoque!`,
      severity: 'danger',
      productId: product.id
    };
  } else if (product.quantity <= product.minStockLevel) {
    return {
      type: 'stock',
      message: `${product.name} está com estoque baixo (${product.quantity} unidades)`,
      severity: 'warning',
      productId: product.id
    };
  }
  return null;
}