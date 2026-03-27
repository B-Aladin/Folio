"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

const navItems = [
    { label: "Library", href: "/" },
    { label: "Add New", href: "/books/new" },
];

const Navbar = () => {
    const pathName = usePathname();
    const { user, isSignedIn } = useUser();
    const [lightboxOpen, setLightboxOpen] = useState(false);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setLightboxOpen(false);
        };
        if (lightboxOpen) window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [lightboxOpen]);

    useEffect(() => {
        document.body.style.overflow = lightboxOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [lightboxOpen]);

    return (
        <>
            <header className="w-full fixed z-50 bg-[var(--bg-primary)] shadow-soft-sm">
                <div className="wrapper justify-between items-center navbar-height py-4 flex mt-2">
                    {/* Logo */}
                    <div className="flex gap-0.5 items-center">
                        <button
                            onClick={() => setLightboxOpen(true)}
                            className="group active:scale-95 transition-transform duration-150 cursor-zoom-in"
                            aria-label="View logo"
                        >
                            <Image
                                src="/assets/logom.png"
                                alt="folio"
                                width={145}
                                height={100}
                                priority
                                className="object-contain w-[100px] sm:w-[120px] md:w-[145px] h-auto
                                           group-hover:opacity-80 group-active:opacity-60 transition-opacity duration-150"
                            />
                        </button>
                        <Link
                            href="/"
                            className="logo-text hover:opacity-70 active:scale-95 transition-all duration-150"
                        >
                            Folio
                        </Link>
                    </div>

                    {/* Nav Links + Auth */}
                    <nav className="w-fit flex gap-7 items-center">
                        {navItems.map(({ label, href }) => {
                            const isActive =
                                pathName === href ||
                                (href !== "/" && pathName.startsWith(href));

                            return (
                                <Link
                                    href={href}
                                    key={label}
                                    className={cn(
                                        "nav-link-base active:scale-95 transition-all duration-150",
                                        isActive ? "nav-link-active" : "text-black hover:opacity-70"
                                    )}
                                >
                                    {label}
                                </Link>
                            );
                        })}

                        {/* Auth — mutually exclusive */}
                        {!isSignedIn ? (
                            <SignInButton mode="modal">
                                <button className="btn-primary !px-4 !py-2 !text-base">
                                    Sign In
                                </button>
                            </SignInButton>
                        ) : (
                            <div className="flex items-center gap-3">
                                <UserButton />
                                {user?.firstName && (
                                    <Link href="/subscriptions" className="nav-user-name">
                                        {user.firstName}
                                    </Link>
                                )}
                            </div>
                        )}
                    </nav>
                </div>
            </header>

            {/* Lightbox Overlay */}
            {lightboxOpen && (
                <div
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={() => setLightboxOpen(false)}
                >
                    <div
                        className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <span className="text-white/70 text-sm font-medium">logom.png</span>
                        <button
                            onClick={() => setLightboxOpen(false)}
                            className="text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                            aria-label="Close"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div
                        className="relative max-w-[90vw] max-h-[80vh] animate-in zoom-in-75 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src="/assets/logom.png"
                            alt="folio logo"
                            width={600}
                            height={400}
                            className="object-contain max-h-[80vh] w-auto rounded-lg"
                        />
                    </div>

                    <p className="absolute bottom-6 text-white/50 text-sm">
                        Press <kbd className="bg-white/10 px-2 py-0.5 rounded text-white/70">Esc</kbd> or click outside to close
                    </p>
                </div>
            )}
        </>
    );
};

export default Navbar;