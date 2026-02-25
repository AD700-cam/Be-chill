import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Mock imagery paths for layout purposes
const socialImages = [
    '/images/social/social-1.jpg', // Real shop interior
    '/images/social/social-4.png', // Lifestyle joy
    '/images/social/social-2.jpg', // Menu board
    '/images/social/social-5.png', // Lifestyle sundae
    '/images/social/social-3.jpg', // Full shop view
    '/images/social/social-6.png'  // Lifestyle social
];

export default function SocialGrid() {
    const marqueeRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const marquee = marqueeRef.current;
        const container = containerRef.current;
        if (!marquee || !container) return;

        // Calculate total width of one set of images
        const marqueeWidth = marquee.scrollWidth / 2;

        const tl = gsap.to(marquee, {
            x: `-=${marqueeWidth}`,
            duration: 30, // Adjust speed here
            ease: "none",
            repeat: -1,
            modifiers: {
                x: gsap.utils.unitize(x => parseFloat(x) % marqueeWidth)
            }
        });

        // Pause on hover for better UX
        const handleMouseEnter = () => tl.pause();
        const handleMouseLeave = () => tl.play();

        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            tl.kill();
            container.removeEventListener('mouseenter', handleMouseEnter);
            container.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    // Double the images for seamless looping
    const allImages = [...socialImages, ...socialImages];

    return (
        <section id="social" ref={containerRef} className="py-32 bg-brand-pink relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-brand-white to-transparent opacity-20"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center mb-10 sm:mb-16">
                <h2 className="text-[clamp(2.25rem,7vw,4rem)] md:text-[clamp(3.5rem,10vw,8rem)] font-bold text-white mb-4 sm:mb-6 text-glow font-heading uppercase tracking-tighter leading-none">
                    Follow the <br className="sm:hidden" /><span className="text-brand-yellow">#BeChill</span>
                </h2>
                <p className="text-white/90 text-lg sm:text-xl font-medium max-w-2xl mx-auto">
                    Check out our community in action. Tag us to get featured on our wall of chill!
                </p>
            </div>

            {/* Infinite Marquee Container */}
            <div className="relative w-full overflow-hidden flex grayscale hover:grayscale-0 transition-all duration-700">
                <div
                    ref={marqueeRef}
                    className="flex gap-6 py-4"
                >
                    {allImages.map((src, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-72 md:w-96 aspect-square overflow-hidden rounded-[2.5rem] relative group border-4 border-white/20 shadow-2xl bg-white/10"
                        >
                            <img
                                src={src}
                                alt={`Social post ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                            />
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-brand-brown/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center backdrop-blur-sm p-8 text-center">
                                <span className="text-white text-5xl mb-4 drop-shadow-lg">❤️</span>
                                <p className="text-white font-bold text-xl leading-tight">Authentic <br /> Be Chill Moments</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-12 sm:mt-20 px-6 text-center">
                <a
                    href="https://www.instagram.com/bechill_sundae?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-brand-yellow text-brand-brown font-bold text-xl sm:text-2xl px-8 sm:px-16 py-4 sm:py-6 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 hover:bg-white active:scale-95 group w-full sm:w-auto"
                >
                    Join the Vibe <span className="group-hover:translate-x-2 inline-block transition-transform ml-2">@bechill_sundae</span>
                </a>
            </div>

            {/* Bottom Decorative */}
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-yellow/10 rounded-full blur-[100px]"></div>
        </section>
    );
}
