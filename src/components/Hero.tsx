import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const [phone, setPhone] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        try {
            await fetch('https://script.google.com/macros/s/AKfycbzlpIzsh58qhn-GVK5hlP23MuYLGUHYqEGmnowqImLap2SUHwYETG3u-MiPRI3i4y0n1Q/exec', {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify({ phone, source: 'Hero Form' }),
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8',
                }
            });

            setMessage('Joined successfully!');
            setPhone('');
            setTimeout(() => setMessage(''), 5000);
        } catch (error) {
            console.error('Fetch error:', error);
            setMessage(`Error: ${error instanceof Error ? error.message : String(error)}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        // Basic Hero Animation Timeline
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Assuming we'll use a local image later, just a placeholder structure
        tl.fromTo(headingRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, delay: 0.5 }
        )
            .fromTo(imageRef.current,
                { scale: 0.8, opacity: 0, rotation: -10 },
                { scale: 1, opacity: 1, rotation: 0, duration: 1.2, ease: 'back.out(1.7)' },
                "-=0.5"
            )
            .to(imageRef.current, {
                y: -20,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            }); // Floating effect
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-32 pb-16"
            style={{
                background: 'radial-gradient(circle at center, var(--brand-yellow) 0%, rgba(248, 241, 186, 0.3) 100%)'
            }}
        >
            <div className="container-chill grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center z-10">

                {/* Text Content */}
                <div className="flex flex-col gap-6 md:gap-8 text-center lg:text-left order-2 lg:order-1">
                    <h1 ref={headingRef} className="text-brand-pink text-glow text-balance">
                        The finest scoops<br className="hidden md:block" /> in Kolar.
                    </h1>
                    <p className="text-lg md:text-2xl font-bold text-brand-brown/70 max-w-xl mx-auto lg:mx-0 leading-relaxed text-pretty">
                        Where every visit feels like a good day. Grab the best ice cream sundae in town and just <span className="font-black text-brand-pink">be chill</span>.
                    </p>

                    <div className="mt-4 max-w-md mx-auto lg:mx-0 w-full relative z-20">
                        <form className="flex flex-col sm:flex-row gap-3 w-full" onSubmit={handleSubmit}>
                            <div className="relative flex-1 group">
                                <input
                                    type="tel"
                                    id="hero-phone-input"
                                    name="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Enter Phone Number..."
                                    className="w-full px-6 py-4 rounded-2xl border-2 border-brand-pink/10 focus:border-brand-pink focus:ring-4 focus:ring-brand-pink/10 outline-none transition-all shadow-sm text-brand-brown bg-white/80 backdrop-blur-sm placeholder:text-brand-brown/30 font-bold disabled:opacity-70"
                                    required
                                    pattern="[0-9]{10}"
                                    title="10 digit phone number"
                                    disabled={isSubmitting}
                                />
                                <div className="absolute inset-0 rounded-2xl border border-brand-pink/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-brand-brown text-brand-yellow font-black px-8 py-4 rounded-2xl shadow-xl active:scale-95 lg:hover:scale-105 transition-all duration-300 outline-none focus-visible:ring-4 focus-visible:ring-brand-brown/40 whitespace-nowrap disabled:opacity-70 disabled:hover:scale-100 uppercase tracking-widest text-sm"
                            >
                                {isSubmitting ? 'Joining...' : 'Join Club'}
                            </button>
                        </form>
                        {message ? (
                            <p className="text-sm font-bold text-brand-pink mt-4 animate-in fade-in slide-in-from-top-2">{message}</p>
                        ) : (
                            <p className="text-xs text-brand-brown/60 mt-4 font-bold uppercase tracking-wider flex items-center justify-center lg:justify-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-pink animate-pulse"></span>
                                Join the community for exclusive updates
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-4 w-full z-20 relative px-4 sm:px-0">
                        <button
                            onClick={() => document.getElementById('flavors')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-brand-pink text-white font-black text-lg px-10 py-4 rounded-2xl shadow-brand active:scale-95 lg:hover:scale-105 transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-pink/40"
                        >
                            See Menu
                        </button>
                        <button
                            onClick={() => document.getElementById('location')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-white/50 backdrop-blur-sm text-brand-pink font-black text-lg px-10 py-4 rounded-2xl shadow-brand active:scale-95 border-2 border-brand-pink/20 lg:hover:border-brand-pink lg:hover:bg-brand-pink lg:hover:text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-pink/40"
                        >
                            Find Us
                        </button>
                    </div>
                </div>

                <div className="relative flex justify-center items-center order-1 lg:order-2">
                    <div
                        ref={imageRef}
                        className="w-full max-w-[320px] md:max-w-[450px] aspect-square rounded-[3rem] md:rounded-[5rem] flex items-center justify-center relative shadow-2xl"
                    >
                        <div className="absolute inset-[-10px] rounded-[3.5rem] md:rounded-[5.5rem] border-2 border-dashed border-brand-pink/30 animate-spin-slow opacity-40"></div>
                        <div className="absolute inset-[-20px] rounded-[4rem] md:rounded-[6rem] border border-brand-brown/5 animate-reverse-spin opacity-20"></div>

                        {/* Actual Logo Video */}
                        <div className="w-[94%] h-[94%] rounded-[2.5rem] md:rounded-[4.5rem] overflow-hidden flex items-center justify-center relative z-10 bg-brand-yellow shadow-inner border border-white/50">
                            <video
                                src="/hero-video.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover mix-blend-multiply opacity-95"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Background blobs for depth */}
            <div className="absolute top-20 -left-20 w-96 h-96 bg-brand-pink/10 rounded-full blur-3xl rounded-full"></div>
            <div className="absolute bottom-20 -right-20 w-[500px] h-[500px] bg-brand-brown/5 rounded-full blur-3xl rounded-full"></div>
        </section>
    );
}
