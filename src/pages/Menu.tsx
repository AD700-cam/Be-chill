import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { menuData } from '../data/menuData'
import MenuCategoryHeader from '../components/menu/MenuCategoryHeader'
import MenuItemRow from '../components/menu/MenuItemRow'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Menu() {
    useEffect(() => {
        window.scrollTo(0, 0);

        // Title Animation
        const titleAnim = gsap.fromTo(".menu-title",
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.1 }
        );

        const subtitleAnim = gsap.fromTo(".menu-subtitle",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.3 }
        );

        // Batch animate category sections to reduce scroll trigger calculations
        const sections = document.querySelectorAll('.menu-category-section');
        const sectionAnims: gsap.core.Tween[] = [];

        sections.forEach((section) => {
            const anim = gsap.fromTo(section,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 90%", // Trigger slightly earlier
                        toggleActions: "play none none reverse" // Ensure minimal rerunning if scrolled fast
                    }
                }
            );
            sectionAnims.push(anim);
        });

        return () => {
            titleAnim.kill();
            subtitleAnim.kill();
            sectionAnims.forEach(anim => anim.kill());
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [])

    return (
        <div className="relative w-full min-h-screen pb-10">
            {/* Fixed Background to prevent heavy repainting on scroll */}
            <div className="fixed inset-0 bg-checkerboard z-0 pointer-events-none" style={{ willChange: 'transform' }}></div>

            <div className="relative z-20">
                <Navbar />
            </div>

            <main className="pt-32 pb-24 px-4 sm:px-6 max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h1 className="menu-title text-5xl md:text-7xl font-bold font-heading text-brand-brown mb-6">Our Full Menu</h1>
                    <p className="menu-subtitle text-lg text-brand-brown/70 max-w-2xl mx-auto">Explore our complete range of artisanal treats, handcrafted with love.</p>
                </div>

                {menuData.map((category, idx) => {
                    const isDark = category.theme === 'dark';

                    // For dark themes, we wrap them in a lovely pink box
                    if (isDark) {
                        return (
                            <section key={idx} className="menu-category-section bg-brand-pink text-white rounded-[3rem] px-6 py-10 md:px-12 md:py-16 shadow-[0_10px_30px_rgba(0,0,0,0.15)] my-16 relative" style={{ willChange: 'transform, opacity' }}>
                                {/* Decorative swooshes inside the pink box can be added here if desired */}

                                <MenuCategoryHeader title={category.title} theme="dark" />

                                {category.badge && (
                                    <div className="absolute top-10 right-10 rotate-12 bg-white text-brand-pink font-bold rounded-full px-4 py-8 shadow-lg z-20 text-center leading-tight">
                                        <span className="block text-sm">@ JUST</span>
                                        <span className="block text-2xl font-black">{category.badge.replace('@ JUST ', '')}</span>
                                    </div>
                                )}

                                <div className="space-y-6 md:space-y-8 mt-12 grid grid-cols-1 gap-x-12">
                                    {category.items.map((item, itemIdx) => (
                                        <MenuItemRow key={itemIdx} item={item} theme="dark" />
                                    ))}
                                </div>
                            </section>
                        )
                    }

                    // Light theme category rendering
                    return (
                        <section key={idx} className="menu-category-section my-16 relative text-brand-brown" style={{ willChange: 'transform, opacity' }}>
                            <div className="flex flex-col items-center">
                                <MenuCategoryHeader title={category.title} theme="light" />

                                {category.hasVeganSection && (
                                    <div className="flex items-center gap-2 mb-8 text-green-600 font-bold uppercase tracking-wider text-xl">
                                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                        VEGAN
                                    </div>
                                )}

                                {category.badge && (
                                    <div className="absolute -top-10 right-0 md:right-10 rotate-12 bg-brand-pink text-white font-bold rounded-full w-24 h-24 flex flex-col items-center justify-center shadow-lg z-20 leading-tight">
                                        <span className="block text-[10px] md:text-xs">@ JUST</span>
                                        <span className="block text-xl md:text-2xl font-black">{category.badge.replace('@ JUST ', '')}</span>
                                    </div>
                                )}

                                {category.icons && (
                                    <div className="flex flex-wrap justify-center gap-4 mb-10 mt-[-10px] text-brand-brown/70 font-semibold text-xs md:text-sm">
                                        {category.icons.map((iconStr, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full border border-brand-pink flex items-center justify-center text-brand-pink">
                                                    ✨ {/* Using a simple sparkle as a generic icon placeholder */}
                                                </div>
                                                <span>{iconStr}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-6 md:space-y-8 mt-4 grid grid-cols-1 gap-x-12">
                                {category.items.map((item, itemIdx) => (
                                    <MenuItemRow key={itemIdx} item={item} theme="light" />
                                ))}
                            </div>
                        </section>
                    )
                })}

                {/* Legend footer */}
                <div className="mt-24 mb-10 pt-8 border-t border-brand-brown/10 text-center">
                    <div className="inline-flex flex-wrap justify-center items-center gap-4 md:gap-8 bg-white/60 backdrop-blur-sm shadow-sm py-3 px-6 rounded-full text-xs md:text-sm font-semibold text-brand-brown">
                        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm border border-green-600 flex items-center justify-center"><span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span></span> 100% Veg</span>
                        <span className="w-px h-4 bg-brand-brown/20 hidden sm:block"></span>
                        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm border border-blue-400 flex items-center justify-center"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span></span> 100% Dairy</span>
                        <span className="w-px h-4 bg-brand-brown/20 hidden sm:block"></span>

                        {/* SVG Icons used in Menu rows */}
                        <span className="flex items-center gap-1 text-[#f39ec9]">
                            <svg className="w-3 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v3a2 2 0 0 0 4 0V2M7 10v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9a4 4 0 0 0-4-4h-2a4 4 0 0 0-4 4z" /><path d="M7 14h10" /></svg> Wait
                        </span>
                        <span className="w-px h-4 bg-brand-brown/20 hidden sm:block"></span>
                        <span className="flex items-center gap-1 text-[#f39ec9]">
                            <svg className="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="14" r="4" /><circle cx="15" cy="14" r="4" /><circle cx="12" cy="8" r="4" /></svg> Nuts
                        </span>
                        <span className="w-px h-4 bg-brand-brown/20 hidden sm:block"></span>
                        <span className="flex items-center gap-1 text-[#f39ec9]">
                            <svg className="w-3 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20 M7 5l5 5 M17 5l-5 5 M7 11l5 5 M17 11l-5 5 M7 17l5 5 M17 17l-5 5" /></svg> Gluten
                        </span>
                    </div>
                </div>

                <div className="mt-8 text-center pb-20">
                    <a href="/" className="inline-block px-8 py-4 bg-brand-pink text-white font-heading font-bold rounded-full hover:bg-brand-brown transition-all duration-300 shadow-[0_10px_30px_rgba(209,77,159,0.3)] hover:-translate-y-1">
                        Back to Home
                    </a>
                </div>
            </main>

            <Footer />
        </div>
    )
}
