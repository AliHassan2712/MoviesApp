"use client";
// Next
import Link from "next/link";

// guest route wrapper for auth hub page
import GuestRoute from "@/components/auth/GuestRoute";

// assets
import bgImg from "@/pages/auth/login/assets/imgs/background.png";

// paths constant
import { PATHS } from "@/constant/PATHS";

//component 
import AuthBackground from "@/components/ui/AuthBackground";
import SocialButtons from "@/components/ui/SocialButtons";


export default function AuthHubPage() {
    return (
        <GuestRoute>
            <div className="relative min-h-screen flex items-center justify-center bg-main">

                <AuthBackground image={bgImg} />

                <div className="relative z-10 w-[90%] max-w-lg bg-card p-10 rounded-xl border border-main shadow-xl">
                    <h1 className="text-4xl font-extrabold text-center text-primary tracking-wide mb-4">
                        Welcome to MoviesApp 🎬
                    </h1>

                    <p className="text-center text-text-soft text-lg mb-8">
                        Explore unlimited Movies and Series. Start your journey!
                    </p>

                    <div className="flex flex-col gap-4">
                        <Link
                            href={PATHS.LOGIN}
                            className="w-full text-center btn-primary py-3 rounded-lg font-semibold shadow hover:shadow-lg transition"
                        >
                            Login
                        </Link>

                        <Link
                            href={PATHS.SIGNUP}
                            className="w-full text-center py-3 rounded-lg font-semibold bg-white/10 border border-main hover:bg-white/20 transition"
                        >
                            Create Account
                        </Link>
                    </div>

                    <div className="mt-6 text-center space-y-2">
                        <Link href={PATHS.FORGOT_PASSWORD} className="text-primary hover:underline">
                            Forgot password?
                        </Link>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center my-8">
                        <div className="flex-1 h-px bg-main"></div>
                        <span className="px-3 text-text-soft">OR</span>
                        <div className="flex-1 h-px bg-main"></div>
                    </div>

                    {/* Social Buttons */}
                    <SocialButtons />

                </div>
            </div>
        </GuestRoute>
    );
}
