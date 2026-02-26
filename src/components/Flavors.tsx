import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const flavors = [
    { name: 'Fruit Loot', desc: 'Fresh tropical fruits with vanilla cream and a hint of mint.', image: '/images/flavors/fruit-loot.png', color: 'bg-yellow-50', price: '209', kcal: '612 Kcal' },
    { name: 'Banoffee Sundae', desc: 'The classic banana and toffee combination, perfectly layered.', image: '/images/flavors/banoffee-sundae.png', color: 'bg-pink-50', price: '219', kcal: '648 Kcal' },
    { name: 'Gulab Jamun Delight', desc: 'Warm, syrupy gulab jamun paired with chilled artisanal vanilla.', image: '/images/flavors/gulab-jamun-delight.png', color: 'bg-orange-50', price: '195', kcal: '170 Kcal' },
];

export default function Flavors() {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
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

        // Mobile auto-scroll logic
        let interval: ReturnType<typeof setInterval>;
        let isPaused = false;

        const startScroll = () => {
            if (interval) clearInterval(interval);
            interval = setInterval(() => {
                const container = scrollContainerRef.current;
                if (!container || isPaused || window.innerWidth >= 640) return;

                const scrollAmount = container.clientWidth;
                if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
                    container.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            }, 3000);
        };

        const checkMobileAndScroll = () => {
            if (window.innerWidth < 640 && scrollContainerRef.current) {
                startScroll();
            } else {
                if (interval) clearInterval(interval);
            }
        };

        checkMobileAndScroll();
        window.addEventListener('resize', checkMobileAndScroll);

        const handleInteractionStart = () => { isPaused = true; };
        const handleInteractionEnd = () => { isPaused = false; };

        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('touchstart', handleInteractionStart);
            container.addEventListener('touchend', handleInteractionEnd);
            container.addEventListener('mouseenter', handleInteractionStart);
            container.addEventListener('mouseleave', handleInteractionEnd);
        }

        return () => {
            if (interval) clearInterval(interval);
            window.removeEventListener('resize', checkMobileAndScroll);
            if (container) {
                container.removeEventListener('touchstart', handleInteractionStart);
                container.removeEventListener('touchend', handleInteractionEnd);
                container.removeEventListener('mouseenter', handleInteractionStart);
                container.removeEventListener('mouseleave', handleInteractionEnd);
            }
            ScrollTrigger.getAll().forEach(st => {
                if (st.trigger === containerRef.current) st.kill();
            });
        };
    }, []);

    return (
        <section id="flavors" ref={containerRef} className="section-padding bg-white relative overflow-hidden">
            {/* Background Decorative */}
            <div className="absolute top-0 right-0 w-1/3 aspect-square bg-brand-yellow/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-1/3 aspect-square bg-brand-pink/15 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3"></div>

            <div className="container-chill relative z-10">
                <div className="text-center lg:text-left mb-16 md:mb-24">
                    <span className="text-brand-pink font-black uppercase tracking-[0.2em] text-sm mb-4 block">Handcrafted Happiness</span>
                    <h2 className="text-brand-pink text-glow text-balance">
                        Discover Our<br />Signature Sundaes
                    </h2>
                    <p className="text-lg md:text-2xl text-brand-brown/70 font-bold max-w-2xl mx-auto lg:mx-0 text-pretty">
                        Explore our handcrafted artisanal signature favorites, made with love and the finest ingredients.
                    </p>
                </div>

                <div
                    ref={scrollContainerRef}
                    className="flex md:grid md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-10 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none pb-12 md:pb-0 scrollbar-hide w-full"
                    style={{ scrollBehavior: 'smooth' }}
                >
                    {flavors.map((flavor, index) => (
                        <div
                            key={index}
                            ref={el => { if (el) cardsRef.current[index] = el; }}
                            className={`group w-[85vw] md:w-auto shrink-0 snap-center relative rounded-[3.5rem] p-8 md:p-10 transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_40px_80px_rgba(209,77,159,0.1)] ${flavor.color} border-4 border-white shadow-2xl flex flex-col h-full mx-auto md:mx-0`}
                        >
                            <div className="absolute top-8 right-10 text-7xl md:text-8xl font-black opacity-5 font-heading text-brand-brown select-none">
                                0{index + 1}
                            </div>

                            {/* Image Container */}
                            <div className="w-full aspect-square rounded-[2.5rem] overflow-hidden mb-8 shadow-xl bg-white p-2 shrink-0 relative">
                                <img
                                    src={flavor.image}
                                    alt={flavor.name}
                                    className="w-full h-full object-cover rounded-[2rem] transition-transform duration-1000 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute bottom-6 left-6 bg-brand-brown text-brand-yellow px-5 py-2 rounded-full shadow-2xl font-black text-lg border border-white/20">
                                    ₹{flavor.price}
                                </div>
                            </div>

                            <div className="relative z-10 flex flex-col flex-grow text-center md:text-left">
                                <h3 className="text-2xl md:text-3xl font-black font-heading text-brand-brown mb-3">{flavor.name}</h3>
                                <p className="text-brand-brown/75 font-medium leading-relaxed mb-6 flex-grow text-base md:text-lg text-balance">
                                    {flavor.desc}
                                </p>
                                <div className="flex items-center justify-center md:justify-start text-xs font-black text-brand-pink uppercase tracking-[0.2em] mt-auto">
                                    <span className="w-2 h-2 rounded-full bg-brand-pink mr-3 animate-pulse"></span>
                                    {flavor.kcal}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Enhanced Full Menu CTA */}
                <div className="mt-24 md:mt-32 relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-pink to-[#ff9bc4] rounded-[3.5rem] md:rounded-[4rem] transform rotate-1 scale-[1.02] opacity-30 blur-2xl group-hover:scale-105 group-hover:opacity-40 transition-all duration-500"></div>
                    <div className="relative bg-brand-pink text-white rounded-[3.5rem] md:rounded-[4rem] p-10 md:p-20 flex flex-col lg:flex-row items-center justify-between shadow-2xl overflow-hidden border-4 border-white/30 backdrop-blur-sm">

                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-yellow/30 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>

                        <div className="relative z-10 text-center lg:text-left mb-10 lg:mb-0 max-w-xl">
                            <h3 className="text-4xl md:text-6xl font-heading font-black mb-6 drop-shadow-xl text-brand-yellow">Craving More?</h3>
                            <p className="text-white/95 text-lg md:text-2xl font-semibold leading-relaxed">
                                Explore our complete range of artisanal sundaes, authentic faloodas, and thick shakes. Find your perfect chill!
                            </p>
                        </div>

                        <div className="relative z-10 shrink-0 w-full lg:w-auto">
                            <a
                                href="/menu"
                                className="group/btn relative inline-flex items-center justify-center w-full lg:w-auto px-12 py-6 bg-white text-brand-pink font-heading font-black text-xl md:text-2xl rounded-2xl shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:bg-brand-brown hover:text-brand-yellow overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-4">
                                    View Full Menu
                                    <svg className="w-6 h-6 md:w-8 md:h-8 transform group-hover/btn:translate-x-3 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-24 md:mt-32 text-center border-t-4 border-brand-brown/5 pt-16">
                    <div className="inline-flex flex-col items-center">
                        <p className="text-brand-brown/40 font-black uppercase tracking-[0.4em] text-xs md:text-sm italic mb-6">
                            Prepared with Love • 100% Vegetarian
                        </p>
                        <div className="flex gap-6">
                            <span className="w-16 h-1.5 bg-brand-pink rounded-full opacity-60"></span>
                            <span className="w-16 h-1.5 bg-brand-yellow rounded-full"></span>
                            <span className="w-16 h-1.5 bg-brand-brown rounded-full"></span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
