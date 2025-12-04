import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/AuthContext';
import { FaRegStar, FaStar, FaStarHalfAlt, FaShippingFast, FaUndo } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

/* -------------------- Animation Variants (Slow Motion Effect) -------------------- */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Delay between each section appearing
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 }, // Start slightly lower
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, // Slower duration for "slow motion" feel
      ease: "easeOut" 
    } 
  }
};

/* -------------------- Data Object (Default Fallback) -------------------- */
const defaultToyData = {
  "toyId": 7,
  "toyName": "Hot Wheels Track Set",
  "brand": "Hot Wheels",
  "sellerName": "Speed Racers",
  "sellerEmail": "contact@speedracers.com",
  "price": 39.99,
  "discount": 5,
  "finalPrice": 37.99,
  "rating": 4.6,
  "reviewsCount": 1100,
  "availableQuantity": 35,
  "stockStatus": "In Stock",
  "ageRange": "5+ Years",
  "subCategory": "Vehicles & Tracks",
  "materials": ["Plastic", "Metal Car Components"],
  "trackLength": "12 ft",
  "tags": ["hot wheels", "racing", "cars", "track"],
  "dimensions": { "boxWidth": "15 in", "boxHeight": "10 in", "boxDepth": "3 in" },
  "description": "An exciting Hot Wheels track set featuring loops, jumps, and customizable racing circuits. Perfect for competitive racing, stunts, and creative track designs.",
  "keyFeatures": ["Multiple track pieces", "2 Hot Wheels cars", "Loop & jump sections"],
  "whatsInsideTheBox": ["Track pieces", "2 Die-cast cars"],
  "pictureURL": "https://i.ibb.co/XfPhmVh/8530728.jpg",
  "galleryImages": ["https://i.ibb.co/tZX0tVx/hw1.jpg", "https://i.ibb.co/cLZYSdP/hw2.jpg"],
  "shipping": { "isFreeShipping": true, "estimatedDelivery": "3–5 business days" },
  "returnPolicy": { "returnWindow": "10 days", "isReturnable": true },
  "createdAt": "2025-01-16T13:30:00Z"
};

/* -------------------- Helper Components -------------------- */

const Breadcrumbs = ({ category, name }) => (
  <nav className="text-xs text-gray-500 mb-6 flex gap-2">
    <span>Homepage</span> &gt; <span>Toys</span> &gt; <span>{category || 'General'}</span> &gt; <span className="font-semibold text-gray-800 truncate max-w-[200px]">{name}</span>
  </nav>
);

const RatingStars = ({ rating = 0, count = 0 }) => (
  <div className="flex items-center gap-1">
    <div className="flex text-[#EB1551] text-sm"> 
      {Array.from({ length: 5 }).map((_, i) => {
        const value = i + 1;
        if (rating >= value) return <FaStar key={i} />;
        if (rating >= value - 0.5) return <FaStarHalfAlt key={i} />;
        return <FaRegStar key={i} />;
      })}
    </div>
    <span className="text-sm font-bold ml-1 text-gray-700">{rating}</span>
    <span className="text-xs text-gray-400 ml-1">({count} Sold)</span>
  </div>
);

