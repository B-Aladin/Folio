'use client'
import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const HeroSection = () => {
    const cardRef = useRef(null)
    const imgRef = useRef(null)

    // Mouse-tracking radial glow on card
    useEffect(() => {
        const card = cardRef.current
        if (!card) return
        const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect()
            const x = ((e.clientX - rect.left) / rect.width) * 100
            const y = ((e.clientY - rect.top) / rect.height) * 100
            card.style.setProperty('--mouse-x', `${x}%`)
            card.style.setProperty('--mouse-y', `${y}%`)
        }
        card.addEventListener('mousemove', handleMouseMove)
        return () => card.removeEventListener('mousemove', handleMouseMove)
    }, [])

    // Subtle parallax on illustration
    useEffect(() => {
        const card = cardRef.current
        const img = imgRef.current
        if (!card || !img) return
        const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect()
            const dx = (e.clientX - (rect.left + rect.width / 2)) / rect.width
            const dy = (e.clientY - (rect.top + rect.height / 2)) / rect.height
            img.style.transform = `translate(${dx * -10}px, ${dy * -10}px) scale(1.03)`
        }
        const handleMouseLeave = () => {
            img.style.transform = 'translate(0,0) scale(1)'
        }
        card.addEventListener('mousemove', handleMouseMove)
        card.addEventListener('mouseleave', handleMouseLeave)
        return () => {
            card.removeEventListener('mousemove', handleMouseMove)
            card.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [])

    return (
        <>
            <style>{`
                /* Scoped inside .lh-enhanced — all original classes preserved,
                   only override sizing/layout issues + layer in dynamics        */

                .lh-enhanced .library-hero-card {
                    --mouse-x: 50%;
                    --mouse-y: 50%;
                    position: relative;
                    overflow: hidden;
                    border-radius: clamp(16px, 2vw, 24px);
                    padding: clamp(1.5rem, 3vw, 2.75rem);
                    transition: box-shadow 0.3s ease;
                }

                /* Cursor-following glow — sits on top of existing bg */
                .lh-enhanced .library-hero-card::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(
                        480px circle at var(--mouse-x) var(--mouse-y),
                        rgba(255,255,255,0.07),
                        transparent 60%
                    );
                    pointer-events: none;
                    border-radius: inherit;
                    z-index: 0;
                }

                .lh-enhanced .library-hero-content {
                    position: relative;
                    z-index: 1;
                    display: flex;
                    align-items: center;
                    gap: clamp(0.75rem, 2vw, 2rem);
                }

                /* ── Left text ── */
                .lh-enhanced .library-hero-text {
                    flex: 1;
                    min-width: 0;
                    animation: lhFadeUp 0.55s cubic-bezier(0.22,1,0.36,1) both;
                }

                /* Small "live" badge above title */
                .lh-live-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.4rem;
                    padding: 0.25rem 0.65rem;
                    border-radius: 100px;
                    background: rgba(255,255,255,0.12);
                    border: 1px solid rgba(255,255,255,0.2);
                    font-size: clamp(0.6rem, 0.8vw, 0.68rem);
                    font-weight: 600;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.7);
                    margin-bottom: clamp(0.4rem, 0.8vw, 0.65rem);
                    backdrop-filter: blur(4px);
                }

                .lh-live-dot {
                    width: 5px;
                    height: 5px;
                    border-radius: 50%;
                    background: #6ee7a0;
                    box-shadow: 0 0 5px #6ee7a0;
                    animation: lhPulse 2s ease-in-out infinite;
                }

                @keyframes lhPulse {
                    0%, 100% { opacity: 1; }
                    50%       { opacity: 0.35; }
                }

                .lh-enhanced .library-hero-title {
                    font-size: clamp(1.65rem, 3vw, 2.75rem) !important;
                    line-height: 1.1 !important;
                    margin-bottom: clamp(0.4rem, 0.8vw, 0.65rem) !important;
                }

                .lh-enhanced .library-hero-description {
                    font-size: clamp(0.8rem, 1.1vw, 0.93rem) !important;
                    line-height: 1.65 !important;
                }

                /* CTA — shimmer sweep on hover */
                .lh-enhanced .library-cta-primary {
                    display: inline-flex !important;
                    width: fit-content !important;
                    align-items: center !important;
                    gap: 0.5rem !important;
                    border-radius: 100px !important;
                    padding: clamp(0.5rem, 1vw, 0.7rem) clamp(0.9rem, 1.8vw, 1.35rem) !important;
                    font-size: clamp(0.78rem, 1.05vw, 0.88rem) !important;
                    position: relative;
                    overflow: hidden;
                    transition: transform 0.2s ease, box-shadow 0.2s ease !important;
                }

                .lh-enhanced .library-cta-primary::before {
                    content: '';
                    position: absolute;
                    top: 0; left: -100%;
                    width: 55%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent);
                    transform: skewX(-20deg);
                }

                .lh-enhanced .library-cta-primary:hover::before {
                    left: 160%;
                    transition: left 0.5s ease;
                }

                .lh-enhanced .library-cta-primary:hover {
                    transform: translateY(-2px) !important;
                    box-shadow: 0 8px 22px rgba(0,0,0,0.18) !important;
                }

                .lh-enhanced .library-cta-primary:active {
                    transform: translateY(0) !important;
                }

                /* ── Center illustration ── */
                .lh-enhanced .library-hero-illustration-desktop {
                    position: relative;
                    flex-shrink: 0;
                    animation: lhFadeIn 0.7s 0.15s cubic-bezier(0.22,1,0.36,1) both;
                }

                /* Ambient glow behind it */
                .lh-enhanced .library-hero-illustration-desktop::before {
                    content: '';
                    position: absolute;
                    inset: -12%;
                    background: radial-gradient(circle, rgba(255,255,255,0.11) 0%, transparent 65%);
                    border-radius: 50%;
                    animation: lhGlow 4s ease-in-out infinite;
                    pointer-events: none;
                }

                @keyframes lhGlow {
                    0%, 100% { transform: scale(1);    opacity: 0.6; }
                    50%       { transform: scale(1.09); opacity: 1; }
                }

                .lh-illustration-img {
                    transition: transform 0.35s cubic-bezier(0.22,1,0.36,1) !important;
                    filter: drop-shadow(0 10px 26px rgba(0,0,0,0.16));
                    /* clamp-based width — the root of the 100% zoom overflow */
                    width: clamp(150px, 18vw, 320px) !important;
                    height: auto !important;
                }

                /* ── Steps card ── */
                .lh-enhanced .library-steps-card {
                    /* Replace fixed px widths with clamp */
                    min-width: clamp(200px, 17vw, 262px) !important;
                    max-width: clamp(220px, 19vw, 282px) !important;
                    border-radius: clamp(12px, 1.5vw, 18px) !important;
                    padding: clamp(1rem, 1.6vw, 1.45rem) !important;
                    position: relative;
                    overflow: hidden;
                    animation: lhFadeLeft 0.55s 0.1s cubic-bezier(0.22,1,0.36,1) both;
                }

                /* Top shimmer edge */
                .lh-enhanced .library-steps-card::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 12%; right: 12%;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
                }

                .lh-enhanced .library-step-item {
                    display: flex;
                    align-items: flex-start;
                    gap: clamp(0.55rem, 0.9vw, 0.8rem) !important;
                    padding: 0.3rem 0.3rem 0.3rem 0.2rem;
                    border-radius: 10px;
                    transition: background 0.2s ease, padding-left 0.2s ease;
                    cursor: default;
                }

                .lh-enhanced .library-step-item:hover {
                    background: rgba(255,255,255,0.05);
                    padding-left: 0.45rem;
                }

                /* Number circles — clamp sizes */
                .lh-enhanced .library-step-item > div:first-child {
                    width:  clamp(32px, 2.8vw, 40px) !important;
                    height: clamp(32px, 2.8vw, 40px) !important;
                    min-width:  clamp(32px, 2.8vw, 40px) !important;
                    min-height: clamp(32px, 2.8vw, 40px) !important;
                    font-size: clamp(0.82rem, 1.05vw, 1rem) !important;
                    transition: background 0.2s, border-color 0.2s !important;
                    flex-shrink: 0;
                }

                .lh-enhanced .library-step-item:hover > div:first-child {
                    background: rgba(255,255,255,0.14) !important;
                    border-color: rgba(255,255,255,0.45) !important;
                }

                .lh-enhanced .library-step-title {
                    font-size: clamp(0.76rem, 1vw, 0.87rem) !important;
                }

                .lh-enhanced .library-step-description {
                    font-size: clamp(0.68rem, 0.86vw, 0.77rem) !important;
                }

                /* ── Keyframes ── */
                @keyframes lhFadeUp {
                    from { opacity: 0; transform: translateY(16px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                @keyframes lhFadeLeft {
                    from { opacity: 0; transform: translateX(14px); }
                    to   { opacity: 1; transform: translateX(0); }
                }

                @keyframes lhFadeIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to   { opacity: 1; transform: scale(1); }
                }

                /* ── Responsive ── */
                @media (max-width: 860px) {
                    .lh-enhanced .library-steps-card {
                        min-width: unset !important;
                        max-width: unset !important;
                    }
                }
            `}</style>

            <section className="wrapper mb-10 md:mb-16 lh-enhanced">
                <div className="library-hero-card" ref={cardRef}>
                    <div className="library-hero-content">

                        {/* Left Part */}
                        <div className="library-hero-text">
                            <div className="lh-live-badge">
                                <span className="lh-live-dot" />
                                AI-powered
                            </div>
                            <h1 className="library-hero-title text-4xl font-serif font-bold">Your Library</h1>
                            <p className="library-hero-description">
                                Convert your books into interactive AI conversations. <br className="hidden md:block" />
                                Listen, learn, and discuss your favorite reads.
                            </p>
                            <Link href="/books/new" className="library-cta-primary mt-4 flex items-center justify-center">
                                <span className="text-3xl font-light mb-1 mr-2">+</span>
                                <span className="text-[#212a3b]">Add new book</span>
                            </Link>
                        </div>

                        {/* Center Part - Desktop */}
                        <div className="library-hero-illustration-desktop">
                            <Image
                                ref={imgRef}
                                src="/assets/hero-illustration.png"
                                alt="Vintage books and a globe"
                                width={320}
                                height={320}
                                className="object-contain lh-illustration-img"
                                priority
                            />
                        </div>

                        {/* Center Part - Mobile */}
                        <div className="library-hero-illustration">
                            <Image
                                src="/assets/hero-illustration.png"
                                alt="Vintage books and a globe"
                                width={300}
                                height={300}
                                className="object-contain"
                            />
                        </div>

                        {/* Right Part */}
                        <div className="library-steps-card min-w-[260px] max-w-[280px] z-10 shadow-soft-md">
                            <ul className="space-y-6">
                                <li className="library-step-item">
                                    <div className="w-10 h-10 min-w-10 min-h-10 rounded-full border border-gray-300 flex items-center justify-center font-medium text-lg">1</div>
                                    <div className="flex flex-col">
                                        <h3 className="library-step-title text-lg font-bold">Upload PDF</h3>
                                        <p className="library-step-description text-gray-500">Add your book file</p>
                                    </div>
                                </li>
                                <li className="library-step-item">
                                    <div className="w-10 h-10 min-w-10 min-h-10 rounded-full border border-gray-300 flex items-center justify-center font-medium text-lg">2</div>
                                    <div className="flex flex-col">
                                        <h3 className="library-step-title text-lg font-bold">AI Processing</h3>
                                        <p className="library-step-description text-gray-500">We analyze the content</p>
                                    </div>
                                </li>
                                <li className="library-step-item">
                                    <div className="w-10 h-10 min-w-10 min-h-10 rounded-full border border-gray-300 flex items-center justify-center font-medium text-lg">3</div>
                                    <div className="flex flex-col">
                                        <h3 className="library-step-title text-lg font-bold">Voice Chat</h3>
                                        <p className="library-step-description text-gray-500">Discuss with AI</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default HeroSection