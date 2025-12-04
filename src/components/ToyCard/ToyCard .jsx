import { Star, Package } from "lucide-react";
import { use } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";


const ToyCard = ({ toy }) => {
    const { pictureURL, toyId, toyName, rating, availableQuantity, price } = toy;
    const { user ,setLoading} = use(AuthContext);
    const navigate = useNavigate();
    const handleReadMore = () => {
        if (user) {
            navigate(`/toys-details/${toyId}`);
        } else {
            navigate("/auth/login");
        }
          setLoading(true);

    // Optional delay to show spinner briefly (can be removed)
    setTimeout(() => {
      navigate(`/toys-details/${toyId}`);
      setLoading(false);
    },)
    };
    
    return (
       <div className="card bg-base-100 shadow-lg rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 h-full flex flex-col">
      {/* Image */}
      <figure className="w-full h-48 md:h-56 lg:h-64 bg-gray-100 overflow-hidden">
        <img
          src={pictureURL}
          alt={toyName}
          className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
        />
      </figure>

      {/* Card Content */}
      <div className="card-body p-4 flex flex-col flex-1">
        {/* Title */}
        <h2 className="card-title text-lg md:text-xl font-bold bg-gradient-to-r from-[#EB1551] via-[#FF5FA8] to-[#FF8DC7] text-transparent bg-clip-text truncate">
          {toyName}
        </h2>

        {/* Rating + Availability */}
        <div className="flex justify-between items-center mt-2 text-sm md:text-base">
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.floor(rating) }).map((_, i) => (
              <Star key={i} className="w-4 h-4 text-[#EB1551]" fill="#EB1551" />
            ))}
            <span className="text-gray-600 font-semibold">{rating.toFixed(1)}</span>
          </div>

          <div className="flex items-center gap-1 text-gray-500">
            <Package className="w-4 h-4" />
            <span>{availableQuantity} in stock</span>
          </div>
        </div>

        {/* Price */}
        <p className="mt-2 text-lg font-semibold bg-gradient-to-r from-[#EB1551] via-[#FF5FA8] to-[#FF8DC7] text-transparent bg-clip-text">
          {price.toFixed(2)} Tk
        </p>

        {/* Button */}
        <div className="mt-auto">
          <button
            onClick={handleReadMore}
            className="btn btn-primary w-full mt-3 hover:scale-105 transition-transform duration-300"
          >
            View More
          </button>
        </div>
      </div>
    </div>
    );
};

export default ToyCard;
