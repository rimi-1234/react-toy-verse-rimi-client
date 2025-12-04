import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";
import useTitle from "../../hooks/useTitle";
import { Trash2, ShoppingBag, Plus, Minus, ArrowRight, PackageOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router"; // Standard import for web

const MyCart = () => {
    useTitle("My Cart | ToyVerse");
    const [cartItems, setCartItems] = useState([]);
    const { user } = useContext(AuthContext);

    // 1. KEY CONSISTENCY: Ensure this matches the key used in AllDetail.jsx
    const storageKey = user?.email ? `toy_cart_${user.email}` : null;

    // --- Helper to update State + LocalStorage + Notify other tabs ---
    const updateLocalStorage = (updatedCart) => {
        setCartItems(updatedCart);
        if (storageKey) {
            localStorage.setItem(storageKey, JSON.stringify(updatedCart));
            // Dispatch event so Navbar/Header updates instantly
            window.dispatchEvent(new Event("storage"));
        }
    };

    useEffect(() => {
        const loadCart = () => {
            if (storageKey) {
                const storedCart = JSON.parse(localStorage.getItem(storageKey)) || [];
                setCartItems(storedCart);
            }
        };

        loadCart();

        // Listen for updates from other tabs
        window.addEventListener('storage', loadCart);
        return () => window.removeEventListener('storage', loadCart);
    }, [storageKey]);

    const handleRemove = (toyId) => {
        const updatedCart = cartItems.filter(item => item.toyId !== toyId);
        updateLocalStorage(updatedCart);
        toast.info("Item removed from cart");
    };

    const handleQuantityChange = (toyId, qty) => {
        // Ensure quantity never goes below 1
        if (qty < 1) return; 

        const updatedCart = cartItems.map(item =>
            item.toyId === toyId ? { ...item, quantity: qty } : item
        );
        updateLocalStorage(updatedCart);
    };

    const subTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const shipping = subTotal > 100 ? 0 : 50; 
    const total = subTotal + shipping;

    // --- Empty State ---
    if (cartItems.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col justify-center items-center bg-gray-50 p-4">
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center"
                >
                    <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShoppingBag className="w-12 h-12 text-[#EB1551] opacity-50" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart feels a bit light</h2>
                    <p className="text-gray-500 mb-6">Explore our toys and add some fun to your collection!</p>
                    <Link to="/all-toys">
                        <button className="px-8 py-3 rounded-full font-bold text-white bg-gradient-to-r from-[#EB1551] via-[#FF5FA8] to-[#FF8DC7] shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                            Start Shopping
                        </button>
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-10 font-sans">
            <div className="max-w-6xl mx-auto px-4 lg:px-8">
                
                {/* Header */}
                <div className="flex items-center gap-2 mb-8">
                    <ShoppingBag className="text-[#EB1551]" />
                    <h1 className="text-3xl font-bold text-gray-800">Shopping Cart <span className="text-sm font-normal text-gray-500 ml-2">({cartItems.length} items)</span></h1>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* ----- Cart Items List ----- */}
                    <div className="flex-1 space-y-4">
                        <AnimatePresence>
                            {cartItems.map((toy) => (
                                <motion.div
                                    key={toy.toyId}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    className="group bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6"
                                >
                                    {/* Image */}
                                    <div className="w-full sm:w-28 h-28 bg-gray-50 rounded-lg p-2 flex-shrink-0">
                                        <img
                                            src={toy.pictureURL}
                                            alt={toy.toyName}
                                            className="w-full h-full object-contain mix-blend-multiply"
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 text-center sm:text-left">
                                        <p className="text-xs text-[#EB1551] font-bold uppercase tracking-wide mb-1">{toy.brand || 'Toy Brand'}</p>
                                        <h2 className="text-lg font-bold text-gray-800 mb-1">{toy.toyName}</h2>
                                        <p className="text-sm text-gray-500 mb-2">Seller: {toy.sellerName || 'Official Store'}</p>
                                        <p className="text-xl font-bold text-gray-900">${Number(toy.price).toFixed(2)}</p>
                                    </div>

                                    {/* Controls */}
                                    <div className="flex flex-col items-center gap-4">
                                        {/* Quantity Stepper */}
                                        <div className="flex items-center bg-gray-100 rounded-lg p-1">
                                            <button 
                                                onClick={() => handleQuantityChange(toy.toyId, toy.quantity - 1)}
                                                className="p-2 hover:bg-white rounded-md transition-colors text-gray-600 disabled:opacity-50"
                                                disabled={toy.quantity <= 1}
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="w-10 text-center font-semibold text-gray-700">{toy.quantity}</span>
                                            <button 
                                                onClick={() => handleQuantityChange(toy.toyId, toy.quantity + 1)}
                                                className="p-2 hover:bg-white rounded-md transition-colors text-gray-600"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>

                                        {/* Remove Button */}
                                        <button 
                                            onClick={() => handleRemove(toy.toyId)}
                                            className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" /> Remove
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* ----- Order Summary ----- */}
                    <div className="lg:w-96">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-4">
                            <h3 className="text-lg font-bold text-gray-800 mb-6">Order Summary</h3>
                            
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>${subTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping Estimate</span>
                                    <span>{shipping === 0 ? <span className="text-green-500 font-medium">Free</span> : `$${shipping.toFixed(2)}`}</span>
                                </div>
                                <div className="h-px bg-gray-100 my-2"></div>
                                <div className="flex justify-between text-xl font-bold text-gray-900">
                                    <span>Total</span>
                                    <span className="bg-gradient-to-r from-[#EB1551] via-[#FF5FA8] to-[#FF8DC7] text-transparent bg-clip-text">
                                        ${total.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <button className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#EB1551] via-[#FF5FA8] to-[#FF8DC7] shadow-lg shadow-pink-200 hover:opacity-95 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                                Proceed to Checkout <ArrowRight className="w-5 h-5" />
                            </button>

                            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
                                <PackageOpen className="w-4 h-4" />
                                <span>Free shipping on orders over $100</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MyCart;