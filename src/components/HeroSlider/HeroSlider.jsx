import React, { useContext } from "react";
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
  const { user, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleViewMore = (toyId) => {
    setLoading(true);
    if (user) {
      navigate(`/toys-details/${toyId}`);
    } else {
      navigate("/auth/login");
    }
    setLoading(false);
  };

  return (
  <div className="relative h-[130%] max-w-6xl mx-auto">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        loop
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        className="w-full h-96"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.toyId}>
            <div
              className="h-[70vh] bg-cover relative flex items-center justify-center text-white"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#EB1551]/70 via-[#FF5FA8]/50 to-[#FF8DC7]/70"></div>

              <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-3xl md:text-5xl font-bold">{slide.toyName}</h2>
                <p className="mt-2 text-lg md:text-2xl">{slide.description}</p>
                <button
                  className="btn btn-primary mt-4 flex items-center gap-2"
                  onClick={() => handleViewMore(slide.toyId)}
                >
                  View More <span className="text-xl">→</span>
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Arrows inside max-w-6xl */}
        <div className="swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 text-white text-3xl md:text-5xl z-20" />
        <div className="swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 text-white text-3xl md:text-5xl z-20" />
      </Swiper>
    </div>
  );
};

export default HeroSlider;
