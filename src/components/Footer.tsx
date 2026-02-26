import { useState } from 'react';

export default function Footer() {
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
                body: JSON.stringify({ phone, source: 'Footer Form' }),
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8',
                }
            });

            setMessage('Subscribed successfully!');
            setPhone('');
            setTimeout(() => setMessage(''), 5000);
        } catch (error) {
            console.error('Fetch error:', error);
            setMessage(`Error: ${error instanceof Error ? error.message : String(error)}`);
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <footer className="bg-brand-brown text-brand-yellow section-padding relative overflow-hidden">
            {/* Background Decorative */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-pink to-transparent opacity-30"></div>

            <div className="container-chill relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20">

                    {/* Brand Info */}
                    <div className="md:col-span-5 text-center md:text-left">
                        <h2 className="text-brand-pink mb-6 uppercase tracking-tighter">Be Chill</h2>
                        <p className="max-w-md mx-auto md:mx-0 text-brand-yellow/80 text-lg md:text-xl font-medium leading-relaxed mb-8">
                            Happy scoops & the perfect chill spot. Where every visit feels like a good day. Handcrafted happiness in every bite.
                        </p>
                        <div className="flex items-center justify-center md:justify-start gap-4 text-brand-pink font-black uppercase tracking-widest text-xs">
                            <span className="w-12 h-1 bg-brand-pink/30 rounded-full"></span>
                            Est. 2024
                            <span className="w-12 h-1 bg-brand-pink/30 rounded-full"></span>
                        </div>
                    </div>

                    {/* Join the Club */}
                    <div className="md:col-span-4 text-center md:text-left order-first md:order-none">
                        <h3 className="text-white text-2xl font-black mb-6 uppercase tracking-wider">Join the Chill Club</h3>
                        <p className="text-brand-yellow/70 font-medium mb-6 text-balance">Get exclusive updates and secret menu offers sent directly to your phone.</p>
                        <form className="flex flex-col gap-4 max-w-sm mx-auto md:mx-0" onSubmit={handleSubmit}>
                            <div className="relative group">
                                <input
                                    type="tel"
                                    id="footer-phone-input"
                                    name="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Enter mobile..."
                                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border-2 border-white/10 text-white placeholder:text-white/30 focus:border-brand-pink focus:ring-4 focus:ring-brand-pink/10 outline-none transition-all disabled:opacity-50 font-bold"
                                    required
                                    pattern="[0-9]{10}"
                                    title="10 digit phone number"
                                    disabled={isSubmitting}
                                />
                                <div className="absolute inset-0 rounded-2xl border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-brand-pink text-white font-black py-4 rounded-2xl hover:bg-white hover:text-brand-pink hover:scale-[1.02] active:scale-95 transition-all shadow-brand outline-none focus:ring-4 focus:ring-white/40 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Joining...' : 'Join Now'}
                            </button>
                        </form>
                        {message && (
                            <p className="text-sm font-black text-brand-pink mt-4 animate-in fade-in slide-in-from-top-2">{message}</p>
                        )}
                    </div>

                    {/* Quick Links */}
                    <div className="md:col-span-3 text-center md:text-right">
                        <h3 className="text-white text-2xl font-black mb-6 uppercase tracking-wider">Explore</h3>
                        <nav>
                            <ul className="space-y-4 font-bold text-lg">
                                <li><a href="#flavors" className="hover:text-brand-pink transition-colors">Sundaes</a></li>
                                <li><a href="#about" className="hover:text-brand-pink transition-colors">Our Story</a></li>
                                <li><a href="#location" className="hover:text-brand-pink transition-colors">Locations</a></li>
                                <li>
                                    <a
                                        href="https://www.instagram.com/bechill_sundae?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-brand-pink hover:text-white transition-colors flex items-center justify-center md:justify-end gap-2"
                                    >
                                        Instagram <span className="text-xl">↗</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>

                </div>

                <div className="mt-20 pt-10 border-t-2 border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-brand-yellow/40 font-bold text-xs uppercase tracking-[0.3em]">
                        © {new Date().getFullYear()} Be Chill Parlor • Kolar
                    </p>
                    <div className="flex gap-8 text-brand-yellow/30 font-black text-[10px] uppercase tracking-widest">
                        <span className="hover:text-brand-pink cursor-pointer transition-colors">Privacy</span>
                        <span className="hover:text-brand-pink cursor-pointer transition-colors">Terms</span>
                        <span className="hover:text-brand-pink cursor-pointer transition-colors">Accessibility</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
