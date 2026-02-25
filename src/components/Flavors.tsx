import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const flavors = [
    { name: 'Fruit Loot', desc: 'Fresh tropical fruits with vanilla cream and a hint of mint.', image: '/images/flavors/pineapple.png', color: 'bg-yellow-50' },
    { name: 'Banoffee Sundae', desc: 'The classic banana and toffee combination, perfectly layered.', image: '/images/flavors/banana-split.png', color: 'bg-pink-50' },
    { name: 'Gulab Jamun Delight', desc: 'Warm, syrupy gulab jamun paired with chilled artisanal vanilla.', image: '/images/flavors/gulab-jamun.png', color: 'bg-orange-50' },
];

export default function Flavors() {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        // Scroll animation for individual flavor cards
        cardsRef.current.forEach((card) => {
            if (!card) return;

            gsap.fromTo(card,
                { y: 80, opacity: 0, scale: 0.9 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    ease: 'expo.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach(st => {
                if (st.trigger === containerRef.current) st.kill();
            });
        };
    }, []);

    return (
        <section
            ref={containerRef}
            className="py-32 bg-brand-white relative overflow-hidden"
            id="flavors"
        >
            {/* Background Decorative */}
            <div className="absolute top-0 right-0 w-1/3 aspect-square bg-brand-yellow/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-1/3 aspect-square bg-brand-pink/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16 sm:mb-20">
                    <h2 className="text-[clamp(2.5rem,8vw,5rem)] md:text-[clamp(3.5rem,10vw,8rem)] font-bold text-brand-brown font-heading text-glow mb-2 sm:mb-4">
                        Pick Your <br className="sm:hidden" /><span className="text-brand-pink underline decoration-brand-yellow/40">Chill</span>
                    </h2>
                    <p className="text-lg sm:text-xl text-brand-brown/60 font-semibold max-w-2xl mx-auto px-4">
                        Explore our handcrafted artisanal signature favorites, made with love and the finest ingredients.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {flavors.map((flavor, index) => (
                        <div
                            key={index}
                            ref={el => { if (el) cardsRef.current[index] = el; }}
                            className={`group relative rounded-[3rem] p-6 sm:p-10 transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] ${flavor.color} border-4 border-white shadow-2xl overflow-hidden flex flex-col h-full`}
                        >
                            <div className="absolute top-6 sm:top-8 right-8 sm:right-10 text-6xl sm:text-7xl font-bold opacity-5 font-heading text-brand-brown">
                                0{index + 1}
                            </div>

                            {/* Image Container */}
                            <div className="w-full aspect-square rounded-[2rem] overflow-hidden mb-6 sm:mb-8 shadow-xl bg-white p-2 shrink-0">
                                <img
                                    src={flavor.image}
                                    alt={flavor.name}
                                    className="w-full h-full object-cover rounded-[1.5rem] transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                />
                            </div>

                            <div className="relative z-10 flex flex-col flex-grow">
                                <h3 className="text-xl sm:text-2xl font-bold font-heading text-brand-brown mb-2">{flavor.name}</h3>
                                <p className="text-brand-brown/70 font-medium leading-relaxed mb-6 flex-grow text-sm sm:text-base">
                                    {flavor.desc}
                                </p>
                            </div>

                            {/* Hover Decorative */}
                            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-brand-pink/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                        </div>
                    ))}
                </div>

                <div className="mt-32 text-center border-t-2 border-brand-brown/5 pt-16">
                    <div className="inline-flex flex-col items-center">
                        <p className="text-brand-brown/40 font-bold uppercase tracking-[0.3em] text-xs italic mb-4">
                            Prepared with Love • 100% Vegetarian
                        </p>
                        <div className="flex gap-4">
                            <span className="w-12 h-1 bg-brand-pink rounded-full"></span>
                            <span className="w-12 h-1 bg-brand-yellow rounded-full"></span>
                            <span className="w-12 h-1 bg-brand-brown rounded-full"></span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
