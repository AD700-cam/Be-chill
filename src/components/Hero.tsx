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
            className="relative min-h-[100dvh] min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-12"
            style={{
                background: 'radial-gradient(circle at center, var(--brand-yellow) 0%, rgba(248, 241, 186, 0.5) 100%)'
            }}
        >
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10">

                {/* Text Content */}
                <div className="flex flex-col gap-6 text-center md:text-left">
                    <h1 ref={headingRef} className="text-5xl sm:text-6xl md:text-8xl font-bold text-brand-pink text-glow leading-tight">
                        The finest scoops<br />in Kolar.
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl font-medium text-brand-brown/80 max-w-lg mx-auto md:mx-0">
                        Where every visit feels like a good day. Grab the best ice cream sundae in town and just <span className="font-bold text-brand-pink">be chill</span>.
                    </p>
                    <div className="mt-8 sm:mt-6 max-w-sm mx-auto md:mx-0 w-full px-2 sm:px-0 z-20 relative">
                        <form className="flex flex-col sm:flex-row gap-2 w-full" onSubmit={handleSubmit}>
                            <input
                                type="tel"
                                id="hero-phone-input"
                                name="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Enter Phone Number..."
                                className="flex-1 px-5 py-3 sm:py-4 rounded-full border-2 border-brand-pink/20 focus:border-brand-pink focus:ring-4 focus:ring-brand-pink/20 outline-none transition-all shadow-inner text-brand-brown bg-white/90 backdrop-blur-sm placeholder:text-brand-brown/40 font-medium disabled:opacity-70"
                                required
                                pattern="[0-9]{10}"
                                title="10 digit phone number"
                                disabled={isSubmitting}
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-brand-brown text-brand-yellow font-bold px-6 py-3 sm:py-4 rounded-full shadow-lg active:scale-95 hover:scale-105 transition-all duration-300 outline-none focus-visible:ring-4 focus-visible:ring-brand-brown/50 whitespace-nowrap disabled:opacity-70 disabled:hover:scale-100 disabled:active:scale-100"
                            >
                                {isSubmitting ? 'Joining...' : 'Join Club'}
                            </button>
                        </form>
                        {message ? (
                            <p className="text-sm font-bold text-brand-pink mt-3 text-center md:text-left">{message}</p>
                        ) : (
                            <p className="text-xs text-brand-brown/70 mt-3 text-center md:text-left font-medium">Join our community for exclusive updates.</p>
                        )}
                    </div>

                    <div className="flex flex-row gap-3 sm:gap-4 justify-center md:justify-start mt-6 px-2 sm:px-0 w-full z-20 relative">
                        <button
                            onClick={() => document.getElementById('flavors')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-brand-pink text-white font-bold text-sm sm:text-lg px-4 py-3 sm:px-8 sm:py-4 rounded-full shadow-brand active:scale-95 hover:scale-105 transition-all duration-300 flex-1 sm:flex-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-pink/50"
                        >
                            See Menu
                        </button>
                        <button
                            onClick={() => document.getElementById('location')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-white text-brand-pink font-bold text-sm sm:text-lg px-4 py-3 sm:px-8 sm:py-4 rounded-full shadow-brand active:scale-95 border-2 border-brand-pink hover:bg-brand-pink hover:text-white transition-all duration-300 flex-1 sm:flex-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-pink/50"
                        >
                            Find Us
                        </button>
                    </div>
                </div>

                <div className="relative flex justify-center items-center mt-8 md:mt-0">
                    {/* We will replace the src with actual imagery from the user's provided files */}
                    <div
                        ref={imageRef}
                        className="w-full max-w-[280px] sx:max-w-[320px] md:max-w-[400px] aspect-[10/9] bg-gradient-to-tr from-brand-pink/20 to-brand-yellow rounded-[2.5rem] md:rounded-[4rem] flex items-center justify-center relative shadow-2xl"
                    >
                        <div className="absolute inset-0 rounded-[2.5rem] md:rounded-[4rem] border-4 border-dashed border-brand-pink animate-spin-slow opacity-20"></div>
                        {/* Actual Logo Video  - Cropped to Rounded Rectangle */}
                        <div className="w-[92%] h-[88%] rounded-[2rem] md:rounded-[3rem] overflow-hidden flex items-center justify-center relative z-10 bg-brand-yellow">
                            <video
                                src="/hero-video.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover mix-blend-multiply"
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
