export default function Footer() {
    return (
        <footer className="bg-brand-brown text-brand-yellow py-12 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 text-center sm:text-left">

                {/* Brand Info */}
                <div className="col-span-1 sm:col-span-2">
                    <h2 className="font-heading text-4xl text-brand-pink mb-4">Be Chill</h2>
                    <p className="max-w-xs mx-auto sm:mx-0 text-brand-yellow/80">
                        Happy scoops & the perfect chill spot. Where every visit feels like a good day.
                    </p>
                    <p className="mt-4 text-sm font-bold opacity-70">
                        Kolar Road, Hoskote, Bangalore | ... more
                    </p>
                </div>

                {/* Quick Links */}
                {/* Explore & Social */}
                <div>
                    <h3 className="font-bold text-xl mb-4 text-white">Links</h3>
                    <ul className="space-y-2 opacity-80 mb-6">
                        <li><a href="#" className="inline-block hover:text-brand-pink transition-colors focus-visible:outline-none focus-visible:text-brand-pink">Menu</a></li>
                        <li><a href="#" className="inline-block hover:text-brand-pink transition-colors focus-visible:outline-none focus-visible:text-brand-pink">Our Story</a></li>
                        <li><a href="#" className="inline-block hover:text-brand-pink transition-colors focus-visible:outline-none focus-visible:text-brand-pink">Locations</a></li>
                        <li>
                            <a
                                href="https://www.instagram.com/bechill_sundae?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block hover:text-brand-pink transition-colors"
                            >
                                Instagram
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Join the Club */}
                <div>
                    <h3 className="font-bold text-xl mb-4 text-white">Join the Chill Club</h3>
                    <p className="text-sm opacity-80 mb-4">Get exclusive updates and offers sent directly to your phone.</p>
                    <form className="flex flex-col gap-2" onSubmit={(e) => { e.preventDefault(); alert('Subscribed successfully!'); }}>
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/50 outline-none transition-all"
                            required
                            pattern="[0-9]{10}"
                            title="10 digit phone number"
                        />
                        <button
                            type="submit"
                            className="w-full bg-brand-pink text-white font-bold py-2 rounded-lg hover:bg-white hover:text-brand-pink transition-colors outline-none focus-visible:ring-2 focus-visible:ring-white"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            <div className="mt-12 pt-8 border-t border-brand-yellow/20 text-center text-sm opacity-50">
                © {new Date().getFullYear()} Be Chill. All rights reserved.
            </div>
        </footer>
    )
}
