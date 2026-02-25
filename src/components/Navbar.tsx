import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Navbar() {
    const navRef = useRef<HTMLElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Simple entrance animation for navbar
        gsap.fromTo(navRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
        );
    }, []);

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    return (
        <>
            <nav
                ref={navRef}
                className={`fixed top-4 left-0 right-0 mx-auto w-[95%] max-w-7xl z-50 px-5 sm:px-8 py-2 md:py-3 transition-all duration-300 rounded-[1.5rem] md:rounded-full border border-white/50 shadow-2xl ${isScrolled ? 'bg-brand-yellow/90 backdrop-blur-md' : 'glass text-brand-brown'}`}
            >
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    {/* Logo Image */}
                    <div className="cursor-pointer">
                        <img src="/logo.jpg" alt="Be Chill Logo" className="h-10 md:h-14 rounded-xl shadow-sm object-cover mix-blend-multiply" />
                    </div>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex gap-8 font-semibold text-lg items-center">
                        <li className="hover:text-brand-pink transition-colors cursor-pointer" onClick={() => document.getElementById('flavors')?.scrollIntoView({ behavior: 'smooth' })}>Flavors</li>
                        <li className="hover:text-brand-pink transition-colors cursor-pointer" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>About</li>
                        <li className="hover:text-brand-pink transition-colors cursor-pointer" onClick={() => document.getElementById('social')?.scrollIntoView({ behavior: 'smooth' })}>Social</li>
                        <li>
                            <a
                                href="https://maps.app.goo.gl/MQarUVtuL56FVLLU9"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-brand-pink text-brand-white px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform shadow-lg"
                            >
                                Visit Us
                            </a>
                        </li>
                    </ul>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-4xl text-brand-pink w-12 h-12 flex items-center justify-center transition-transform hover:scale-105"
                            aria-label="Toggle Menu"
                        >
                            {isOpen ? '✕' : '☰'}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Dropdown Overlay */}
            <div className={`fixed inset-0 bg-brand-yellow/95 backdrop-blur-md z-40 flex flex-col items-center justify-center transition-all duration-300 md:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <ul className="flex flex-col gap-6 sm:gap-10 font-heading text-3xl sm:text-4xl items-center text-brand-brown w-full px-4">
                    <li className="hover:text-brand-pink transition-colors cursor-pointer" onClick={() => { setIsOpen(false); document.getElementById('flavors')?.scrollIntoView({ behavior: 'smooth' }); }}>Flavors</li>
                    <li className="hover:text-brand-pink transition-colors cursor-pointer" onClick={() => { setIsOpen(false); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}>About</li>
                    <li className="hover:text-brand-pink transition-colors cursor-pointer" onClick={() => { setIsOpen(false); document.getElementById('social')?.scrollIntoView({ behavior: 'smooth' }); }}>Social</li>
                    <li>
                        <a
                            href="https://maps.app.goo.gl/MQarUVtuL56FVLLU9"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-brand-pink text-brand-white px-10 py-4 rounded-full font-bold shadow-xl mt-4 inline-block"
                            onClick={() => setIsOpen(false)}
                        >
                            Visit Us
                        </a>
                    </li>
                </ul>
            </div>
        </>
    );
}
