import React, { useState } from "react";
import { toast } from "react-toastify";

const TryNowPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
 

  const handleSubmit = (e) => {
    e.preventDefault();

          toast.success(`Thank you, ${name}! Your request has been submitted successfully.`);
   
  };

  return (
    <div className="flex justify-center items-center min-h-[400px] bg-base-200 px-4">
      <div className="card w-full max-w-sm sm:max-w-md md:max-w-lg shadow-2xl bg-base-100 py-6 px-4 sm:px-6 rounded-lg">
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-primary mb-6">
          Try a Toy Now
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="label flex justify-items-start font-semibold text-base-content">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input input-bordered w-full text-base-content placeholder-base-content/50"
            />
          </div>

          {/* Email */}
          <div>
            <label className="label flex justify-items-start font-semibold text-base-content">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input input-bordered w-full text-base-content placeholder-base-content/50"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full mt-2 sm:mt-4"
          >
            Try Now
          </button>

   
        </form>
      </div>
    </div>
  );
};

export default TryNowPage;
