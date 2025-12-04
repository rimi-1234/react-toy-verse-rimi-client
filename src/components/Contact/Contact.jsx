import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, Facebook, Instagram, Twitter } from 'lucide-react';
import { toast } from 'react-toastify';

const Contact = () => {
    const formRef = useRef();

    // Handle Form Submission (Mock)
    const handleSend = (e) => {
        e.preventDefault();
        // Here you would normally send data to EmailJS or your backend
        toast.success("Message sent successfully! We'll get back to you soon.");
        e.target.reset();
    };

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12 font-sans">
            <div className="max-w-6xl mx-auto px-4 lg:px-8">
                
                {/* 1. Header Section */}
                <div className="text-center mb-16">
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4"
                    >
                        Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EB1551] to-[#FF5FA8]">Touch</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-500 max-w-2xl mx-auto text-lg"
                    >
                        Have a question about a toy? Need help with an order? We are here to help make playtime magical.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* 2. Left Column: Contact Information */}
                    <motion.div 
                        className="lg:col-span-1 space-y-6"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Info Card */}
                        <motion.div variants={itemVariants} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
                            
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-pink-50 rounded-lg flex items-center justify-center text-[#EB1551] flex-shrink-0">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800 text-sm">Our Location</p>
                                        <p className="text-gray-500 text-sm">123 ToyVerse Lane, Play City, Dhaka 1200</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-pink-50 rounded-lg flex items-center justify-center text-[#EB1551] flex-shrink-0">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800 text-sm">Email Us</p>
                                        <p className="text-gray-500 text-sm">support@toyverse.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-pink-50 rounded-lg flex items-center justify-center text-[#EB1551] flex-shrink-0">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800 text-sm">Call Us</p>
                                        <p className="text-gray-500 text-sm">+880 123 456 7890</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-pink-50 rounded-lg flex items-center justify-center text-[#EB1551] flex-shrink-0">
                                        <Clock size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800 text-sm">Working Hours</p>
                                        <p className="text-gray-500 text-sm">Mon - Fri: 9AM - 6PM</p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Icons */}
                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <p className="font-bold text-gray-800 text-sm mb-4">Follow Us</p>
                                <div className="flex gap-4">
                                    <button className="p-2 bg-gray-50 rounded-full hover:bg-[#EB1551] hover:text-white transition-all text-gray-500"><Facebook size={18}/></button>
                                    <button className="p-2 bg-gray-50 rounded-full hover:bg-[#EB1551] hover:text-white transition-all text-gray-500"><Instagram size={18}/></button>
                                    <button className="p-2 bg-gray-50 rounded-full hover:bg-[#EB1551] hover:text-white transition-all text-gray-500"><Twitter size={18}/></button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* 3. Right Column: Contact Form */}
                    <motion.div 
                        className="lg:col-span-2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="bg-white p-8 lg:p-10 rounded-2xl shadow-lg border-t-4 border-[#EB1551]">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h3>
                            <p className="text-gray-500 mb-8 text-sm">We typically reply within 1-2 business hours.</p>

                            <form ref={formRef} onSubmit={handleSend} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Your Name</label>
                                        <input 
                                            required 
                                            type="text" 
                                            placeholder="John Doe" 
                                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#EB1551] focus:ring-1 focus:ring-[#EB1551] outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Your Email</label>
                                        <input 
                                            required 
                                            type="email" 
                                            placeholder="john@example.com" 
                                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#EB1551] focus:ring-1 focus:ring-[#EB1551] outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Subject</label>
                                    <input 
                                        required 
                                        type="text" 
                                        placeholder="Order Inquiry / Product Question" 
                                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#EB1551] focus:ring-1 focus:ring-[#EB1551] outline-none transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Message</label>
                                    <textarea 
                                        required 
                                        rows="5" 
                                        placeholder="How can we help you today?" 
                                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#EB1551] focus:ring-1 focus:ring-[#EB1551] outline-none transition-all resize-none"
                                    ></textarea>
                                </div>

                                <button 
                                    type="submit" 
                                    className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#EB1551] via-[#FF5FA8] to-[#FF8DC7] shadow-lg shadow-pink-200 hover:opacity-90 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                                >
                                    <Send size={18} /> Send Message
                                </button>
                            </form>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default Contact;