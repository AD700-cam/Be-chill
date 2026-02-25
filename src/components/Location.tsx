import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Location() {
    const containerRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        gsap.fromTo(cardsRef.current,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }, []);

    const addressQuery = encodeURIComponent("Ward no 5, Rishi Nivas, Bangarpet Rd, Kurubarpet, Gowripete, Kolar, Karnataka 563101");

    return (
        <section id="location" ref={containerRef} className="py-24 bg-brand-yellow relative overflow-hidden">
            {/* Background Blob */}
            <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-white/40 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-brand-pink text-glow font-heading mb-4">
                        Come Say Hi!
                    </h2>
                    <p className="text-lg sm:text-xl font-medium text-brand-brown/80 max-w-2xl mx-auto">
                        Find your nearest Be Chill parlor. We're ready to serve up your favorite scoops.
                    </p>
                </div>

                {/* Soft Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">

                    {/* Bento Block 1: Address */}
                    <div
                        ref={el => { if (el) cardsRef.current[0] = el; }}
                        className="md:col-span-1 lg:col-span-4 flex flex-col justify-center bg-white rounded-[3rem] p-8 sm:p-10 shadow-xl border-4 border-white hover:border-brand-pink/20 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden"
                    >
                        <div className="w-16 h-16 bg-brand-pink/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                            <span className="text-3xl">📍</span>
                        </div>
                        <h3 className="font-heading text-3xl font-bold text-brand-brown mb-4 group-hover:text-brand-pink transition-colors">Our Location</h3>
                        <p className="text-brand-brown/80 font-medium leading-relaxed text-lg">
                            Ward no 5, Rishi Nivas<br />
                            Bangarpet Rd, Kurubarpet<br />
                            Gowripete, Kolar<br />
                            Karnataka 563101
                        </p>
                        {/* Decorative gradient corner */}
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand-pink/5 rounded-full blur-2xl origin-center group-hover:scale-150 transition-transform duration-700"></div>
                    </div>

                    {/* Bento Block 2: Map (Spans 2 rows on Desktop) */}
                    <div
                        ref={el => { if (el) cardsRef.current[1] = el; }}
                        className="md:col-span-2 lg:col-span-8 lg:row-span-2 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white relative min-h-[400px] lg:min-h-full group bg-brand-pink/10"
                    >
                        <iframe
                            title="Be Chill Location Map"
                            src={`https://maps.google.com/maps?q=${addressQuery}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute inset-0 w-full h-full mix-blend-multiply transition-transform duration-1000 group-hover:scale-105"
                        ></iframe>
                        {/* Interactive overlay border */}
                        <div className="absolute inset-0 border-4 border-transparent group-hover:border-brand-pink/30 rounded-[3rem] pointer-events-none transition-colors duration-500"></div>
                    </div>

                    {/* Bento Block 3: Hours & CTA */}
                    <div
                        ref={el => { if (el) cardsRef.current[2] = el; }}
                        className="md:col-span-1 lg:col-span-4 flex flex-col justify-between bg-brand-pink rounded-[3rem] p-8 sm:p-10 shadow-xl border-4 border-brand-pink hover:-translate-y-2 transition-transform duration-500 group text-white relative overflow-hidden"
                    >
                        {/* Background glow pattern */}
                        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                        <div>
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-500 backdrop-blur-sm">
                                <span className="text-3xl">🕒</span>
                            </div>
                            <h3 className="font-heading text-3xl font-bold mb-4">We're Scooping</h3>
                            <p className="font-medium leading-relaxed text-lg mb-8 text-white/90">
                                Monday - Sunday<br />
                                11:00 AM - 11:00 PM
                            </p>
                        </div>

                        <a
                            href="https://maps.app.goo.gl/MQarUVtuL56FVLLU9"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white text-brand-pink font-bold py-4 rounded-full text-center active:scale-95 hover:bg-brand-yellow hover:text-brand-brown transition-all shadow-brand flex justify-center items-center gap-3 text-lg z-10 group/btn"
                        >
                            Get Directions <span className="group-hover/btn:translate-x-2 transition-transform duration-300">📍</span>
                        </a>
                    </div>

                </div>
            </div>
        </section>
    );
}
