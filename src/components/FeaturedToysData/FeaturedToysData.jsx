import React from "react";
import { toast } from "react-toastify";

// Example featured toys data
const featuredToysData = [
  {
    id: 1,
    name: "Lego Creative Bricks",
    price: 49.99,
    rating: 4.8,
    pictureURL: "https://i.ibb.co/G3d3mxPZ/flat-lay-candy-blocks-with-copy-space.jpg",
  },
  {
    id: 2,
    name: "Hot Wheels Track Set",
    price: 39.99,
    rating: 4.6,
    pictureURL: "https://i.ibb.co/XfPhmVhT/8530728.jpg",
  },
  {
    id: 3,
    name: "Plush Teddy Bear",
    price: 29.99,
    rating: 4.8,
    pictureURL: "https://i.ibb.co/5xtNCzRx/beautiful-roses-with-cute-teddy-bear.jpg",
  },
  {
    id: 4,
    name: "Barbie Dream House",
    price: 99.99,
    rating: 4.9,
    pictureURL: "https://i.ibb.co/CKzXpr1y/10226957.jpg",
  },
];

const FeaturedToysData = () => {
  const handleWishlist = (toyName) => {
    toast.success(`${toyName} added to your wishlist!`);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-primary text-center">
          🌟 Featured Toys
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredToysData.map((toy) => (
            <div
              key={toy.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition cursor-pointer"
            >
              <img
                src={toy.pictureURL}
                alt={toy.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{toy.name}</h3>
                <p className="text-gray-600 mb-2">Rating: {toy.rating} ⭐</p>
                <p className="text-primary font-bold mb-4">${toy.price}</p>
                <button
                  onClick={() => handleWishlist(toy.name)}
                  className="btn w-full bg-gradient-to-r from-primary to-secondary text-white border-none"
                >
                  Add to Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedToysData;
