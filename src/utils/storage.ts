export interface CartItem {
  id: string;
  type: 'test' | 'package';
  name: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  fastingRequired: boolean;
  tat: string;
  sampleType: string;
}

export interface BookingRecord {
  bookingId: string;
  createdAt: string;
  patientName: string;
  patientAge: string;
  patientGender: 'Male' | 'Female' | 'Other';
  patientPhone: string;
  patientEmail: string;
  city: string;
  address: string;
  preferredDate: string;
  preferredTimeSlot: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  couponApplied?: string;
  totalAmount: number;
  paymentMethod: 'Pay on Collection' | 'UPI / Online';
  status: 'Confirmed' | 'Sample Collected' | 'Report Ready';
  isHomeCollection: boolean;
}

export interface PrescriptionRecord {
  id: string;
  uploadedAt: string;
  fileName: string;
  patientName: string;
  patientPhone: string;
  city: string;
  notes?: string;
  status: 'Under Review' | 'Processed';
}

const STORAGE_KEYS = {
  CART: 'diagnosticsfocus_cart_v1',
  BOOKINGS: 'diagnosticsfocus_bookings_v1',
  SAVED_ITEMS: 'diagnosticsfocus_saved_items_v1',
  SEARCH_HISTORY: 'diagnosticsfocus_search_history_v1',
  RECENTLY_VIEWED: 'diagnosticsfocus_recently_viewed_v1',
  SELECTED_CITY: 'diagnosticsfocus_selected_city_v1',
  PRESCRIPTIONS: 'diagnosticsfocus_prescriptions_v1',
  ANIMATION_SETTINGS: 'diagnosticsfocus_anim_settings_v1',
};

// Safe JSON parser with fallback
function safeGet<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw) as T;
  } catch (error) {
    console.warn(`[DiagnosticsFocus Storage] Failed to parse key ${key}:`, error);
    return defaultValue;
  }
}

function safeSet<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`[DiagnosticsFocus Storage] Failed to set key ${key}:`, error);
  }
}

export const StorageService = {
  // Cart
  getCart: (): CartItem[] => safeGet<CartItem[]>(STORAGE_KEYS.CART, []),
  saveCart: (cart: CartItem[]): void => safeSet(STORAGE_KEYS.CART, cart),
  addToCart: (item: CartItem): CartItem[] => {
    const cart = StorageService.getCart();
    const existing = cart.find(i => i.id === item.id);
    if (!existing) {
      const updated = [...cart, item];
      StorageService.saveCart(updated);
      return updated;
    }
    return cart;
  },
  removeFromCart: (id: string): CartItem[] => {
    const cart = StorageService.getCart().filter(i => i.id !== id);
    StorageService.saveCart(cart);
    return cart;
  },
  clearCart: (): void => safeSet(STORAGE_KEYS.CART, []),

  // Bookings
  getBookings: (): BookingRecord[] => safeGet<BookingRecord[]>(STORAGE_KEYS.BOOKINGS, [
    {
      bookingId: 'DF-884920',
      createdAt: '2026-10-16 08:30 AM',
      patientName: 'Aman Kumar',
      patientAge: '32',
      patientGender: 'Male',
      patientPhone: '9876543210',
      patientEmail: 'aman.kumar@example.com',
      city: 'Mumbai',
      address: 'Apt 402, Lotus Grandeur, Andheri West',
      preferredDate: '2026-10-16',
      preferredTimeSlot: '07:30 AM - 08:30 AM',
      items: [
        {
          id: 't1',
          type: 'test',
          name: 'Complete Blood Count (CBC) with ESR',
          price: 349,
          originalPrice: 650,
          discountPercent: 46,
          fastingRequired: false,
          tat: 'Within 6 to 8 Hours',
          sampleType: 'Blood (EDTA Whole Blood)'
        },
        {
          id: 't7',
          type: 'test',
          name: 'Vitamin D 25-Hydroxy (Total 25-OH)',
          price: 699,
          originalPrice: 1600,
          discountPercent: 56,
          fastingRequired: false,
          tat: 'Within 12 to 16 Hours',
          sampleType: 'Blood (Serum Clot Activator)'
        }
      ],
      subtotal: 1048,
      discount: 104,
      couponApplied: 'FOCUS10',
      totalAmount: 944,
      paymentMethod: 'Pay on Collection',
      status: 'Report Ready',
      isHomeCollection: true
    }
  ]),
  addBooking: (booking: BookingRecord): void => {
    const list = StorageService.getBookings();
    safeSet(STORAGE_KEYS.BOOKINGS, [booking, ...list]);
  },

  // Saved / Favorite Items
  getSavedItems: (): string[] => safeGet<string[]>(STORAGE_KEYS.SAVED_ITEMS, ['t1', 'pkg-2']),
  toggleSavedItem: (id: string): string[] => {
    const items = StorageService.getSavedItems();
    const exists = items.includes(id);
    const updated = exists ? items.filter(x => x !== id) : [...items, id];
    safeSet(STORAGE_KEYS.SAVED_ITEMS, updated);
    return updated;
  },

  // Search History
  getSearchHistory: (): string[] => safeGet<string[]>(STORAGE_KEYS.SEARCH_HISTORY, ['CBC', 'Thyroid Profile', 'Full Body Checkup', 'Vitamin D']),
  addSearchQuery: (query: string): void => {
    const trimmed = query.trim();
    if (!trimmed) return;
    const current = StorageService.getSearchHistory().filter(q => q.toLowerCase() !== trimmed.toLowerCase());
    safeSet(STORAGE_KEYS.SEARCH_HISTORY, [trimmed, ...current].slice(0, 8));
  },
  clearSearchHistory: (): void => safeSet(STORAGE_KEYS.SEARCH_HISTORY, []),

  // Selected City
  getSelectedCity: (): string => safeGet<string>(STORAGE_KEYS.SELECTED_CITY, 'Mumbai'),
  setSelectedCity: (city: string): void => safeSet(STORAGE_KEYS.SELECTED_CITY, city),

  // Prescriptions
  getPrescriptions: (): PrescriptionRecord[] => safeGet<PrescriptionRecord[]>(STORAGE_KEYS.PRESCRIPTIONS, [
    {
      id: 'RX-9921',
      uploadedAt: '17-Oct-2026 11:20 AM',
      fileName: 'Dr_Sharma_Prescription_Oct2026.pdf',
      patientName: 'Aman Kumar',
      patientPhone: '9876543210',
      city: 'Mumbai',
      notes: 'Doctor advised fasting blood sugar and lipid profile before 9 AM',
      status: 'Processed'
    }
  ]),
  addPrescription: (rx: PrescriptionRecord): void => {
    const list = StorageService.getPrescriptions();
    safeSet(STORAGE_KEYS.PRESCRIPTIONS, [rx, ...list]);
  },

  // Animation Settings (Default: Speed: NORMAL, Intensity: STRONG as instructed)
  getAnimationSettings: () => safeGet<{ speed: 'NORMAL' | 'FAST' | 'SLOW'; intensity: 'STRONG' | 'BALANCED' | 'OFF' }>(
    STORAGE_KEYS.ANIMATION_SETTINGS,
    { speed: 'NORMAL', intensity: 'STRONG' }
  ),
  saveAnimationSettings: (settings: { speed: 'NORMAL' | 'FAST' | 'SLOW'; intensity: 'STRONG' | 'BALANCED' | 'OFF' }) => {
    safeSet(STORAGE_KEYS.ANIMATION_SETTINGS, settings);
  }
};
