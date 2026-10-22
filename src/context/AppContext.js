import React, { createContext, useContext, useMemo, useRef, useState } from 'react';
import Toast from '../components/Toast';
import { PRODUCTS } from '../data/products';
import { shipping } from '../utils/format';

const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState(null);
  const pending = useRef(null);
  const timer = useRef(null);

  const showToast = (message, opts = {}) => {
    clearTimeout(timer.current);
    setToast({ id: Date.now(), message, type: 'info', ...opts });
    timer.current = setTimeout(() => setToast(null), 6000);
  };

  const login = (data) => {
    setUser({ avatar: null, ...data });
    const next = pending.current;
    pending.current = null;
    if (next) setTimeout(next, 0);
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    showToast('Você saiu da conta.');
  };
  const setAvatar = (avatar) => setUser((u) => ({ ...u, avatar }));

  const requireAuth = (navigation, action) => {
    if (user) return action();
    pending.current = action;
    navigation.navigate('Login');
  };

  const openLogin = (navigation) => {
    pending.current = null;
    navigation.navigate('Login');
  };

  const addToCart = (id, qty = 1) =>
    setCart((c) => {
      const found = c.find((i) => i.id === id);
      return found
        ? c.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i))
        : [...c, { id, qty }];
    });

  const addWithFeedback = (navigation, product, qty = 1) =>
    requireAuth(navigation, () => {
      addToCart(product.id, qty);
      showToast(`${qty > 1 ? `${qty}× ` : ''}${product.name} adicionado ao carrinho.`, {
        type: 'success',
        actionLabel: 'Ver carrinho',
        onAction: () => navigation.navigate('Main', { screen: 'Loja', params: { screen: 'Carrinho' } }),
      });
    });

  const changeQty = (id, delta) =>
    setCart((c) =>
      c.map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i)).filter((i) => i.qty > 0)
    );

  const clearCart = () => setCart([]);

  const value = useMemo(() => {
    const items = cart.map((i) => ({ ...i, product: PRODUCTS.find((p) => p.id === i.id) }));
    const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
    const freight = shipping(subtotal);
    return {
      user, login, logout, setAvatar, requireAuth, openLogin, showToast,
      items, count: items.reduce((s, i) => s + i.qty, 0),
      subtotal, freight, total: subtotal + freight,
      addToCart, addWithFeedback, changeQty, clearCart,
    };
  }, [user, cart]);

  return (
    <AppContext.Provider value={value}>
      {children}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </AppContext.Provider>
  );
}
