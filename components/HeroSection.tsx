'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const HeroSection = () => {
    const [overlayOpen, setOverlayOpen] = useState(false)

    const openOverlay = useCallback(() => setOverlayOpen(true), [])
    const closeOverlay = useCallback(() => setOverlayOpen(false), [])

    // Close on Escape key
    useEffect(() => {
        if (!overlayOpen) return
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeOverlay() }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [overlayOpen, closeOverlay])

    // Lock body scroll when overlay is open
    useEffect(() => {
        document.body.style.overflow = overlayOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [overlayOpen])

    return (
        <>
            <section className="wrapper mb-10 md:mb-16">
                <div className="library-hero-card relative overflow-hidden">

                    {/* Decorative rings */}
                    <div aria-hidden="true" className="pointer-events-none absolute -top-16 -left-16 w-56 h-56 rounded-full border border-[#212a3b]/8 opacity-60" />
                    <div aria-hidden="true" className="pointer-events-none absolute -top-8 -left-8 w-32 h-32 rounded-full border border-[#212a3b]/10 opacity-50" />
                    <div aria-hidden="true" className="pointer-events-none absolute -bottom-12 -right-12 w-44 h-44 rounded-full border border-[#212a3b]/6 opacity-40" />

                    <div className="library-hero-content">

                        {/* ── Left Part ── */}
                        <div className="library-hero-text animate-fade-in-up">
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-[#212a3b]/50 mb-3 select-none">
                                <span className="w-4 h-px bg-[#212a3b]/30" />
                                Your reading companion
                            </span>

                            <h1 className="library-hero-title text-4xl font-serif font-bold leading-tight">
                                Your Library
                            </h1>

                            <p className="library-hero-description mt-3 leading-relaxed">
                                Convert your books into interactive AI conversations.{' '}
                                <br className="hidden md:block" />
                                Listen, learn, and discuss your favorite reads.
                            </p>

                            <Link
                                href="/books/new"
                                className="library-cta-primary mt-6 flex items-center justify-center gap-2 group transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <span className="text-2xl font-light leading-none transition-transform duration-200 group-hover:rotate-90">+</span>
                                <span className="text-[#212a3b] font-medium">Add new book</span>
                            </Link>
                        </div>

                        {/* ── Center Part - Desktop ── */}
                        <div className="library-hero-illustration-desktop relative animate-fade-in flex-shrink-0">
                            <div aria-hidden="true" className="absolute inset-0 rounded-full bg-[#212a3b]/[0.04] blur-2xl scale-90 translate-y-4" />
                            <button
                                type="button"
                                onClick={openOverlay}
                                aria-label="View illustration full size"
                                className="relative z-10 block cursor-zoom-in rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#212a3b]/30 group"
                            >
                                <Image
                                    src="/assets/hero-illustrationm.png"
                                    alt="Vintage books and a globe"
                                    width={400}
                                    height={600}
                                    className="object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-[1.02]"
                                    style={{ width: 'clamp(280px, 32vw, 820px)', height: 'auto' }}
                                    priority
                                />
                                {/* Zoom hint badge */}
                                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-[#212a3b]/70 text-white text-[10px] font-medium tracking-wide px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity duration-200 backdrop-blur-sm">
                                    Click to zoom
                                </span>
                            </button>
                        </div>

                        {/* ── Center Part - Mobile ── */}
                        <div className="library-hero-illustration relative animate-fade-in">
                            <button
                                type="button"
                                onClick={openOverlay}
                                aria-label="View illustration full size"
                                className="cursor-zoom-in rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#212a3b]/30 block"
                            >
                                <Image
                                    src="/assets/hero-illustrationm.png"
                                    alt="Vintage books and a globe"
                                    width={280}
                                    height={280}
                                    className="object-contain w-full h-auto max-w-[420px]"
                                    priority
                                />
                            </button>
                        </div>

                        {/* ── Right Part — Steps Card ── */}
                        <div className="library-steps-card min-w-[240px] max-w-[270px] z-10 shadow-soft-md animate-fade-in-up animation-delay-150 flex-shrink-0">
                            <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#212a3b]/40 mb-5 select-none">
                                How it works
                            </p>

                            <ul className="space-y-6">
                                {[
                                    { step: '1', title: 'Upload PDF', desc: 'Add your book file' },
                                    { step: '2', title: 'AI Processing', desc: 'We analyze the content' },
                                    { step: '3', title: 'Voice Chat', desc: 'Discuss with AI' },
                                ].map(({ step, title, desc }, i) => (
                                    <li key={step} className="library-step-item group relative" style={{ animationDelay: `${i * 80}ms` }}>
                                        <div className="w-10 h-10 min-w-10 min-h-10 rounded-full border border-gray-300 flex items-center justify-center font-medium text-lg transition-colors duration-200 group-hover:border-[#212a3b]/40 group-hover:bg-[#212a3b]/[0.04]">
                                            {step}
                                        </div>
                                        <div className="flex flex-col">
                                            <h3 className="library-step-title text-lg font-bold leading-snug">{title}</h3>
                                            <p className="library-step-description text-gray-500 text-sm mt-0.5">{desc}</p>
                                        </div>
                                        {i < 2 && (
                                            <span aria-hidden="true" className="absolute left-5 top-10 w-px h-6 bg-gray-200 -translate-x-1/2" />
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>
            </section>

            {/* ── Image Overlay (Google-style lightbox) ── */}
            {overlayOpen && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label="Illustration preview"
                    onClick={closeOverlay}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0,0,0,0.80)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        animation: 'heroOverlayIn 0.18s ease',
                    }}
                >
                    <style>{`
                        @keyframes heroOverlayIn {
                            from { opacity: 0; }
                            to   { opacity: 1; }
                        }
                        @keyframes heroImgIn {
                            from { opacity: 0; transform: scale(0.93); }
                            to   { opacity: 1; transform: scale(1); }
                        }
                    `}</style>

                    {/* Image wrapper — click inside doesn't close */}
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            animation: 'heroImgIn 0.22s cubic-bezier(0.2,0,0,1)',
                        }}
                    >
                        {/* Close button */}
                        <button
                            type="button"
                            onClick={closeOverlay}
                            aria-label="Close preview"
                            style={{
                                position: 'absolute',
                                top: '-14px',
                                right: '-14px',
                                zIndex: 10,
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                background: 'rgba(255,255,255,0.15)',
                                border: '1px solid rgba(255,255,255,0.25)',
                                color: '#fff',
                                fontSize: '20px',
                                lineHeight: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                backdropFilter: 'blur(4px)',
                                transition: 'background 0.15s',
                            }}
                            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.28)')}
                            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
                        >
                            ×
                        </button>

                        <Image
                            src="/assets/hero-illustrationm.png"
                            alt="Vintage books and a globe — full size"
                            width={700}
                            height={700}
                            style={{
                                maxWidth: 'min(700px, 82vw)',
                                maxHeight: '82vh',
                                width: 'auto',
                                height: 'auto',
                                objectFit: 'contain',
                                borderRadius: '16px',
                                boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
                            }}
                            priority
                        />

                        {/* Dismiss hint */}
                        <p style={{
                            position: 'absolute',
                            bottom: '-28px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            color: 'rgba(255,255,255,0.35)',
                            fontSize: '11px',
                            whiteSpace: 'nowrap',
                            userSelect: 'none',
                        }}>
                            Click outside or press Esc to close
                        </p>
                    </div>
                </div>
            )}
        </>
    )
}

export default HeroSection