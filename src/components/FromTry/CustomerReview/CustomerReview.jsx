import React, { useState } from "react";
import { toast } from "react-toastify";

const CustomerReview = () => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !comment) {
      toast.error("Please fill in your name and review!");
      return;
    }
    toast.success("Thank you! Your review has been submitted.");
    setName("");
    setComment("");
  };

  return (
    <section className="py-12 bg-gradient-to-r from-pink-50 to-rose-100">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#EB1551] to-[#FF5FA8]">
          💬 Customer Review
        </h2>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full mb-3"
          />
          <textarea
            placeholder="Your Review"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="textarea textarea-bordered w-full mb-3"
          ></textarea>
          <button
            type="submit"
            className="btn w-full bg-gradient-to-r from-[#EB1551] via-[#FF5FA8] to-[#FF8DC7] text-white border-none"
          >
            Submit Review
          </button>
        </form>
      </div>
    </section>
  );
};

export default CustomerReview;
