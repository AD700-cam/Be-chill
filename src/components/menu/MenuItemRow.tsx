import { useEffect, useRef } from 'react';
import type { MenuItem } from '../../data/menuData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Tiny inline SVGs for dietary icons
const MilkIcon = () => (
    <svg className="w-3 h-4 inline-block mx-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2v3a2 2 0 0 0 4 0V2M7 10v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9a4 4 0 0 0-4-4h-2a4 4 0 0 0-4 4z" />
        <path d="M7 14h10" />
    </svg>
);

const NutsIcon = () => (
    <svg className="w-4 h-4 inline-block mx-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="14" r="4" />
        <circle cx="15" cy="14" r="4" />
        <circle cx="12" cy="8" r="4" />
    </svg>
);

const GlutenIcon = () => (
    <svg className="w-3 h-4 inline-block mx-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20 M7 5l5 5 M17 5l-5 5 M7 11l5 5 M17 11l-5 5 M7 17l5 5 M17 17l-5 5" />
    </svg>
);

const VeganIcon = () => (
    <svg className="w-4 h-4 inline-block mx-0.5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
);

interface MenuItemRowProps {
    item: MenuItem;
    theme: 'light' | 'dark';
}

export default function MenuItemRow({ item, theme }: MenuItemRowProps) {
    const rowRef = useRef<HTMLDivElement>(null);

    // Theme text colors
    const titleColor = theme === 'light' ? 'text-[#a61570]' : 'text-white';
    const priceColor = theme === 'light' ? 'text-[#a61570]' : 'text-white';
    const detailsColor = theme === 'light' ? 'text-brand-brown/90' : 'text-white/80';
    const iconColor = theme === 'light' ? 'text-[#f39ec9]' : 'text-[#f39ec9]'; // Often light pink icons even on dark bg

    useEffect(() => {
        if (!rowRef.current) return;

        gsap.fromTo(rowRef.current,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: rowRef.current,
                    start: "top 95%", // almost at the bottom of the screen
                    toggleActions: "play none none reverse"
                }
            }
        );
    }, []);

    return (
        <div ref={rowRef} className="flex flex-col mb-6">
            <div className="flex justify-between items-start leading-tight mb-1">
                <h3 className={`font-heading font-bold text-xl md:text-2xl ${titleColor}`}>
                    {item.name}
                </h3>

                <div className={`font-heading font-bold text-xl md:text-2xl whitespace-nowrap ${priceColor}`}>
                    {item.price && <span>{item.price}</span>}
                    {item.priceNote && <span>{item.priceNote}</span>}
                </div>
            </div>

            <div className={`text-xs md:text-sm font-medium flex items-center ${detailsColor}`}>
                <span>{item.kcal} Kcal | {item.weight} gm |</span>
                <span className={`flex items-center ml-1 ${iconColor}`}>
                    {item.diet.map((dietType, idx) => (
                        <span key={idx}>
                            {dietType === 'milk' && <MilkIcon />}
                            {dietType === 'nuts' && <NutsIcon />}
                            {dietType === 'gluten' && <GlutenIcon />}
                            {dietType === 'vegan' && <VeganIcon />}
                        </span>
                    ))}
                </span>
            </div>
        </div>
    );
}
