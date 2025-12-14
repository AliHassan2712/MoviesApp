"use client";

export default function Hero() {

    return (
        <section className="relative w-full margin-bottom">
            <div className="relative w-full h-[60vh] md:h-screen lg:h-[85vh]">
                <img
                    src={'../assets/images/img_hero.jpg'}
                    alt="Hero background"
                    className="w-full h-full object-cover object-center absolute inset-0"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/40" aria-hidden="true" />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50" />


                <div className="absolute inset-0 flex px-6 md:px-12 py-12">
                    <div className="max-w-4xl text-white">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-md">
                            Discover, Watch, and Share Your Favorite Movies
                        </h1>
                        <p className="mt-4 text-sm sm:text-base md:text-lg text-white/90 max-w-3xl">
                            Explore thousands of movies and TV shows, get personalized recommendations, and keep track of what you love. Stream seamlessly and stay updated with the latest releases.
                        </p>


                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                            <button className="px-6 py-3 rounded-2xl bg-white text-black font-semibold shadow-lg hover:shadow-xl transition-colors duration-500 hover:bg-gray-200">
                                Get Started
                            </button>


                            <button className="px-6 py-3 rounded-2xl border border-white/30 text-white font-medium backdrop-blur-sm transition-colors duration-500 hover:bg-white/10 hover:text-gray-200">
                                Browse Movies
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )

}
