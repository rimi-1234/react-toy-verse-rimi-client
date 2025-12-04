import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShieldCheck, Truck, Smile, Star, Users } from 'lucide-react';
import { Link } from 'react-router';

const About = () => {
    // Animation Variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            
            {/* 1. HERO SECTION */}
            <div className="relative bg-white overflow-hidden">
                <div className="max-w-6xl mx-auto px-4 lg:px-8 py-20 lg:py-28">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        
                        {/* Text Content */}
                        <motion.div 
                            className="flex-1 text-center lg:text-left z-10"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                        >
                            <span className="text-[#EB1551] font-bold tracking-wider uppercase text-sm mb-2 block">Our Story</span>
                            <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                                We Bring <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EB1551] to-[#FF5FA8]">Joy</span> to <br/> Every Little World.
                            </h1>
                            <p className="text-gray-600 text-lg mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                                At ToyVerse, we believe that play is the most serious work of childhood. We curate toys that spark imagination, encourage learning, and create memories that last a lifetime.
                            </p>
                            <Link to="/all-toys">
                                <button className="px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-[#EB1551] via-[#FF5FA8] to-[#FF8DC7] shadow-lg shadow-pink-200 hover:shadow-xl hover:scale-105 transition-all">
                                    Explore Our Collection
                                </button>
                            </Link>
                        </motion.div>

                        {/* Hero Image Composition */}
                        <motion.div 
                            className="flex-1 relative"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white rotate-2 hover:rotate-0 transition-transform duration-500">
                                <img 
                                    src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=2070&auto=format&fit=crop" 
                                    alt="Happy kid playing" 
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                            {/* Decorative Blob */}
                            <div className="absolute -top-10 -right-10 w-64 h-64 bg-pink-100 rounded-full blur-3xl -z-0"></div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* 2. STATS SECTION */}
            <div className="bg-[#2b1e1b] py-16">
                <div className="max-w-6xl mx-auto px-4 lg:px-8">
                    <motion.div 
                        className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {[
                            { number: "5k+", label: "Happy Kids" },
                            { number: "1.2k", label: "Toys Available" },
                            { number: "30+", label: "Top Brands" },
                            { number: "4.9", label: "Star Rating" },
                        ].map((stat, index) => (
                            <motion.div key={index} variants={fadeInUp}>
                                <h3 className="text-4xl font-bold text-white mb-2">{stat.number}</h3>
                                <p className="text-gray-400 text-sm uppercase tracking-wide">{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* 3. WHY CHOOSE US (Features) */}
            <div className="py-24">
                <div className="max-w-6xl mx-auto px-4 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Parents Trust <span className="text-[#EB1551]">ToyVerse</span></h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">We don't just sell toys; we deliver peace of mind. Here is why thousands of parents choose us for their little ones.</p>
                    </div>

                    <motion.div 
                        className="grid md:grid-cols-3 gap-8"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {/* Feature 1 */}
                        <motion.div variants={fadeInUp} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
                            <div className="w-14 h-14 bg-pink-50 rounded-xl flex items-center justify-center mb-6 text-[#EB1551]">
                                <ShieldCheck size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Safety First</h3>
                            <p className="text-gray-500 leading-relaxed">Every toy is rigorously tested to meet international safety standards. We only stock non-toxic, child-safe products.</p>
                        </motion.div>

                        {/* Feature 2 */}
                        <motion.div variants={fadeInUp} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
                            <div className="w-14 h-14 bg-pink-50 rounded-xl flex items-center justify-center mb-6 text-[#EB1551]">
                                <Heart size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Curated with Love</h3>
                            <p className="text-gray-500 leading-relaxed">Our team of child development experts hand-picks every item to ensure it adds educational value and fun.</p>
                        </motion.div>

                        {/* Feature 3 */}
                        <motion.div variants={fadeInUp} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
                            <div className="w-14 h-14 bg-pink-50 rounded-xl flex items-center justify-center mb-6 text-[#EB1551]">
                                <Truck size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Super Fast Delivery</h3>
                            <p className="text-gray-500 leading-relaxed">We know waiting is hard! That's why we offer express shipping to get the fun to your doorstep ASAP.</p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* 4. MISSION STATEMENT (Split Layout) */}
            <div className="bg-white py-20">
                <div className="max-w-6xl mx-auto px-4 lg:px-8">
                    <div className="flex flex-col-reverse lg:flex-row items-center gap-12 bg-gray-50 rounded-3xl p-8 lg:p-12">
                        
                        <div className="flex-1">
                             <div className="grid grid-cols-2 gap-4">
                                <img src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=2075&auto=format&fit=crop" className="rounded-xl shadow-md w-full h-48 object-cover" alt="Toy 1" />
                                <img src="https://images.unsplash.com/photo-1599623560574-39d485900c95?q=80&w=2070&auto=format&fit=crop" className="rounded-xl shadow-md w-full h-48 object-cover mt-8" alt="Toy 2" />
                             </div>
                        </div>

                        <div className="flex-1">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">More Than Just a Toy Store</h2>
                            <p className="text-gray-600 mb-6 text-lg">
                                ToyVerse started with a simple idea in 2023: to create a space where parents could find high-quality, unique toys that aren't found in big-box stores.
                            </p>
                            <p className="text-gray-600 mb-8">
                                We are a team of parents, dreamers, and designers committed to sustainability and play. A portion of every sale goes towards donating toys to underprivileged children.
                            </p>
                            
                            <div className="flex gap-6">
                                <div className="flex flex-col">
                                    <Smile className="text-[#EB1551] mb-2" />
                                    <span className="font-bold text-gray-800">100% Satisfaction</span>
                                </div>
                                <div className="flex flex-col">
                                    <Users className="text-[#EB1551] mb-2" />
                                    <span className="font-bold text-gray-800">Community First</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* 5. CTA SECTION */}
            <div className="py-24 text-center">
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl mx-auto px-4"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">Ready to start the adventure?</h2>
                    <p className="text-gray-500 text-lg mb-8">Browse our catalog of thousands of toys and find the perfect gift today.</p>
                    <Link to="/all-toys">
                        <button className="px-10 py-4 rounded-full font-bold text-white bg-[#2b1e1b] hover:bg-[#EB1551] transition-colors duration-300 shadow-lg">
                            Shop Now
                        </button>
                    </Link>
                </motion.div>
            </div>

        </div>
    );
};

export default About;