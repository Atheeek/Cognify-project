import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';


import { motion, AnimatePresence } from 'framer-motion';
import {
    UserCircleIcon,
    ArrowRightOnRectangleIcon,
    IdentificationIcon,
    PencilSquareIcon,
    PuzzlePieceIcon,
    SparklesIcon,
    FaceSmileIcon,
    ChartBarIcon,
    ClipboardDocumentCheckIcon,
    BuildingLibraryIcon,
    BookOpenIcon,
    VideoCameraIcon,
    EnvelopeIcon,
    PaperAirplaneIcon,
    Bars3Icon,
    SunIcon, // <-- Import Sun icon for theme toggle
    MoonIcon  // <-- Import Moon icon for theme toggle
} from '@heroicons/react/24/outline';


// Animation Variants (remain the same)
const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};



const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
        },
    },
};

// Helper function to get initial theme
const getInitialTheme = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
        const storedPrefs = window.localStorage.getItem('color-theme');
        if (typeof storedPrefs === 'string') {
            return storedPrefs;
        }
        const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
        if (userMedia.matches) {
            return 'dark';
        }
    }
    // Default to light if no setting or preference found
    return 'light';
};


const HomePage = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showProfile, setShowProfile] = useState(false);
    const [contactStatus, setContactStatus] = useState('idle');
    const [contactMessage, setContactMessage] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const profileRef = useRef(null);
    const [theme, setTheme] = useState(getInitialTheme); // <-- Add theme state

    // --- Apply Theme ---
    useEffect(() => {
        const root = window.document.documentElement;
        const isDark = theme === 'dark';

        root.classList.remove(isDark ? 'light' : 'dark');
        root.classList.add(theme);

        localStorage.setItem('color-theme', theme);
    }, [theme]);

    // --- Authentication ---
    useEffect(() => {
        const checkAuth = async () => {
            setIsLoading(true);
            const token = localStorage.getItem('authToken');
            if (token) {
                try {
                    // Replace with your actual API endpoint
                    const response = await fetch('http://localhost:5000/api/users/auth/verify', {
                        method: 'GET',
                        headers: { 'Authorization': `Bearer ${token}` },
                    });
                    if (response.ok) {
                        const userData = await response.json();
                        setUser(userData);
                    } else {
                        localStorage.removeItem('authToken');
                        setUser(null);
                    }
                } catch (error) {
                    console.error('Error verifying token:', error);
                    localStorage.removeItem('authToken');
                    setUser(null);
                }
            } else {
                setUser(null);
            }
            setIsLoading(false);
        };
        checkAuth();
    }, []);

    // --- Profile Dropdown Click Outside ---
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfile(false);
            }

        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // --- Handlers ---
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
        setShowProfile(false);
        setIsMobileMenuOpen(false); // Close menu on logout
        navigate('/login');
    };

    const toggleProfile = () => setShowProfile(!showProfile);
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        setContactStatus('sending');
        setContactMessage('');
        const form = e.target;
        const name = form.elements.name.value;
        const email = form.elements.email.value;
        const message = form.elements.message.value;

        try {
             // Replace with your actual API endpoint
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to send message');
            }
            setContactStatus('success');
            setContactMessage('Message sent successfully! We\'ll be in touch.');
            form.reset();
             // Hide message after a few seconds
             setTimeout(() => setContactMessage(''), 5000);
        } catch (error) {
            console.error('Error submitting contact form:', error);
            setContactStatus('error');
            setContactMessage(error.message || 'An error occurred. Please try again.');
             // Hide message after a few seconds
             setTimeout(() => setContactMessage(''), 5000);
        } finally {
             // Reset status after a short delay so button doesn't immediately change back
             setTimeout(() => setContactStatus('idle'), 1000);
        }
    };

     // --- Render Loading State ---
     if (isLoading) {
        // Basic loading state respects theme preference if already loaded
        const currentTheme = getInitialTheme();
        const bgColor = currentTheme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-indigo-50 via-white to-blue-50';
        const textColor = currentTheme === 'dark' ? 'text-indigo-400' : 'text-indigo-600';
        return (
            <div className={`flex justify-center items-center min-h-screen ${bgColor}`}>
                <div className={`${textColor} text-xl font-semibold`}>Loading Cognify...</div>
                <svg className={`animate-spin ml-3 h-5 w-5 ${textColor}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        );
    }

    // --- Main Render ---
    // Apply base (light) and dark: variant classes
    return (
        
        <div className="font-sans bg-gradient-to-br from-indigo-50 via-white to-blue-50 text-gray-800 dark:bg-gradient-to-br dark:from-gray-900 dark:via-slate-900 dark:to-black dark:text-gray-200 min-h-screen">
            {/* ========== Header ========== */}
            <header className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-gray-100 dark:bg-gray-800/90 dark:border-gray-700">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 flex-shrink-0">
                         {/* Ensure logo works on both light/dark or use conditional rendering for two logos */}
                        <img src="logoo.png" className="h-10 sm:h-20 w-54" alt="Cognify Logo" />
                    </Link>

                    {/* Desktop Navigation Links */}
                    <ul className="hidden md:flex items-center gap-6 lg:gap-8 text-gray-600 dark:text-gray-300 font-medium">
                        <li><a href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-200 pb-1 border-b-2 border-transparent hover:border-indigo-500 dark:hover:border-indigo-500">Features</a></li>
                        <li><a href="#parents" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-200 pb-1 border-b-2 border-transparent hover:border-indigo-500 dark:hover:border-indigo-500">For Parents</a></li>
                        <li><a href="#contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-200 pb-1 border-b-2 border-transparent hover:border-indigo-500 dark:hover:border-indigo-500">Contact</a></li>
                    </ul>

                    {/* Actions & Profile */}
                    <div className="flex items-center gap-4">
                         {/* Theme Toggle Button */}
                         <button
                            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                            className="hidden sm:flex items-center justify-center h-10 w-10 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                         >
                            {theme === 'light' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
                         </button>

                        {/* Survey/Login Button */}
                        {user ? (
                            <Link
                                to="/survey" // Or wherever the survey is
                                className="hidden sm:inline-block bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-sm hover:bg-indigo-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                            >
                                Take Survey
                            </Link>
                        ) : (
                            <Link
                                to="/login"
                                className="hidden sm:inline-block bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-sm hover:bg-indigo-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                            >
                                Login to Take Survey
                            </Link>
                        )}

                        {/* Profile Dropdown */}
                        {user && (
                            <div className="relative" ref={profileRef}>
                                <button
                                    onClick={toggleProfile}
                                    className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 dark:bg-gray-700 dark:text-indigo-400 dark:hover:bg-gray-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                                    aria-label="User menu" aria-haspopup="true"
                                >
                                    <UserCircleIcon className="h-6 w-6" />
                                </button>
                                <AnimatePresence>
                                    {showProfile && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15 } }}
                                            transition={{ duration: 0.2, ease: "easeOut" }}
                                            className="absolute right-0 mt-2 w-48 origin-top-right bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 shadow-lg rounded-md z-50 py-1 focus:outline-none"
                                            role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1"
                                        >
                                            <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-700">
                                                <p className="text-sm text-gray-500 dark:text-gray-400">Signed in as</p>
                                                <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">{user.email}</p>
                                            </div>
                                            <Link to="/profile" onClick={() => {setShowProfile(false); closeMobileMenu();}} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-indigo-400 w-full text-left transition duration-150 ease-in-out" role="menuitem" tabIndex="-1">
                                                <IdentificationIcon className="h-4 w-4" /> View Profile
                                            </Link>
                                            <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-500 dark:hover:bg-red-900/30 w-full text-left transition duration-150 ease-in-out" role="menuitem" tabIndex="-1">
                                                <ArrowRightOnRectangleIcon className="h-4 w-4" /> Logout
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                         {/* Mobile Menu Button */}
                         <button
                            onClick={toggleMobileMenu}
                            className="md:hidden p-2 rounded text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            aria-controls="mobile-menu" aria-expanded={isMobileMenuOpen}
                        >
                            <span className="sr-only">Open menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                </nav>
                 {/* Mobile Menu & Actions */}
                 <AnimatePresence>
                  {isMobileMenuOpen && (
                      <motion.div
                         initial={{ opacity: 0, height: 0 }}
                         animate={{ opacity: 1, height: 'auto' }}
                         exit={{ opacity: 0, height: 0 }}
                         className="md:hidden border-t border-gray-100 dark:border-gray-700" id="mobile-menu">
                          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                              <a href="#features" onClick={closeMobileMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">Features</a>
                              <a href="#parents" onClick={closeMobileMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">For Parents</a>
                              <a href="#contact" onClick={closeMobileMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">Contact</a>
                           </div>
                           {/* Mobile Theme Toggle */}
                            <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-700">
                                <button
                                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                                    className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                     {theme === 'light' ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
                                     Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
                                </button>
                            </div>
                            {/* Mobile Survey/Login Button */}
                           <div className="px-4 pb-3 pt-2 border-t border-gray-100 dark:border-gray-700">
                               {user ? (
                                   <Link
                                       to="/survey" // Or wherever the survey is
                                       onClick={closeMobileMenu}
                                       className="block w-full text-center bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-sm hover:bg-indigo-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                                   >
                                       Take Survey
                                   </Link>
                               ) : (
                                   <Link
                                       to="/login"
                                       onClick={closeMobileMenu}
                                       className="block w-full text-center bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-sm hover:bg-indigo-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                                   >
                                       Login to Take Survey
                                   </Link>
                               )}
                          </div>
                      </motion.div>
                  )}
                 </AnimatePresence>
            </header>

            {/* ========== Hero Section ========== */}
            <div className=' bg-cover bg-center h-[70vh]'>

            
            <motion.section
                className="text-center py-24 px-6 relative overflow-hidden"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                <motion.h2
                    className="text-4xl  sm:text-5xl lg:text-6xl font-extrabold text-indigo-800 dark:text-white mb-5 tracking-tight"
                    variants={fadeIn}
                >
                    Unlock Your Child's Potential
                </motion.h2>
                <motion.p
                    className="text-lg md:text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300 mb-8"
                    variants={fadeIn}
                >
                    Cognify provides AI-powered, adaptive tools designed for the unique brilliance of neurodiverse children. Understand, support, and celebrate their journey.
                </motion.p>
                <motion.a
                    href="#features"
                    className="inline-block bg-indigo-600 text-white py-3 px-8 rounded-full text-lg font-semibold shadow-lg hover:bg-indigo-700 hover:shadow-xl transform hover:-translate-y-0.5 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                    variants={fadeIn}
                >
                    Discover How
                </motion.a>
            </motion.section>
</div>
            {/* ========== Features Section ========== */}
            {/* ADDED linkTo PROPS */}
            <motion.section
                id="features"
                className="px-6 py-20 bg-white dark:bg-gray-800" // Section background changes with theme
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
            >
                <h3 className="text-3xl sm:text-4xl font-bold text-indigo-700 dark:text-indigo-400 text-center mb-16">✨ Tailored Learning Tools</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Added linkTo props to make cards clickable */}
                    <FeatureCard 
  icon={PencilSquareIcon} 
  title="Ask the AI Chatbot" 
  linkTo="/chatbot" 
>
  Talk with an AI expert about parenting and child development.
</FeatureCard>
                    <FeatureCard icon={PuzzlePieceIcon} title="Learning Dashboard" linkTo="/learning-dashboard">
  Track progress, earn rewards, and unlock new learning milestones tailored to each child's pace.
</FeatureCard>

                    <FeatureCard icon={SparklesIcon} title="Gamified Learning" linkTo="/gamified-learning">Engaging activities that make learning fun and rewarding.</FeatureCard>
                    <FeatureCard icon={FaceSmileIcon} title="Calm Down Corner" linkTo="/calm-down">Sensory tools and guided relaxation exercises for self-regulation.</FeatureCard>
                    <FeatureCard icon={ChartBarIcon} title="Emotion Monitoring" linkTo="/emotion-monitoring">AI insights help understand and respond to emotional cues (with privacy focus).</FeatureCard>
                     
                </div>
            </motion.section>

            {/* ========== Parents & Teachers Section ========== */}
            {/* ADDED linkTo PROPS */}
            <motion.section
                id="parents"
                className="px-6 py-20 bg-indigo-50/70 dark:bg-slate-800/70" // Section background changes
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
            >
                <h3 className="text-3xl sm:text-4xl font-bold text-indigo-700 dark:text-indigo-400 text-center mb-16">👪 Support for Caregivers</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Added linkTo props */}
                   
                    <FeatureCard icon={BookOpenIcon} title="Educational Resources" linkTo="/resources">Curated articles, guides, and materials for parents and educators.</FeatureCard>
                    <FeatureCard icon={BuildingLibraryIcon} title="Find Local Support" linkTo="/local-support">Connect with nearby specialists and institutions (India focus).</FeatureCard>
                    <FeatureCard icon={VideoCameraIcon} title="AI-Assisted Videos" linkTo="/videos">Personalized video content explaining concepts in accessible ways.</FeatureCard>
                     {/* <FeatureCard icon={ClipboardDocumentCheckIcon} title="Screening Tools" linkTo="/screening">Initial questionnaires to understand potential needs (Not a diagnosis).</FeatureCard> */}
                    {/* Add more parent features here */}
                </div>
            </motion.section>

            {/* ========== Contact Form Section ========== */}
            <motion.section
                id="contact"
                className="py-20 px-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeIn}
            >
                <div className="bg-white p-8 sm:p-10 rounded-xl shadow-lg max-w-3xl mx-auto border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                    <h3 className="text-3xl font-bold text-indigo-700 dark:text-indigo-400 text-center mb-8 flex items-center justify-center gap-3"><EnvelopeIcon className="w-8 h-8" /> Get In Touch</h3>
                    <form className="space-y-5" onSubmit={handleContactSubmit}>
                        <div>
                            <label htmlFor="name" className="sr-only">Name</label>
                            <input type="text" id="name" name="name" placeholder="Your Name" required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400" />
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input type="email" id="email" name="email" placeholder="Your Email" required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400" />
                        </div>
                        <div>
                            <label htmlFor="message" className="sr-only">Message</label>
                            <textarea id="message" name="message" placeholder="Your Message" required className="w-full p-3 border border-gray-300 rounded-md h-36 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"></textarea>
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                disabled={contactStatus === 'sending'}
                                className={`inline-flex items-center gap-2 bg-indigo-600 text-white py-3 px-8 rounded-full text-lg font-semibold shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-70 disabled:cursor-not-allowed`}
                            >
                                {contactStatus === 'sending' ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </>
                                ) : (
                                    <> <PaperAirplaneIcon className="w-5 h-5" /> Send Message </>
                                )}
                            </button>
                        </div>
                    </form>
                    {/* Contact Form Status Message */}
                    <AnimatePresence>
                        {contactMessage && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className={`mt-4 text-center text-sm p-3 rounded-md ${
                                    contactStatus === 'success'
                                    ? 'bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/40 dark:text-green-300 dark:border-green-700'
                                    : 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/40 dark:text-red-300 dark:border-red-700'
                                }`}
                            >
                                {contactMessage}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.section>

            {/* ========== Footer ========== */}
            <footer className="text-center p-8 bg-gray-800 text-gray-400 dark:bg-black dark:text-gray-500 mt-16">
                <img src="logoo.png" className="h-10 w-auto mx-auto mb-4 filter grayscale opacity-60 dark:brightness-75 dark:opacity-60" alt="Cognify Logo Grayscale" />
                <p>&copy; {new Date().getFullYear()} Cognify. Empowering every child.</p>
                {/* Add social links or other footer content here */}
            </footer>
        </div>
    );
};


// ========== FeatureCard Component ==========
// Updated to handle linkTo and theme changes
const FeatureCard = ({ icon: Icon, title, children, linkTo }) => {
    const content = (
        <>
            <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-indigo-100 rounded-full dark:bg-gray-700">
                    <Icon className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                </div>
            </div>
            <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2 text-center">{title}</h4>
            <p className="text-gray-600 dark:text-gray-400 text-center text-sm">{children}</p>
        </>
    );

    const cardClasses = `border p-6 rounded-lg shadow-sm transition-all duration-300 ease-in-out h-full flex flex-col justify-start items-center
        bg-white border-gray-100 hover:shadow-lg
        dark:bg-gray-700/50 dark:border-gray-600 dark:hover:bg-gray-700 dark:shadow-md dark:hover:shadow-lg`; // Base light + dark overrides

    const interactiveClasses = linkTo
        ? `group transform hover:-translate-y-1 hover:border-indigo-200 dark:hover:border-indigo-500/50 cursor-pointer` // Added cursor-pointer
        : ``; // Non-interactive cards don't get hover transform

    return (
        <motion.div
            variants={fadeIn}
            className="h-full" // Ensure motion div takes full height for grid alignment
        >
            {linkTo ? (
                <Link to={linkTo} className={`${cardClasses} ${interactiveClasses}`}>
                    {content}
                     {/* Optional: Arrow on hover for linked cards */}
                     {/* <span className="mt-auto text-indigo-500 group-hover:text-indigo-700 dark:text-indigo-400 dark:group-hover:text-indigo-300 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                         Learn More &rarr;
                     </span> */}
                </Link>
            ) : (
                // If no linkTo, render a non-clickable div
                <div className={`${cardClasses}`}>
                    {content}
                </div>
            )}
        </motion.div>
    );
};

export default HomePage;