import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SizzlingBrownie() {
    const containerRef = useRef<HTMLElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (!containerRef.current || !sliderRef.current) return;

        // Calculate the total horizontal distance to travel
        // We want to move the slider left by (total width - viewport width)
        const scrollWidth = sliderRef.current.offsetWidth;
        const viewportWidth = window.innerWidth;
        const xTranslate = -(scrollWidth - viewportWidth);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                pin: true,
                scrub: 1, // smoother scrub
                snap: {
                    snapTo: 1 / (specials.length - 1),
                    duration: { min: 0.2, max: 0.5 },
                    delay: 0.1,
                    ease: 'power1.inOut'
                },
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
            tl.scrollTrigger?.kill();
            tl.kill();
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
            image: "/images/special-2.png",
            accent: "text-brand-pink"
        },
        {
            title: "Fruit Whirl",
            description: "A colorful ice cream sundae layered thickly with fresh chopped tropical fruits and swirling syrup.",
            image: "/images/special-3.png",
            accent: "text-brand-white"
        },
        {
            title: "Gudbud",
            description: "A lavish traditional Gudbud ice cream dessert featuring colorful layers of ice cream flavors, fresh fruit chunks, and bright jelly.",
            image: "/images/special-4.png",
            accent: "text-brand-pink"
        },
        {
            title: "Sundae Fruit-Zest",
            description: "A refreshing zesty citrus sundae topped with fresh sliced oranges, lemon zest shavings, and a bright red cherry.",
            image: "/images/special-5.png",
            accent: "text-brand-yellow"
        }
    ];

    return (
        <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-brand-brown">
            {/* Header Title inside the pinned section */}
            <div className="absolute top-6 left-6 md:top-24 md:left-24 z-20">
                <h2 className="text-3xl sm:text-4xl md:text-7xl font-black text-brand-white font-heading text-glow drop-shadow-2xl">
                    Signature <br className="md:hidden" /><span className="text-brand-pink">Specials</span>
                </h2>
                <p className="text-base sm:text-xl text-brand-yellow/80 mt-1 md:mt-2 font-medium max-w-[200px] md:max-w-md hidden sm:block">
                    Experience our premium curated dessert signatures wrapped in beautiful square shapes.
                </p>
            </div>

            {/* Main Image Slider */}
            <div ref={sliderRef} className="flex flex-nowrap h-full items-center" style={{ width: `${specials.length * 100}vw` }}>
                {specials.map((special, idx) => (
                    <div key={idx} className="brownie-slide flex-shrink-0 w-screen h-full flex items-center justify-center relative px-4 sm:px-6 md:px-24">
                        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 w-full max-w-7xl relative z-10 mt-32 md:mt-24">

                            {/* Text Content */}
                            <div className="flex-1 text-center md:text-left w-full px-4 md:px-0">
                                <h3 className={`text-4xl sm:text-5xl md:text-7xl font-black mb-4 md:mb-6 ${special.accent} font-heading drop-shadow-xl`}>
                                    {special.title}
                                </h3>
                                <p className="text-lg sm:text-2xl text-white/90 font-medium leading-relaxed max-w-xl mx-auto md:mx-0">
                                    {special.description}
                                </p>
                            </div>

                            {/* Image Container */}
                            <div className="flex-1 flex justify-center w-full px-4 md:px-0">
                                <div className="relative w-full max-w-[260px] sm:max-w-sm md:max-w-lg aspect-square rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-[0_0_50px_rgba(209,77,159,0.3)] bg-gradient-to-br from-white/10 to-brand-brown/40 border-4 md:border-8 border-white/30 backdrop-blur-sm group">
                                    {/* Brand Blobs */}
                                    <div className="absolute top-0 right-0 w-24 md:w-32 h-24 md:w-32 bg-brand-pink/20 blur-3xl rounded-full"></div>
                                    <div className="absolute bottom-0 left-0 w-24 md:w-32 h-24 md:w-32 bg-brand-yellow/20 blur-3xl rounded-full"></div>

                                    <img
                                        src={special.image}
                                        alt={special.title}
                                        className="w-full h-full object-cover relative z-10 group-hover:scale-110 transition-transform duration-1000 ease-out"
                                    />

                                    {/* Badge counter for verification */}
                                    <div className="absolute top-6 left-6 z-20 bg-brand-pink text-brand-white px-4 py-1 rounded-full font-black text-xl shadow-lg border border-white/50">
                                        {idx + 1}/{specials.length}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30 opacity-80 bg-black/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10 transition-all duration-300">
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
