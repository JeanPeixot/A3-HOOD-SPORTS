import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, CustomerProfile, Reservation, Order, PaymentMethod, Category } from '../types';
import { INITIAL_CUSTOMER, MOCK_PRODUCTS } from '../data/mockProducts';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product, size?: string, discount?: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  
  reservations: Reservation[];
  reserveProduct: (product: Product, size: string) => void;
  cancelReservation: (id: string) => void;

  customer: CustomerProfile;
  useCashback: boolean;
  setUseCashback: React.Dispatch<React.SetStateAction<boolean>>;
  toggleCashback: () => void;

  selectedCategory: Category;
  setSelectedCategory: (cat: Category) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isPdvView: boolean;
  setIsPdvView: (active: boolean) => void;
  
  subtotal: number;
  regularDiscount: number;
  cashbackApplied: number;
  finalTotal: number;

  completedOrder: Order | null;
  completeCheckout: (paymentMethod: PaymentMethod) => void;
  closeOrderModal: () => void;

  activeNotification: string | null;
  showNotification: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Initial items reflecting user's screenshot
const INITIAL_CART: CartItem[] = [
  {
    product: MOCK_PRODUCTS[1], // Dark Edition Pegasus
    quantity: 1,
    selectedSize: '41',
    discountApplied: 5.00
  },
  {
    product: MOCK_PRODUCTS[2], // Hood Pro Hoodie
    quantity: 2,
    selectedSize: 'M',
    discountApplied: 5.00
  }
];

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(MOCK_PRODUCTS);
  const [customer, setCustomer] = useState<CustomerProfile>(() => {
    const saved = localStorage.getItem('hood_sports_customer');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMER;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('hood_sports_cart');
    return saved ? JSON.parse(saved) : INITIAL_CART;
  });

  const [reservations, setReservations] = useState<Reservation[]>(() => {
    const saved = localStorage.getItem('hood_sports_reservations');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [useCashback, setUseCashback] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isPdvView, setIsPdvView] = useState<boolean>(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [activeNotification, setActiveNotification] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('hood_sports_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('hood_sports_customer', JSON.stringify(customer));
  }, [customer]);

  useEffect(() => {
    localStorage.setItem('hood_sports_reservations', JSON.stringify(reservations));
  }, [reservations]);

  const showNotification = (msg: string) => {
    setActiveNotification(msg);
    setTimeout(() => {
      setActiveNotification(null);
    }, 3500);
  };

  const addToCart = (product: Product, size?: string, discount: number = 5.00) => {
    const chosenSize = size || product.sizes[0] || 'Único';
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.selectedSize === chosenSize
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1
        };
        return updated;
      } else {
        return [...prev, {
          product,
          quantity: 1,
          selectedSize: chosenSize,
          discountApplied: discount
        }];
      }
    });
    showNotification(`"${product.name}" adicionado ao carrinho!`);
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.selectedSize === size)));
  };

  const updateQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.product.id === productId && item.selectedSize === size) {
        return { ...item, quantity };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  const reserveProduct = (product: Product, size: string) => {
    const newReservation: Reservation = {
      id: `res-${Date.now()}`,
      product,
      selectedSize: size,
      reservedAt: new Date().toLocaleDateString('pt-BR'),
      expiresInDays: 3
    };
    setReservations(prev => [newReservation, ...prev]);
    showNotification(`Item reservado com sucesso por 3 dias!`);
  };

  const cancelReservation = (id: string) => {
    setReservations(prev => prev.filter(r => r.id !== id));
    showNotification(`Reserva cancelada.`);
  };

  const toggleCashback = () => {
    setUseCashback(prev => !prev);
  };

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const regularDiscount = cart.reduce((acc, item) => acc + (item.discountApplied * item.quantity), 0);
  
  const rawTotal = Math.max(0, subtotal - regularDiscount);
  const cashbackApplied = useCashback ? Math.min(customer.availableCashback, rawTotal) : 0;
  const finalTotal = Math.max(0, rawTotal - cashbackApplied);

  const completeCheckout = (paymentMethod: PaymentMethod) => {
    if (cart.length === 0) {
      showNotification('O carrinho está vazio!');
      return;
    }

    const earnedPoints = Math.round(finalTotal * 1.5);
    const newCashbackGenerated = parseFloat((finalTotal * 0.05).toFixed(2)); // 5% cashback

    const newOrder: Order = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      customer,
      items: [...cart],
      subtotal,
      discount: regularDiscount,
      cashbackUsed: cashbackApplied,
      total: finalTotal,
      paymentMethod,
      createdAt: new Date().toLocaleString('pt-BR'),
      status: 'concluido'
    };

    // Update customer loyalty stats
    setCustomer(prev => ({
      ...prev,
      onlinePurchases: isPdvView ? prev.onlinePurchases : prev.onlinePurchases + 1,
      inStorePurchases: isPdvView ? prev.inStorePurchases + 1 : prev.inStorePurchases,
      totalLoyaltyPoints: prev.totalLoyaltyPoints + earnedPoints,
      availableCashback: Number(Math.max(0, (prev.availableCashback - cashbackApplied) + newCashbackGenerated).toFixed(2))
    }));

    setCompletedOrder(newOrder);
    setCart([]);
    setUseCashback(false);
  };

  const closeOrderModal = () => setCompletedOrder(null);

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        reservations,
        reserveProduct,
        cancelReservation,
        customer,
        useCashback,
        setUseCashback,
        toggleCashback,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        isCartOpen,
        setIsCartOpen,
        isPdvView,
        setIsPdvView,
        subtotal,
        regularDiscount,
        cashbackApplied,
        finalTotal,
        completedOrder,
        completeCheckout,
        closeOrderModal,
        activeNotification,
        showNotification
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

