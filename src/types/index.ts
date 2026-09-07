export type Category = 'shoes' | 'apparel' | 'equipment' | 'times' | 'all';

export interface Product {
  id: string;
  name: string;
  category: 'shoes' | 'apparel' | 'equipment' | 'times';
  variant: string;
  originalPrice: number;
  price: number;
  discountBadge?: string;
  sizes: string[];
  image: string;
  description: string;
  rating: number;
  reviewsCount: number;
  inStock: number;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  discountApplied: number;
}

export interface CustomerProfile {
  name: string;
  handle: string;
  avatar: string;
  inStorePurchases: number;
  onlinePurchases: number;
  totalLoyaltyPoints: number;
  availableCashback: number;
}

export type PaymentMethod = 'credit_card' | 'debit_card' | 'cash' | 'pix';

export interface OrderItem {
  productId: string;
  productName: string;
  size: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customer: CustomerProfile;
  items: CartItem[];
  subtotal: number;
  discount: number;
  cashbackUsed: number;
  total: number;
  paymentMethod: PaymentMethod;
  createdAt: string;
  status: 'concluido' | 'processando' | 'reservado';
}

export interface Reservation {
  id: string;
  product: Product;
  selectedSize: string;
  reservedAt: string;
  expiresInDays: number;
}

