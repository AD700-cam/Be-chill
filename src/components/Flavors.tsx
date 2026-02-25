import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const flavors = [
    { name: 'Fruit Loot', desc: 'Fresh tropical fruits with vanilla cream and a hint of mint.', image: '/images/flavors/pineapple.png', color: 'bg-yellow-50', price: '209', kcal: '612 Kcal' },
    { name: 'Banoffee Sundae', desc: 'The classic banana and toffee combination, perfectly layered.', image: '/images/flavors/banana-split.png', color: 'bg-pink-50', price: '219', kcal: '648 Kcal' },
    { name: 'Gulab Jamun Delight', desc: 'Warm, syrupy gulab jamun paired with chilled artisanal vanilla.', image: '/images/flavors/gulab-jamun.png', color: 'bg-orange-50', price: '195', kcal: '170 Kcal' },
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
                    <p className="text-lg sm:text-xl text-brand-brown/60 font-semibold max-w-2xl mx-auto px-4 mb-4">
                        Explore our handcrafted artisanal signature favorites, made with love and the finest ingredients.
                    </p>
                    <p className="text-brand-pink font-bold uppercase tracking-widest text-sm animate-pulse hidden sm:block">
                        Scroll to discover our top 3 specials ➔
                    </p>
                </div>

                <div
                    ref={scrollContainerRef}
                    className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 overflow-x-auto sm:overflow-x-visible snap-x snap-mandatory sm:snap-none pb-8 sm:pb-0 scrollbar-hide w-full"
                    style={{ scrollBehavior: 'smooth' }}
                >
                    {flavors.map((flavor, index) => (
                        <div
                            key={index}
                            ref={el => { if (el) cardsRef.current[index] = el; }}
                            className={`group w-[85vw] sm:w-auto shrink-0 snap-center relative rounded-[3rem] p-6 sm:p-10 transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] ${flavor.color} border-4 border-white shadow-2xl overflow-hidden flex flex-col h-full mx-auto sm:mx-0`}
                        >
                            <div className="absolute top-6 sm:top-8 right-8 sm:right-10 text-6xl sm:text-7xl font-bold opacity-5 font-heading text-brand-brown">
                                0{index + 1}
                            </div>

                            {/* Image Container */}
                            <div className="w-full aspect-square rounded-[2rem] overflow-hidden mb-6 sm:mb-8 shadow-xl bg-white p-2 shrink-0 relative">
                                <img
                                    src={flavor.image}
                                    alt={flavor.name}
                                    className="w-full h-full object-cover rounded-[1.5rem] transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg font-bold text-brand-pink text-sm sm:text-base border border-brand-pink/20">
                                    ₹{flavor.price}
                                </div>
                            </div>

                            <div className="relative z-10 flex flex-col flex-grow">
                                <h3 className="text-xl sm:text-2xl font-bold font-heading text-brand-brown mb-2">{flavor.name}</h3>
                                <p className="text-brand-brown/70 font-medium leading-relaxed mb-6 flex-grow text-sm sm:text-base">
                                    {flavor.desc}
                                </p>
                                <div className="flex items-center text-xs font-bold text-brand-brown/50 uppercase tracking-widest mt-auto">
                                    <span className="w-2 h-2 rounded-full bg-brand-pink mr-2"></span>
                                    {flavor.kcal}
                                </div>
                            </div>

                            {/* Hover Decorative */}
                            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-brand-pink/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                        </div>
                    ))}
                </div>

                {/* Enhanced Full Menu CTA */}
                <div className="mt-24 sm:mt-32 relative max-w-4xl mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-pink to-[#ff9bc4] rounded-[3rem] transform rotate-1 scale-105 opacity-50 blur-xl"></div>
                    <div className="relative bg-brand-pink text-white rounded-[3rem] p-10 sm:p-16 flex flex-col md:flex-row items-center justify-between shadow-2xl overflow-hidden border-4 border-white">

                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-yellow/30 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>

                        <div className="relative z-10 text-center md:text-left mb-8 md:mb-0 max-w-lg">
                            <h3 className="text-3xl sm:text-5xl font-heading font-bold mb-4 drop-shadow-md">Craving More?</h3>
                            <p className="text-white/90 text-lg sm:text-xl font-medium">
                                Explore our complete range of artisanal sundaes, authentic faloodas, and thick shakes. Find your perfect chill!
                            </p>
                        </div>

                        <div className="relative z-10 shrink-0">
                            <a
                                href="/menu"
                                className="group relative inline-flex items-center justify-center px-10 py-5 bg-white text-brand-pink font-heading font-black text-xl rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-brand-yellow/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                                <span className="relative z-10 flex items-center gap-3">
                                    View Full Menu
                                    <svg className="w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-24 sm:mt-32 text-center border-t-2 border-brand-brown/5 pt-16">
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
