import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                toggleActions: "play none none reverse"
            }
        });

        tl.fromTo(imageRef.current,
            { x: -100, opacity: 0, rotate: -5 },
            { x: 0, opacity: 1, rotate: 0, duration: 1.2, ease: "power4.out" }
        )
            .fromTo(contentRef.current?.children || [],
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" },
                "-=0.8"
            );
    }, []);

    return (
        <section ref={sectionRef} id="about" className="py-24 bg-brand-yellow/10 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">

                {/* Image Side */}
                <div ref={imageRef} className="flex-1 relative group">
                    <div className="absolute -inset-4 bg-brand-pink/20 rounded-[3rem] blur-2xl group-hover:bg-brand-pink/30 transition-colors duration-500"></div>
                    <div className="relative aspect-square rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl bg-brand-brown">
                        <img
                            src="/images/storefront.jpg"
                            alt="Be Chill Storefront"
                            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                        />
                    </div>
                    {/* Decorative Element */}
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-yellow rounded-full border-4 border-white flex items-center justify-center shadow-xl rotate-12 group-hover:rotate-0 transition-transform duration-500 z-20">
                        <span className="text-brand-brown font-bold text-center leading-tight">Est.<br />2024</span>
                    </div>
                </div>

                {/* Content Side */}
                <div ref={contentRef} className="flex-1 text-center md:text-left">
                    <h2 className="text-5xl sm:text-6xl md:text-9xl font-bold text-brand-brown font-heading mb-6 sm:mb-8 leading-tight uppercase tracking-tighter">
                        <span className="text-brand-pink underline decoration-brand-yellow">Be</span> Chill
                    </h2>
                    <div className="space-y-4 sm:space-y-6 text-base sm:text-xl text-brand-brown/80 font-medium leading-relaxed max-w-lg mx-auto md:mx-0">
                        <p>
                            At <span className="text-brand-pink font-bold">Be Chill</span>, we believe that happiness is best served frozen. What started as a small dream to redefine the local ice cream experience has grown into a community of dessert enthusiasts.
                        </p>
                        <p>
                            We don't just scoop ice cream; we craft moments. Every flavor is a result of hundreds of trials, ensuring a perfect balance of texture, sweetness, and that "wow" factor that keeps you coming back.
                        </p>
                        <div className="pt-4 flex flex-wrap gap-4 justify-center md:justify-start">
                            <div className="bg-white px-4 sm:px-6 py-2 rounded-full border border-brand-brown/10 shadow-sm flex items-center gap-2 text-sm sm:text-base">
                                <span className="text-brand-pink">✔</span> ✨ Handcrafted Daily
                            </div>
                            <div className="bg-white px-4 sm:px-6 py-2 rounded-full border border-brand-brown/10 shadow-sm flex items-center gap-2 text-sm sm:text-base">
                                <span className="text-brand-pink">✔</span> 🥛 Premium Dairy
                            </div>
                            <div className="bg-white px-4 sm:px-6 py-2 rounded-full border border-brand-brown/10 shadow-sm flex items-center gap-2 text-sm sm:text-base">
                                <span className="text-brand-pink">✔</span> 🍓 Natural Fruits
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Background Texture/Blobs */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-brand-pink/5 rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-yellow/20 rounded-full blur-[100px]"></div>
        </section>
    );
}
