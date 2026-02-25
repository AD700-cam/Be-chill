import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CategoryHeaderProps {
    title: string;
    theme: 'light' | 'dark';
}

export default function MenuCategoryHeader({ title, theme }: CategoryHeaderProps) {
    const headerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    // Theme colors based on the images
    const textColor = theme === 'light' ? 'text-brand-pink' : 'text-brand-pink';
    const bgColor = 'bg-white';

    useEffect(() => {
        if (!headerRef.current || !textRef.current) return;

        // Animate the torn paper container (slight rotation and scale up)
        gsap.fromTo(headerRef.current,
            { scale: 0.8, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 0.8,
                ease: "back.out(1.5)",
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: "top 90%",
                    toggleActions: "play none none reverse"
                }
            }
        );

    }, []);

    return (
        <div className="relative flex justify-center items-center my-12 z-10">
            {/* Left Splash Accent */}
            <svg className="absolute left-1/2 -translate-x-[110%] md:-translate-x-[150%] w-12 h-12 md:w-16 md:h-16 text-[#f39ec9] opacity-80" viewBox="0 0 100 100" fill="currentColor">
                <path d="M70,30 C60,20 40,25 30,35 C20,45 25,65 35,75 C45,85 65,80 75,70 C85,60 80,40 70,30 Z M50,15 C45,10 30,15 25,25 C20,35 25,45 35,45 C45,45 55,25 50,15 Z M20,50 C10,55 5,70 15,80 C25,90 40,85 45,75 C50,65 30,45 20,50 Z" />
            </svg>

            {/* Torn Paper Header Tile */}
            <div
                ref={headerRef}
                className={`relative px-6 py-2 md:px-10 md:py-3 ${bgColor} shadow-sm z-10 transition-transform duration-300 drop-shadow-md`}
                style={{ borderRadius: '4px 8px 3px 6px' }}
            >
                <h2
                    ref={textRef}
                    className={`font-heading font-black text-2xl md:text-4xl tracking-wider uppercase ${textColor}`}
                    style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.05)' }}
                >
                    {title}
                </h2>
            </div>

            {/* Right Splash Accent */}
            <svg className="absolute right-1/2 translate-x-[110%] md:translate-x-[150%] w-12 h-12 md:w-16 md:h-16 text-[#f39ec9] opacity-80 transform scale-x-[-1]" viewBox="0 0 100 100" fill="currentColor">
                <path d="M70,30 C60,20 40,25 30,35 C20,45 25,65 35,75 C45,85 65,80 75,70 C85,60 80,40 70,30 Z M50,15 C45,10 30,15 25,25 C20,35 25,45 35,45 C45,45 55,25 50,15 Z M20,50 C10,55 5,70 15,80 C25,90 40,85 45,75 C50,65 30,45 20,50 Z" />
            </svg>
        </div>
    );
}
