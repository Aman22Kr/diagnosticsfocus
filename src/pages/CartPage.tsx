import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Trash2, 
  Tag, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  AlertCircle,
  Home,
  Plus
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AdSection } from '../components/AdSection';

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, clearCart, showToast } = useApp();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState<number>(0);

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  const originalSubtotal = cart.reduce((acc, item) => acc + item.originalPrice, 0);
  const savings = originalSubtotal - subtotal;
  const homeCollectionFee = subtotal >= 499 || cart.length === 0 ? 0 : 100;
  const finalTotal = Math.max(0, subtotal - couponDiscount + homeCollectionFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = couponCode.trim().toUpperCase();

    if (clean === 'FOCUS10') {
      const discount = Math.round(subtotal * 0.1);
      setCouponDiscount(discount);
      setAppliedCoupon('FOCUS10 (10% Off)');
      showToast('Coupon FOCUS10 applied! You saved 10% extra.', 'success');
    } else if (clean === 'HEALTH20') {
      const discount = Math.round(subtotal * 0.2);
      setCouponDiscount(discount);
      setAppliedCoupon('HEALTH20 (20% Off)');
      showToast('Coupon HEALTH20 applied! You saved 20% extra.', 'success');
    } else {
      showToast('Invalid promo code. Try "FOCUS10" or "HEALTH20"', 'error');
    }
  };

  const handleRemoveCoupon = () => {
    setCouponDiscount(0);
    setAppliedCoupon(null);
    setCouponCode('');
    showToast('Coupon removed', 'info');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header Banner */}
      <section className="bg-[#003366] text-white py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-orange-400 font-semibold mb-2">
            <Link to="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span className="text-white">Review Test Cart</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Selected Pathology Investigations ({cart.length})
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl">
            Review your selected tests, apply promotional coupons, and proceed to book home sample collection.
          </p>
        </div>
      </section>

      {/* Main Cart Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full flex-1">
        
        {cart.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto shadow-xs">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Your test cart is empty</h2>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              Add individual blood tests or comprehensive full body checkup packages to get started.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/tests"
                className="w-full sm:w-auto px-5 py-2.5 bg-[#f37023] hover:bg-[#e05f13] text-white text-xs font-bold rounded-lg transition-colors"
              >
                Browse Blood Tests
              </Link>
              <Link
                to="/packages"
                className="w-full sm:w-auto px-5 py-2.5 bg-[#003366] hover:bg-[#002244] text-white text-xs font-bold rounded-lg transition-colors"
              >
                Explore Health Packages
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7-Cols: Cart Items List */}
            <div className="lg:col-span-7 space-y-4">
              
              <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                <span className="font-bold text-slate-800">Selected Items ({cart.length})</span>
                <button
                  onClick={clearCart}
                  className="text-rose-600 hover:text-rose-700 font-semibold"
                >
                  Clear All
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
                {cart.map((item) => (
                  <div key={item.id} className="p-5 flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-[#003366] bg-blue-50 px-2 py-0.5 rounded uppercase">
                          {item.type}
                        </span>
                        {item.fastingRequired && (
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                            Fasting Required
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm font-bold text-slate-900 leading-snug">
                        {item.name}
                      </h3>

                      <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{item.tat}</span>
                        </span>
                        <span>·</span>
                        <span>{item.sampleType}</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0 space-y-2">
                      <div>
                        <span className="text-base font-black text-[#003366] font-mono block">
                          ₹{item.price}
                        </span>
                        <span className="text-xs text-slate-400 line-through font-mono block">
                          ₹{item.originalPrice}
                        </span>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Remove test from cart"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add more tests prompt */}
              <div className="p-4 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">Want to add another family member or routine test?</span>
                <Link to="/tests" className="font-bold text-orange-600 hover:underline flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add More Tests</span>
                </Link>
              </div>

            </div>

            {/* Right 5-Cols: Order Summary & Checkout */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Coupon Code Section */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-orange-500" />
                  <span>Apply Promotional Coupon</span>
                </h3>

                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 bg-emerald-50 rounded-lg border border-emerald-200 text-xs">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{appliedCoupon}</span>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-rose-600 hover:underline font-semibold text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter promo code (e.g. FOCUS10)"
                      className="w-full p-2 border border-slate-200 rounded-lg text-xs font-mono uppercase focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors shrink-0"
                    >
                      Apply
                    </button>
                  </form>
                )}

                <div className="text-[11px] text-slate-400">
                  Try promo code <strong className="text-slate-700 font-mono">FOCUS10</strong> for 10% extra off!
                </div>
              </div>

              {/* Price Calculation Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
                <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Bill Summary
                </h3>

                <div className="space-y-2.5 text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>Total MRP:</span>
                    <span className="font-mono line-through text-slate-400">₹{originalSubtotal}</span>
                  </div>

                  <div className="flex items-center justify-between text-emerald-600 font-semibold">
                    <span>Diagnostic Discount:</span>
                    <span className="font-mono">-₹{savings}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Discounted Price:</span>
                    <span className="font-mono font-bold text-slate-800">₹{subtotal}</span>
                  </div>

                  {couponDiscount > 0 && (
                    <div className="flex items-center justify-between text-emerald-600 font-semibold">
                      <span>Promo Coupon Discount:</span>
                      <span className="font-mono">-₹{couponDiscount}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span>Home Sample Collection:</span>
                    <span className="font-bold text-slate-800">
                      {homeCollectionFee === 0 ? (
                        <span className="text-emerald-600">FREE</span>
                      ) : (
                        <span className="font-mono">₹{homeCollectionFee}</span>
                      )}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-baseline justify-between text-slate-900">
                  <div>
                    <span className="text-xs font-bold block">Grand Total:</span>
                    <span className="text-[11px] text-slate-400">Inclusive of all sample tubes & barcoding</span>
                  </div>
                  <span className="text-2xl font-black text-[#003366] font-mono">
                    ₹{finalTotal}
                  </span>
                </div>

                <button
                  onClick={() => navigate('/home-collection')}
                  className="w-full py-3 px-4 bg-[#f37023] hover:bg-[#e05f13] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  <span>Proceed to Select Schedule & Address &rarr;</span>
                </button>

                <div className="pt-2 text-[11px] text-slate-400 text-center space-y-1">
                  <div className="flex items-center justify-center gap-1.5 text-emerald-700 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>NABL Accredited Labs • 100% Barcoded Safety</span>
                  </div>
                  <p>Pay online or directly upon home sample collection via cash/UPI.</p>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>

      {/* Ad Section at Bottom of Page */}
      <AdSection />
    </div>
  );
};
