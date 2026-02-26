import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function LeadCapturePopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [phone, setPhone] = useState('');
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isVisible && popupRef.current) {
            gsap.fromTo(popupRef.current,
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
            );
        }
    }, [isVisible]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here we would typically send this to a backend/CRM
        console.log('Lead captured:', phone);
        handleClose();
        alert('Thank you for joining!');
    };

    const handleClose = () => {
        if (popupRef.current) {
            gsap.to(popupRef.current, {
                y: 100,
                opacity: 0,
                duration: 0.5,
                ease: 'power3.in',
                onComplete: () => setIsVisible(false)
            });
        }
    };

    if (!isVisible) return null;

    return (
        <div
            ref={popupRef}
            className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-[100] bg-white rounded-2xl shadow-2xl p-6 border-2 border-brand-pink/20 max-w-sm w-full"
        >
            <button
                onClick={handleClose}
                className="absolute top-3 right-3 text-gray-400 hover:text-brand-pink transition-colors focus-visible:outline-none focus-visible:text-brand-pink"
                aria-label="Close popup"
            >
                ✕
            </button>
            <h3 className="text-xl font-bold text-brand-brown mb-2 font-heading">Join our community</h3>
            <p className="text-sm text-brand-brown/70 mb-4 font-medium">
                Be the first to know about exclusive updates and new flavors.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter Phone Number..."
                    className="w-full px-4 py-3 rounded-xl border-2 border-brand-pink/20 focus:border-brand-pink focus:ring-4 focus:ring-brand-pink/20 outline-none transition-all text-brand-brown font-medium placeholder:text-brand-brown/40"
                    required
                    pattern="[0-9]{10}"
                    title="Please enter a 10 digit phone number"
                />
                <button
                    type="submit"
                    className="w-full bg-brand-pink text-white font-bold py-3 rounded-xl shadow-brand active:scale-95 transition-all outline-none focus-visible:ring-4 focus-visible:ring-brand-pink/50 hover:bg-brand-brown"
                >
                    Join Now
                </button>
            </form>
        </div>
    );
}