/* -------------------- Main Component -------------------- */
const AllDetail = ({ toy }) => {
  const { user } = useContext(AuthContext);
  
  // 1. SAFEGUARD: Use default data if prop is missing or empty
  const activeToy = toy || defaultToyData;
  const [selectedImage, setSelectedImage] = useState(activeToy.pictureURL);
  
  const images = [activeToy.pictureURL, ...(activeToy.galleryImages || [])].filter(Boolean);

  /* --- ADD TO CART LOGIC (Corrected for Storage) --- */
  const handleAddToCart = () => {
    if (!user?.email) {
      toast.error('Please log in first!');
      return;
    }

    const storageKey = `toy_cart_${user.email}`;
    const storedString = localStorage.getItem(storageKey);
    let cartArray = storedString ? JSON.parse(storedString) : [];

    const existingItemIndex = cartArray.findIndex(item => item.toyId === activeToy.toyId);

    if (existingItemIndex !== -1) {
      cartArray[existingItemIndex].quantity += 1;
      toast.info(`Quantity increased! Total: ${cartArray[existingItemIndex].quantity}`);
    } else {
      const newItem = {
        toyId: activeToy.toyId,
        toyName: activeToy.toyName,
        pictureURL: activeToy.pictureURL,
        price: Number(activeToy.finalPrice || activeToy.price),
        brand: activeToy.brand,
        sellerName: activeToy.sellerName,
        quantity: 1,
      };
      cartArray.push(newItem);
      toast.success('Added to cart!');
    }

    localStorage.setItem(storageKey, JSON.stringify(cartArray));
    window.dispatchEvent(new Event("storage"));
  };
  /* ------------------------------------------------ */

  const price = Number(activeToy.price || 0);
  const finalPrice = Number(activeToy.finalPrice || 0);

  return (
    <div className="bg-gray-50 min-h-screen py-10 font-sans"> 
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        <Breadcrumbs category={activeToy.subCategory} name={activeToy.toyName} />

        {/* ANIMATION WRAPPER 
            initial="hidden" -> Starts invisible
            animate="visible" -> Triggers the slow fade in
        */}
        <motion.div 
            className="flex flex-col lg:flex-row gap-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
          
          {/* ----- Left Column: Images (Animated) ----- */}
          <motion.div className="flex-1" variants={itemVariants}>
            <div className="relative overflow-hidden rounded-xl bg-white aspect-[3/4] shadow-md border border-gray-100">
              {/* Image Transition (Smooth Fade when switching images) */}
              <motion.img
                key={selectedImage}
                src={selectedImage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                alt={activeToy.toyName}
                className="w-full h-full object-contain p-6"
              />
              <div className="absolute top-4 right-4 flex flex-col gap-3">
                 <button className="p-2 bg-white rounded-full shadow-md hover:text-[#EB1551] text-gray-400 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                 </button>
              </div>
            </div>

            <div className="flex gap-4 mt-6 overflow-x-auto pb-2 scrollbar-hide">
              {images.map((img, i) => (
                <motion.div 
                  key={i} 
                  onClick={() => setSelectedImage(img)}
                  whileHover={{ scale: 1.05 }} // Tiny hover effect
                  className={`w-20 h-24 flex-shrink-0 cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${selectedImage === img ? 'border-[#EB1551]' : 'border-transparent hover:border-gray-200'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ----- Right Column: Details (Animated) ----- */}
          <motion.div className="flex-1 flex flex-col pt-2" variants={itemVariants}>
            
            <h3 className="text-[#EB1551] uppercase tracking-wide text-xs font-bold mb-2">
              {activeToy.brand || 'Toy Brand'}
            </h3>

            <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
              {activeToy.toyName}
            </h1>

            <div className="flex items-baseline gap-4 mb-3">
              {price > finalPrice && (
                <span className="text-gray-400 text-xl line-through decoration-1">
                  ${price.toFixed(2)}
                </span>
              )}
              <span className="text-3xl font-bold bg-gradient-to-r from-[#EB1551] via-[#FF5FA8] to-[#FF8DC7] text-transparent bg-clip-text">
                ${finalPrice.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center gap-4 mb-6">
               <span className="bg-pink-50 text-[#EB1551] text-xs font-bold px-3 py-1 rounded-full">
                 {activeToy.reviewsCount || 0} Reviews
               </span>
               <RatingStars rating={activeToy.rating} count={activeToy.availableQuantity} />
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-6">
                 {activeToy.description}
            </p>

            <hr className="border-gray-200 mb-6" />

            {/* Specifications */}
            <div className="mb-8">
              <span className="text-gray-900 font-bold block mb-3">Specifications:</span>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                 <div className="border border-[#EB1551] bg-pink-50 text-[#EB1551] text-center py-2.5 rounded-lg text-sm font-bold shadow-sm">
                    {activeToy.ageRange || 'N/A'}
                 </div>
                 <div className="border border-gray-200 text-center py-2.5 rounded-lg text-sm text-gray-600">
                    {activeToy.trackLength || 'Standard'}
                 </div>
                 <div className="border border-gray-200 text-center py-2.5 rounded-lg text-sm text-gray-600">
                    {activeToy.dimensions?.boxWidth || '-'} W
                 </div>
                 <div className="border border-gray-200 text-center py-2.5 rounded-lg text-sm text-gray-600">
                    {activeToy.stockStatus || 'In Stock'}
                 </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mb-8">
               <motion.button 
                 onClick={handleAddToCart}
                 whileTap={{ scale: 0.95 }}
                 whileHover={{ scale: 1.02 }}
                 className="flex-1 bg-gradient-to-r from-[#EB1551] via-[#FF5FA8] to-[#FF8DC7] text-white py-4 rounded-xl font-bold uppercase tracking-wider shadow-lg shadow-pink-200 hover:opacity-90 transition"
               >
                 Add To Cart
               </motion.button>
               
             <Link to="/my-cart" className="flex-1">
                   <motion.button 
                     whileTap={{ scale: 0.95 }}
                     whileHover={{ scale: 1.02 }}
                     // 3. Changed 'flex-1' to 'w-full' so it fills the link area
                     className="w-full border-2 border-[#EB1551] text-[#EB1551] py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-pink-50 transition"
                   >
                     Checkout
                   </motion.button>
               </Link>
            </div>

            {/* Highlights */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
               <h5 className="font-bold mb-3 text-sm text-gray-800">Product Highlights</h5>
               <ul className="text-sm text-gray-500 space-y-2 list-disc pl-4 mb-4">
                  {activeToy.keyFeatures?.map((f, i) => <li key={i}>{f}</li>)}
               </ul>
               <div className="pt-4 border-t border-gray-50 flex gap-6 text-xs font-medium text-gray-500">
                  <div className="flex items-center gap-2">
                     <FaShippingFast className="text-[#EB1551] text-lg" /> 
                     <span>{activeToy.shipping?.estimatedDelivery || 'Calculated at checkout'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <FaUndo className="text-[#EB1551] text-lg" /> 
                     <span>{activeToy.returnPolicy?.returnWindow || 'No returns'}</span>
                  </div>
               </div>
            </div>

          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AllDetail;