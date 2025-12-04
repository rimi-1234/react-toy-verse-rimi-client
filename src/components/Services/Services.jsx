import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Wrench, Calendar, Truck, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router'; // Changed to react-router-dom for standard web usage

const Services = () => {
    // Animation Variants (Reused from your About component)
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

    const servicesList = [
        {
            icon: <Gift size={32} />,
            title: "Premium Gift Wrapping",
            desc: "Make your present pop! We offer signature wrapping with eco-friendly paper, satin ribbons, and personalized handwritten cards."
        },
        {
            icon: <Truck size={32} />,
            title: "Same-Day Delivery",
            desc: "Forgot a birthday? Don't panic. Order before 12 PM and our fleet will get the happiness to your door by evening."
        },
        {
            icon: <Calendar size={32} />,
            title: "Party Planning",
            desc: "From goody bags to toy rentals, we help organize the perfect playdate or birthday bash so you can relax."
        },
        {
            icon: <Wrench size={32} />,
            title: "Toy Repair Clinic",
            desc: "Is a favorite teddy hurt? Our toy doctors can stitch, fix, and clean beloved items to give them a second life."
        },
        {
            icon: <Sparkles size={32} />,
            title: "Personal Shopper",
            desc: "Not sure what to buy? Chat with our experts to find the perfect age-appropriate gift for any child."
        },
        {
            icon: <MessageCircle size={32} />,
            title: "24/7 Parent Support",
            desc: "Need help assembling a bike at 11 PM? Our support team is here to guide you through instructions and setups."
        }
    ];

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            
            {/* 1. HERO SECTION */}
            <div className="relative bg-white overflow-hidden">
                <div className="max-w-6xl mx-auto px-4 lg:px-8 py-20 lg:py-24">
                    <div className="text-center max-w-3xl mx-auto">
                        <motion.div 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                        >
                            <span className="text-[#EB1551] font-bold tracking-wider uppercase text-sm mb-2 block">Our Services</span>
                            <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                                More Than Just <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EB1551] to-[#FF5FA8]">Selling Toys</span>
                            </h1>
                            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                                We are here to make parenting easier and childhood more magical. Explore the extra services we offer to bring a smile to your face.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* 2. SERVICES GRID (Matches your "Why Choose Us" style) */}
            <div className="py-20">
                <div className="max-w-6xl mx-auto px-4 lg:px-8">
                    <motion.div 
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {servicesList.map((service, index) => (
                            <motion.div 
                                key={index} 
                                variants={fadeInUp} 
                                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
                            >
                                <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center mb-6 text-[#EB1551] group-hover:bg-[#EB1551] group-hover:text-white transition-colors duration-300">
                                    {service.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                                <p className="text-gray-500 leading-relaxed mb-6">
                                    {service.desc}
                                </p>
                                <Link to="/contact" className="inline-flex items-center text-[#EB1551] font-semibold group-hover:gap-2 transition-all">
                                    Learn more <ArrowRight size={18} className="ml-2" />
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* 3. PROCESS STRIP (Matches your "Stats" section colors) */}
            <div className="bg-[#2b1e1b] py-20 text-white">
                <div className="max-w-6xl mx-auto px-4 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                        <motion.div 
                            className="lg:w-1/2"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl lg:text-5xl font-bold mb-6">Join the ToyVerse Club</h2>
                            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                                Become a member and get free gift wrapping, priority delivery, and exclusive access to our repair clinic services.
                            </p>
                            <button className="px-8 py-4 rounded-full font-bold text-[#2b1e1b] bg-white hover:bg-gray-100 transition-colors shadow-lg">
                                View Membership Plans
                            </button>
                        </motion.div>

                        <motion.div 
                            className="lg:w-1/2 grid grid-cols-2 gap-4"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                             <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/10">
                                <h4 className="font-bold text-xl mb-2 text-[#FF5FA8]">Silver</h4>
                                <p className="text-sm text-gray-300">Free Delivery & wrapping on orders over $50.</p>
                             </div>
                             <div className="bg-gradient-to-br from-[#EB1551] to-[#FF5FA8] p-6 rounded-xl shadow-lg transform lg:-translate-y-4">
                                <h4 className="font-bold text-xl mb-2 text-white">Gold</h4>
                                <p className="text-sm text-white/90">Unlimited free delivery, wrapping & repair services.</p>
                             </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* 4. CTA SECTION (Reused from About for consistency) */}
            <div className="py-24 text-center bg-white">
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl mx-auto px-4"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">Need a custom service?</h2>
                    <p className="text-gray-500 text-lg mb-8">We are happy to accommodate special requests for birthdays or events.</p>
                    <Link to="/contact">
                        <button className="px-10 py-4 rounded-full font-bold text-white bg-[#EB1551] hover:bg-[#c91244] transition-colors duration-300 shadow-lg shadow-pink-200">
                            Contact Us
                        </button>
                    </Link>
                </motion.div>
            </div>

        </div>
    );
};

export default Services;