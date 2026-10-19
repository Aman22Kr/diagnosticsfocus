import React, { createContext, useContext, useState, useEffect } from 'react';
import { StorageService, CartItem, BookingRecord, PrescriptionRecord } from '../utils/storage';

interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface AppContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  
  savedItemIds: string[];
  toggleSaveItem: (id: string) => void;
  isItemSaved: (id: string) => boolean;

  selectedCity: string;
  setSelectedCity: (city: string) => void;

  bookings: BookingRecord[];
  addBooking: (b: BookingRecord) => void;

  prescriptions: PrescriptionRecord[];
  addPrescription: (rx: PrescriptionRecord) => void;

  searchHistory: string[];
  recordSearch: (query: string) => void;
  clearHistory: () => void;

  animSettings: { speed: 'NORMAL' | 'FAST' | 'SLOW'; intensity: 'STRONG' | 'BALANCED' | 'OFF' };
  setAnimSettings: (settings: { speed: 'NORMAL' | 'FAST' | 'SLOW'; intensity: 'STRONG' | 'BALANCED' | 'OFF' }) => void;

  toasts: ToastMessage[];
  showToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => StorageService.getCart());
  const [savedItemIds, setSavedItemIds] = useState<string[]>(() => StorageService.getSavedItems());
  const [selectedCity, setSelectedCityState] = useState<string>(() => StorageService.getSelectedCity());
  const [bookings, setBookings] = useState<BookingRecord[]>(() => StorageService.getBookings());
  const [prescriptions, setPrescriptions] = useState<PrescriptionRecord[]>(() => StorageService.getPrescriptions());
  const [searchHistory, setSearchHistory] = useState<string[]>(() => StorageService.getSearchHistory());
  const [animSettings, setAnimSettingsState] = useState(() => StorageService.getAnimationSettings());
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const addToCart = (item: CartItem) => {
    const updated = StorageService.addToCart(item);
    setCart(updated);
    showToast(`Added "${item.name}" to cart!`, 'success');
  };

  const removeFromCart = (id: string) => {
    const updated = StorageService.removeFromCart(id);
    setCart(updated);
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    StorageService.clearCart();
    setCart([]);
  };

  const toggleSaveItem = (id: string) => {
    const updated = StorageService.toggleSavedItem(id);
    setSavedItemIds(updated);
    const added = updated.includes(id);
    showToast(added ? 'Saved to bookmarks' : 'Removed from bookmarks', 'info');
  };

  const isItemSaved = (id: string) => savedItemIds.includes(id);

  const setSelectedCity = (city: string) => {
    StorageService.setSelectedCity(city);
    setSelectedCityState(city);
    showToast(`Location set to ${city}`, 'info');
  };

  const addBooking = (b: BookingRecord) => {
    StorageService.addBooking(b);
    setBookings(StorageService.getBookings());
    showToast(`Booking ${b.bookingId} confirmed!`, 'success');
  };

  const addPrescription = (rx: PrescriptionRecord) => {
    StorageService.addPrescription(rx);
    setPrescriptions(StorageService.getPrescriptions());
    showToast('Prescription submitted for pharmacist review!', 'success');
  };

  const recordSearch = (query: string) => {
    StorageService.addSearchQuery(query);
    setSearchHistory(StorageService.getSearchHistory());
  };

  const clearHistory = () => {
    StorageService.clearSearchHistory();
    setSearchHistory([]);
  };

  const setAnimSettings = (settings: { speed: 'NORMAL' | 'FAST' | 'SLOW'; intensity: 'STRONG' | 'BALANCED' | 'OFF' }) => {
    StorageService.saveAnimationSettings(settings);
    setAnimSettingsState(settings);
  };

  const cartCount = cart.length;
  const cartSubtotal = cart.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        savedItemIds,
        toggleSaveItem,
        isItemSaved,
        selectedCity,
        setSelectedCity,
        bookings,
        addBooking,
        prescriptions,
        addPrescription,
        searchHistory,
        recordSearch,
        clearHistory,
        animSettings,
        setAnimSettings,
        toasts,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
