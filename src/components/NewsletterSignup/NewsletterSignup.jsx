import React, { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email!");
      return;
    }
    toast.success("Thank you for subscribing to our newsletter!");
    setEmail("");
  };

  return (
    <motion.section
      className="py-12 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6 text-primary">
          📰 Subscribe to Our Newsletter
        </h2>
        <p className="mb-6 text-gray-600">
          Get the latest updates on new toys, special offers, and promotions directly in your inbox.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full sm:w-80"
          />
          <button
            type="submit"
            className="btn bg-gradient-to-r from-primary to-secondary text-white border-none"
          >
            Subscribe
          </button>
        </form>
      </div>
    </motion.section>
  );
};

export default NewsletterSignup;
