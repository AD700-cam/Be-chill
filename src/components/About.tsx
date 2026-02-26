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
        <section ref={sectionRef} id="about" className="section-padding bg-brand-yellow/10 overflow-hidden relative">
            <div className="container-chill flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                {/* Image Side */}
                <div ref={imageRef} className="flex-1 relative group w-full max-w-xl lg:max-w-none">
                    <div className="absolute -inset-4 bg-brand-pink/15 rounded-[3.5rem] blur-2xl group-hover:bg-brand-pink/25 transition-colors duration-500"></div>
                    <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-[3rem] md:rounded-[4rem] overflow-hidden border-4 md:border-8 border-white shadow-2xl bg-brand-brown">
                        <img
                            src="/images/storefront.jpg"
                            alt="Be Chill Storefront"
                            className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-110"
                            loading="lazy"
                        />
                    </div>
                    {/* Decorative Element */}
                    <div className="absolute -bottom-6 -right-4 md:-right-6 w-28 h-28 md:w-36 md:h-36 bg-brand-yellow rounded-full border-4 border-white flex items-center justify-center shadow-2xl rotate-12 group-hover:rotate-0 transition-transform duration-500 z-20">
                        <span className="text-brand-brown font-black text-center leading-tight text-sm md:text-lg">Est.<br />2024</span>
                    </div>
                </div>

                {/* Content Side */}
                <div ref={contentRef} className="flex-1 text-center lg:text-left">
                    <span className="text-brand-pink font-black uppercase tracking-[0.2em] text-sm mb-4 block">Our Story</span>
                    <h2 className="text-brand-pink text-glow text-balance mb-8">
                        We're not just<br /> making ice cream.
                    </h2>

                    <div className="space-y-6 md:space-y-8 text-brand-brown/70 font-bold leading-relaxed max-w-2xl mx-auto lg:mx-0 text-pretty text-lg md:text-xl">
                        <p>
                            At <span className="text-brand-pink font-black">Be Chill</span>, we believe that happiness is best served frozen. What started as a small dream to redefine the local ice cream experience has grown into a vibrant community of dessert enthusiasts.
                        </p>
                        <p>
                            We don't just scoop ice cream; we craft moments. Every flavor is a result of hundreds of trials, ensuring a perfect balance of texture, sweetness, and that "wow" factor.
                        </p>
                        <div className="pt-4 flex flex-wrap gap-3 md:gap-4 justify-center lg:justify-start">
                            <div className="bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-2xl border border-brand-brown/5 shadow-sm flex items-center gap-3 text-sm md:text-base font-black text-brand-brown/90 hover:border-brand-pink/20 transition-colors">
                                <span className="text-brand-pink text-xl">✨</span> Handcrafted Daily
                            </div>
                            <div className="bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-2xl border border-brand-brown/5 shadow-sm flex items-center gap-3 text-sm md:text-base font-black text-brand-brown/90 hover:border-brand-pink/20 transition-colors">
                                <span className="text-brand-pink text-xl">🥛</span> Premium Dairy
                            </div>
                            <div className="bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-2xl border border-brand-brown/5 shadow-sm flex items-center gap-3 text-sm md:text-base font-black text-brand-brown/90 hover:border-brand-pink/20 transition-colors">
                                <span className="text-brand-pink text-xl">🍓</span> Natural Fruits
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
