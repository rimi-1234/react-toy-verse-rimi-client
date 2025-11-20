import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';


const AllDetail = ({ toy }) => {
  const { user } = useContext(AuthContext); // get logged-in user
  const handleAddToCart = () => {
    
        const storageKey = `myCart_${user.email}`; // user-specific key
    const cart = JSON.parse(localStorage.getItem(storageKey)) || [];

    if (cart.find(item => item.toyId === toy.toyId)) {
      toast.info(`${toy.toyName} is already in your cart.`);
      return;
    }


    cart.push({ ...toy, quantity: 1 });
 localStorage.setItem(storageKey, JSON.stringify(cart));

    toast.success(`${toy.toyName} added to cart!`);
  };

  return (
    <div className="hero min-h-[400px] bg-gradient-to-r from-pink-100 to-rose-200 p-4 shadow-lg">
      <div className="hero-content flex flex-col lg:flex-row-reverse gap-8 items-stretch">

        {/* Toy Info */}
        <div className="flex-1 w-full lg:w-1/2 flex flex-col justify-between bg-base-100 p-4 rounded-lg shadow-lg">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#EB1551] to-[#FF5FA8]">
              {toy.toyName}
            </h1>
            <p className="py-2 text-base sm:text-lg text-base-content">
              <span className="font-semibold">Seller:</span> {toy.sellerName} ({toy.sellerEmail})
            </p>

            <div className="border-t border-gray-300 my-3"></div>

            <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-pink-200 to-rose-200 font-semibold text-pink-700 hover:scale-105 transform transition-transform duration-300 mb-3">
              Category: {toy.subCategory}
            </div>

            <div className="border-t border-gray-300 my-3"></div>

            <h2 className="font-semibold text-base sm:text-lg text-base-content">Description:</h2>
            <p className="text-sm sm:text-base">{toy.description}</p>

            <div className="border-t border-gray-300 my-3"></div>

            <div className="flex flex-wrap justify-center gap-4 my-3 items-center">
              <span className="font-bold text-transparent  bg-clip-text bg-gradient-to-r from-[#EB1551] to-[#FF5FA8]">Price:</span>
              <span className="text-base-content text-center">{toy.price} tk</span>
            </div>
          </div>

          {/* Add to Cart Button at bottom */}
          <button
            onClick={handleAddToCart}
            className="btn w-full mt-4 text-white bg-gradient-to-r from-[#EB1551] via-[#FF5FA8] to-[#FF8DC7] border-none hover:opacity-90 hover:scale-105 transition-transform duration-300"
          >
            Add to Cart
          </button>
        </div>

        {/* Toy Image */}
        <div className="flex-1 w-full lg:w-1/2 flex justify-center items-center bg-base-100 p-4 rounded-lg shadow-lg">
          <figure className="w-full h-full sm:h-80 md:h-96 bg-gray-100 rounded-lg shadow-inner overflow-hidden">
            <img
              className="w-full h-full object-cover rounded-lg"
              src={toy.pictureURL}
              alt={toy.toyName}
            />
          </figure>
        </div>

      </div>
    </div>


  );
};

export default AllDetail;