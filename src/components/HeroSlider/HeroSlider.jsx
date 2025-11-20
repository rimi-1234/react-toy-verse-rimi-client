import React, { use } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";

const slides = [
  {
    toyId: 2,
    toyName: "Plush Teddy Bear",
    image: "https://i.ibb.co/5xtNCzRx/beautiful-roses-with-cute-teddy-bear.jpg",
    description: "A cuddly teddy bear perfect for hugs and gifts.",
  },
  {
    toyId: 3,
    toyName: "Remote Control Car",
    image: "https://i.ibb.co/twGBg23t/RCCar.jpg",
    description: "A high-speed RC car for exciting indoor and outdoor fun.",
  },
  {
    toyId: 1,
    toyName: "Lego Classic Bricks",
    image: "https://i.ibb.co/G3d3mxPZ/flat-lay-candy-blocks-with-copy-space.jpg",
    description: "Colorful building blocks to encourage creativity and imagination.",
  },
];


const HeroSlider = () => {
  const { user, setLoading } = use(AuthContext);
  const navigate = useNavigate();

  
  // Example button click handler
  const handleViewMore = (toyId) => {
   
    
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
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      slidesPerView={1}
      loop
      autoplay={{ delay: 4000 }}
      pagination={{ clickable: true }}
      navigation
      className="w-full h-96"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.toyId}>
          <div
            className="w-full h-96 bg-cover bg-center relative flex items-center justify-center text-white"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundPosition: "left center"  // <-- shift image to the left
            }}
          >
            {/* Linear Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#EB1551]/70 via-[#FF5FA8]/50 to-[#FF8DC7]/70"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
              <h2 className="text-3xl md:text-5xl font-bold">{slide.toyName}</h2>
              <p className="mt-2 text-lg md:text-2xl">Exciting toys for kids!</p>
              <button
                className="btn btn-primary mt-4"
                onClick={() => handleViewMore(slide.toyId)}
              >
                View More
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSlider;