import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import userIcon from "../../assets/user.png";
import useTitle from "../../hooks/useTitle";
import { motion } from 'framer-motion'; // 1. Import Framer Motion
import { Camera, Mail, User } from 'lucide-react'; // Optional icons for better UI

const MyProfile = () => {
    useTitle("My Profile | ToyVerse");
    
    const { setUser, updateProfileFunc, setLoading, user } = useContext(AuthContext);
    const [name, setName] = useState(user?.displayName || "");
    const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

    const handleUpdate = (e) => {
        e.preventDefault();
        updateProfileFunc({ displayName: name, photoURL: photoURL })
            .then(() => {
                setUser({ ...user, displayName: name, photoURL: photoURL });
                toast.success("Profile Updated Successfully!");
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setUser(user);
                toast.error("Failed to update profile.");
            });
    };

    // --- Animation Variants ---
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const slideLeft = {
        hidden: { x: -50, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.6, type: "spring" } }
    };

    const slideRight = {
        hidden: { x: 50, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.6, type: "spring" } }
    };

    return (
        <div className="hero min-h-screen bg-gray-50 flex items-center justify-center py-10">
            <motion.div 
                className="hero-content w-full max-w-5xl flex flex-col lg:flex-row justify-between items-stretch gap-8 px-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                
                {/* --- Left Column: Profile Image Card --- */}
                <motion.div 
                    className="card bg-white w-full lg:w-5/12 shadow-xl rounded-2xl overflow-hidden border border-gray-100"
                    variants={slideLeft}
                >
                    <div className="h-32 bg-gradient-to-r from-[#EB1551] to-[#FF5FA8]"></div>
                    <div className="flex justify-center -mt-16 relative">
                        <motion.div 
                            className="p-1 bg-white rounded-full shadow-lg"
                            whileHover={{ scale: 1.05 }}
                        >
                            <img
                                className="w-40 h-40 rounded-full object-cover border-4 border-white bg-gray-100"
                                src={user?.photoURL ? user.photoURL : userIcon}
                                alt="User"
                            />
                        </motion.div>
                        {/* Decorative Icon */}
                        <div className="absolute bottom-2 right-1/3 bg-gray-800 text-white p-2 rounded-full border-2 border-white shadow-sm">
                            <Camera size={16} />
                        </div>
                    </div>
                    
                    <div className="card-body items-center text-center p-6">
                        <h2 className="card-title text-2xl font-bold text-gray-800">
                            {user?.displayName || "User Name"}
                        </h2>
                        <p className="text-gray-500 text-sm">{user?.email}</p>
                        
                        <div className="flex gap-2 mt-4">
                            <span className="badge badge-outline p-3 bg-pink-50 border-pink-200 text-[#EB1551]">Toy Enthusiast</span>
                            <span className="badge badge-outline p-3">Member</span>
                        </div>
                    </div>
                </motion.div>

                {/* --- Right Column: Edit Form --- */}
                <motion.div 
                    className="card bg-white w-full lg:w-7/12 shadow-xl rounded-2xl border border-gray-100"
                    variants={slideRight}
                >
                    <div className="card-body p-8">
                        <div className="text-left mb-6">
                            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                                Edit Profile
                                <span className="w-2 h-2 bg-[#EB1551] rounded-full animate-pulse"></span>
                            </h1>
                            <p className="text-gray-500 text-sm mt-1">Update your personal details here.</p>
                        </div>

                        <form onSubmit={handleUpdate} className="space-y-5">
                            {/* Name Input */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold text-gray-700 flex items-center gap-2">
                                        <User size={16} /> Full Name
                                    </span>
                                </label>
                                <motion.input
                                    whileFocus={{ scale: 1.01, borderColor: "#EB1551" }}
                                    type="text"
                                    value={name}
                                    placeholder="Enter your name"
                                    onChange={(e) => setName(e.target.value)}
                                    className="input input-bordered w-full bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#EB1551]"
                                    required
                                />
                            </div>

                            {/* Email Read-only */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold text-gray-700 flex items-center gap-2">
                                        <Mail size={16} /> Email Address
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    value={user?.email || ""}
                                    readOnly
                                    className="input input-bordered w-full bg-gray-100 text-gray-500 cursor-not-allowed"
                                />
                            </div>

                            {/* Photo URL Input */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold text-gray-700 flex items-center gap-2">
                                        <Camera size={16} /> Photo URL
                                    </span>
                                </label>
                                <motion.input
                                    whileFocus={{ scale: 1.01, borderColor: "#EB1551" }}
                                    type="text"
                                    value={photoURL}
                                    onChange={(e) => setPhotoURL(e.target.value)}
                                    className="input input-bordered w-full bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#EB1551]"
                                    placeholder="https://example.com/my-photo.jpg"
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn w-full mt-4 bg-gradient-to-r from-[#EB1551] to-[#FF5FA8] border-none text-white font-bold text-lg shadow-lg hover:shadow-xl hover:opacity-90 transition-all"
                            >
                                Save Changes
                            </motion.button>
                        </form>
                    </div>
                </motion.div>

            </motion.div>
        </div>
    );
};

export default MyProfile;