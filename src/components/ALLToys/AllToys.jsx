import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import ToyCard from "../ToyCard/ToyCard ";

const AllToys = () => {
  const [toysData, setToysData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOption, setSortOption] = useState("default");
  const [filteredToys, setFilteredToys] = useState([]);

  useEffect(() => {
    fetch("/toysData.json")
      .then((res) => res.json())
      .then((data) => setToysData(data))
      .catch((err) => console.error("Failed to load toys data:", err));
  }, []);

  useEffect(() => {
    let toys = [...toysData];

    if (category !== "All") {
      toys = toys.filter((toy) => toy.subCategory === category);
    }

    if (searchQuery) {
      toys = toys.filter(
        (toy) =>
          toy.toyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          toy.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortOption === "priceLow") toys.sort((a, b) => a.finalPrice - b.finalPrice);
    else if (sortOption === "priceHigh") toys.sort((a, b) => b.finalPrice - a.finalPrice);
    else if (sortOption === "rating") toys.sort((a, b) => b.rating - a.rating);
    else if (sortOption === "available") toys.sort((a, b) => b.availableQuantity - a.availableQuantity);

    setFilteredToys(toys);
  }, [toysData, searchQuery, category, sortOption]);

  const categories = ["All", ...new Set(toysData.map((toy) => toy.subCategory))];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* Search + Sort */}
      <motion.div
        className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Search Input */}
        <div className="relative w-full md:w-1/2">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <FiSearch size={20} />
          </span>
          <input
            type="text"
            placeholder="Search by toy name or brand"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 placeholder-gray-400 hover:shadow-md"
          />
        </div>

        {/* Sort Dropdown */}
        <div className="w-full md:w-1/3">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 bg-white text-gray-700 hover:shadow-md"
          >
            <option value="default">Sort By</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="rating">Rating</option>
            <option value="available">Availability</option>
          </select>
        </div>
      </motion.div>

      {/* Grid: Categories + Toys */}
      <div className="grid grid-cols-4 gap-6">

        {/* Category Buttons - span 1 */}
        <motion.div
          className="col-span-1 sticky flex flex-col gap-3"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className={`px-4 py-2  rounded-full border font-semibold transition shadow-sm hover:shadow-lg ${category === cat
                ? "bg-primary text-white border-primary shadow-lg"
                : "bg-white text-gray-700 border-gray-300 hover:bg-primary hover:text-white"
              }`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Filtered Toys Grid - span 3 */}
        <div className="col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredToys.length > 0 ? (
            filteredToys.map((toy, index) => (
              <motion.div
                key={toy.toyId}
                className="h-[400px]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                whileHover={{ scale: 1.03, y: -3, transition: { duration: 0.3 } }}
              >
                <ToyCard toy={toy} />
              </motion.div>
            ))
          ) : (
            <p className="text-center col-span-1 text-gray-500 text-lg">
              No toys found.
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default AllToys;
