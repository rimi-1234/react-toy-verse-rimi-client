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
        <div className="card bg-base-100 shadow-lg rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300">
            <figure className="w-full h-48 bg-gray-100">
                <img
                    src={pictureURL}
                    alt={toyName}
                    className="w-full h-full object-cover"
                />
            </figure>
            <div className="card-body p-4">
                <h2
                    className="card-title text-lg font-bold bg-gradient-to-r from-[#EB1551] via-[#FF5FA8] to-[#FF8DC7] text-transparent bg-clip-text"
                >
                    {toyName}
                </h2>
                <div className="flex items-center justify-between gap-2 mt-1">
                    <div className="flex gap-2">

                        {Array.from({ length: Math.floor(rating) }).map((_, i) => (
                            <Star
                                key={i}
                                className="w-4 h-4 text-[#EB1551]"
                                fill="#EB1551"
                            />
                        ))}

                        <span className="text-gray-600 font-semibold ">{rating.toFixed(1)}</span>
                    </div>

                    <div className="flex items-center gap-1 text-gray-500 mt-1">
                        <Package className="w-4 h-4" />
                        <span>Available: {availableQuantity}</span>
                    </div>
                </div>
                <p className="bg-gradient-to-r from-[#EB1551] via-[#FF5FA8] to-[#FF8DC7] text-transparent bg-clip-text flex items-start font-semibold mt-1">{price.toFixed(2)}Tk</p>
                <button onClick={handleReadMore} className="btn btn-primary mt-3 w-full">
                    View More
                </button>
            </div>
        </div>
    );
};

export default ToyCard;
