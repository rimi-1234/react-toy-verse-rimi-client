import React, { Suspense, lazy } from "react";
import { Link } from "react-router"; // Make sure it's react-router-dom
import { motion } from "framer-motion";
import HeroSlider from "../../components/HeroSlider/HeroSlider";
import Loading from "../../components/Loading/Loading";
import ShopByAgeSection from "../../components/ShopByAgeSection/ShopByAgeSection";
import CustomerReview from "../../components/CustomerReview/CustomerReview";
import useTitle from "../../hooks/useTitle";

// Lazy-loaded components
const PopularToys = lazy(() => import("../../components/PopularToys/PopularToys"));
const FeaturedToysData = lazy(() => import("../../components/featuredToysData/featuredToysData"));
const NewsletterSignup = lazy(() => import("../../components/NewsletterSignup/NewsletterSignup"));

const Home = () => {
  useTitle("Home | ToyVerse");
  const MotionLink = motion(Link);

  return (
    <div className="bg-base-100 min-h-screen">
      {/* Hero Slider */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <HeroSlider />
      </motion.div>

      {/* Popular Toys Section */}
      <section className="px-4 md:px-8 max-w-6xl mx-auto pt-20">
        <div className="flex justify-between items-center mb-6">
          <motion.h2
            className="text-3xl font-bold text-primary"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Popular Toys
          </motion.h2>

          <MotionLink
            to="/all-toys"
            className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:opacity-80 transition"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            View All
          </MotionLink>
        </div>

        <Suspense fallback={<Loading />}>
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <PopularToys />
          </motion.div>
        </Suspense>
      </section>

      {/* Featured Toys Section */}
      <motion.section
        className="px-4 md:px-8 py-10 bg-gray-50"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-3xl font-bold text-primary mb-6"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
       
        </motion.h2>

        <Suspense fallback={<Loading />}>
          <FeaturedToysData />
        </Suspense>
      </motion.section>

      {/* Shop By Age Section */}
      <motion.div initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <ShopByAgeSection />
      </motion.div>

      {/* Customer Review Section */}
      <motion.div initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
        <CustomerReview />
      </motion.div>

      {/* Newsletter Signup Section */}
      <motion.section
        className="px-4 md:px-8 py-10 bg-primary/10 rounded-lg my-10 mx-4 md:mx-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-3xl font-bold text-primary mb-6 text-center"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
   
        </motion.h2>

        <Suspense fallback={<Loading />}>
          <NewsletterSignup />
        </Suspense>
      </motion.section>
    </div>
  );
};

export default Home;
