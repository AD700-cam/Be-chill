import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SizzlingBrownie() {
    const containerRef = useRef<HTMLElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (!containerRef.current || !sliderRef.current) return;

        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            // Calculate the total horizontal distance to travel
            // We want to move the slider left by (total width - viewport width)
            const scrollWidth = sliderRef.current!.offsetWidth;
            const viewportWidth = window.innerWidth;
            const xTranslate = -(scrollWidth - viewportWidth);

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    pin: true,
                    scrub: 1, // Add slight smoothing without snapping lock
                    anticipatePin: 1,
                    start: "top top",
                    end: () => `+=${scrollWidth}`,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        const progress = self.progress;
                        const index = Math.min(Math.round(progress * (specials.length - 1)), specials.length - 1);
                        setActiveIndex(index);
                    }
                }
            });

            tl.to(sliderRef.current, {
                x: xTranslate,
                ease: "none"
            });

            return () => {
                tl.kill();
            }
        });

        // Mobile auto-scroll logic
        let interval: ReturnType<typeof setInterval>;
        let isPaused = false;

        const startScroll = () => {
            if (interval) clearInterval(interval);
            interval = setInterval(() => {
                const container = scrollContainerRef.current;
                if (!container || isPaused || window.innerWidth >= 768) return;

                const scrollAmount = container.clientWidth;
                if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
                    container.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            }, 3000);
        };

        const checkMobileAndScroll = () => {
            if (window.innerWidth < 768 && scrollContainerRef.current) {
                startScroll();
            } else {
                if (interval) clearInterval(interval);
            }
        };

        checkMobileAndScroll();
        window.addEventListener('resize', checkMobileAndScroll);

        const handleInteractionStart = () => { isPaused = true; };
        const handleInteractionEnd = () => { isPaused = false; };

        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener('touchstart', handleInteractionStart);
            scrollContainer.addEventListener('touchend', handleInteractionEnd);
            scrollContainer.addEventListener('mouseenter', handleInteractionStart);
            scrollContainer.addEventListener('mouseleave', handleInteractionEnd);
        }

        return () => {
            mm.revert();
            if (interval) clearInterval(interval);
            window.removeEventListener('resize', checkMobileAndScroll);
            if (scrollContainer) {
                scrollContainer.removeEventListener('touchstart', handleInteractionStart);
                scrollContainer.removeEventListener('touchend', handleInteractionEnd);
                scrollContainer.removeEventListener('mouseenter', handleInteractionStart);
                scrollContainer.removeEventListener('mouseleave', handleInteractionEnd);
            }
        };
    }, []);

    const specials = [
        {
            title: "Sizzling Brownie",
            description: "A decadent sizzling chocolate brownie topped with melting vanilla ice cream, hot chocolate syrup, and roasted nuts, served on a smoking hot skillet.",
            image: "/images/special-1.png",
            accent: "text-brand-yellow"
        },
        {
            title: "OG Vanilla",
            description: "A classic, perfectly round scoop of rich vanilla bean ice cream served elegantly in a premium bowl.",
            image: "/images/og-vanilla.png",
            accent: "text-brand-pink"
        },
        {
            title: "Fruit Whirl",
            description: "A colorful ice cream sundae layered thickly with fresh chopped tropical fruits and swirling syrup.",
            image: "/images/fruit-whirl.png",
            accent: "text-brand-white"
        }
    ];

    return (
        <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-brand-brown">
            {/* Header Title inside the pinned section */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 lg:left-24 lg:translate-x-0 z-20 text-center lg:text-left w-full lg:w-auto px-6">
                <h2 className="text-brand-white text-glow drop-shadow-2xl">
                    Signature <span className="text-brand-pink">Specials</span>
                </h2>
                <p className="text-sm md:text-2xl text-brand-yellow/70 mt-4 font-black uppercase tracking-[0.3em] hidden sm:block">
                    Premium curated dessert signatures
                </p>
            </div>

            {/* Main Image Slider */}
            <div
                ref={scrollContainerRef}
                className="flex md:flex-nowrap h-full items-center overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none scrollbar-hide w-full"
            >
                <div
                    ref={sliderRef}
                    className="flex flex-nowrap h-full items-center"
                    style={{
                        width: window.innerWidth < 768 ? 'max-content' : `${specials.length * 100}vw`,
                        willChange: 'transform'
                    }}
                >
                    {specials.map((special, idx) => (
                        <div key={idx} className="brownie-slide flex-shrink-0 w-screen h-full flex items-center justify-center relative px-6 md:px-24 snap-center">
                            <div className="container-chill flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 w-full relative z-10 mt-24 lg:mt-0">

                                {/* Text Content */}
                                <div className="flex-1 text-center lg:text-left w-full">
                                    <h3 className={`text-5xl md:text-9xl font-black mb-8 ${special.accent} font-brand drop-shadow-2xl uppercase tracking-tighter italic`}>
                                        {special.title}
                                    </h3>
                                    <p className="text-lg md:text-3xl text-white/95 font-bold leading-relaxed max-w-xl mx-auto lg:mx-0 text-balance">
                                        {special.description}
                                    </p>
                                </div>

                                {/* Image Container */}
                                <div className="flex-1 flex justify-center w-full">
                                    <div className="relative w-full max-w-[280px] md:max-w-xl aspect-square rounded-[3rem] md:rounded-[5rem] overflow-hidden shadow-[0_0_80px_rgba(209,77,159,0.4)] bg-gradient-to-br from-white/10 to-transparent border-4 md:border-8 border-white/20 backdrop-blur-md group">
                                        {/* Brand Blobs */}
                                        <div className="absolute top-0 right-0 w-32 md:w-48 h-32 md:h-48 bg-brand-pink/20 blur-[80px] rounded-full"></div>
                                        <div className="absolute bottom-0 left-0 w-32 md:w-48 h-32 md:h-48 bg-brand-yellow/10 blur-[80px] rounded-full"></div>

                                        <img
                                            src={special.image}
                                            alt={special.title}
                                            className="w-full h-full object-cover relative z-10 lg:group-hover:scale-110 transition-transform duration-1000 ease-out"
                                            loading="lazy"
                                        />

                                        {/* Badge counter */}
                                        <div className="absolute top-8 left-8 z-20 bg-brand-pink text-white px-6 py-2 rounded-2xl font-black text-2xl shadow-2xl border-2 border-white/30">
                                            {idx + 1}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll Indicator - Hidden on Mobile */}
            <div className="hidden md:flex absolute bottom-12 left-1/2 -translate-x-1/2 flex-col items-center gap-2 z-30 opacity-80 bg-black/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10 transition-all duration-300">
                <span className="text-brand-white uppercase tracking-widest text-xs font-bold font-sans">
                    Scroll to Discover More ({activeIndex + 1}/{specials.length})
                </span>
                <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden mt-2">
                    <div
                        className="h-full bg-brand-pink transition-all duration-300 ease-out"
                        style={{ width: `${((activeIndex + 1) / specials.length) * 100}%` }}
                    ></div>
                </div>
            </div>
        </section>
    );
}
