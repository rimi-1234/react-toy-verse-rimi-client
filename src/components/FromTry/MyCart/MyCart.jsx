import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";


const MyCart = () => {
    const [cartItems, setCartItems] = useState([]);

    const { user } = useContext(AuthContext);

    // Generate a unique key for each user
    const storageKey = `myCart_${user?.email}`;
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem(storageKey)) || [];
        setCartItems(storedCart);

    }, []);

    const handleRemove = (toyId) => {
        const updatedCart = cartItems.filter(item => item.toyId !== toyId);
        setCartItems(updatedCart);
        localStorage.setItem(storageKey, JSON.stringify(updatedCart));
        toast.info("Item removed from cart");
    };

    const handleQuantityChange = (toyId, qty) => {
        const updatedCart = cartItems.map(item =>
            item.toyId === toyId ? { ...item, quantity: qty } : item
        );
        setCartItems(updatedCart);
        localStorage.setItem(storageKey, JSON.stringify(updatedCart));
    };

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    if (cartItems.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-[300px]">
                <h2 className="text-xl font-semibold text-gray-600">Your cart is empty!</h2>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#EB1551] to-[#FF5FA8]">
                My Cart
            </h1>

            <div className="space-y-4">
                {cartItems.map((toy) => (
                    <div
                        key={toy.toyId}
                        className="flex flex-col sm:flex-row items-center justify-between bg-base-100 shadow-md p-4 rounded-lg"
                    >
                        {/* Toy Image */}
                        <img
                            src={toy.pictureURL}
                            alt={toy.toyName}
                            className="w-32 h-32 object-cover rounded-lg mb-2 sm:mb-0"
                        />

                        {/* Toy Info */}
                        <div className="flex-1 sm:ml-4">
                            <h2 className="text-lg font-bold">{toy.toyName}</h2>
                            <p className="text-gray-600">{toy.sellerName}</p>
                            <p className="text-gray-600">Price: {toy.price} tk</p>
                        </div>

                        {/* Quantity Controls + Remove */}
                        <div className="flex flex-col items-center gap-2 mt-2 sm:mt-0">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() =>
                                        handleQuantityChange(toy.toyId, Math.max(1, toy.quantity - 1))
                                    }
                                    className="btn btn-sm btn-outline"
                                >
                                    -
                                </button>

                                <span className="w-12 text-center">{toy.quantity}</span>

                                <button
                                    onClick={() => handleQuantityChange(toy.toyId, toy.quantity + 1)}
                                    className="btn btn-sm btn-outline"
                                >
                                    +
                                </button>
                            </div>

                            <button
                                onClick={() => handleRemove(toy.toyId)}
                                className="btn w-full mt-2 text-white bg-gradient-to-r from-[#EB1551] via-[#FF5FA8] to-[#FF8DC7] border-none hover:opacity-90 hover:scale-105 transition-transform duration-300"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex justify-end">
                <h2 className="text-xl font-bold">
                    Total:{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EB1551] to-[#FF5FA8]">
                        {totalPrice.toFixed(2)} tk
                    </span>
                </h2>
            </div>
        </div>
    );
};

export default MyCart;
