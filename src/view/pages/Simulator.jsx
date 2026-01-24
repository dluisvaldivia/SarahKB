import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/comic-style.scss';

// Intrusive thoughts database
const THOUGHTS = [
    "Did I lock the door?", "Check Noah's benefit status", "Email the school",
    "Is that a bird?", "I need water", "What was I doing?",
    "Blue is a nice color", "Did I pay the bill?", "Hungry...",
    "Look at that font!", "My back hurts", "Google 'penguins'"
];

const Simulator = () => {
    const navigate = useNavigate();
    const [hyperfocus, setHyperfocus] = useState(false);
    const [thoughts, setThoughts] = useState([]);
    const containerRef = useRef(null);
    const sectionsRef = useRef([]);

    // --- 1. Vanishing Focus (Intersection Observer) ---
    useEffect(() => {
        if (hyperfocus) return;

        const observerOptions = {
            root: null,
            threshold: 0.6 // Trigger when 60% visible
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const target = entry.target;
                if (entry.isIntersecting) {
                    target.style.filter = 'blur(0px)';
                    target.style.opacity = '1';
                } else {
                    target.style.filter = 'blur(4px)';
                    target.style.opacity = '0.3';
                }
            });
        }, observerOptions);

        sectionsRef.current.forEach(section => {
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, [hyperfocus]);


    // --- 2. Intrusive Thoughts (Mouse Move) ---
    useEffect(() => {
        if (hyperfocus) return;

        const handleMouseMove = (e) => {
            // Chance to spawn a thought (lower chance to avoid chaos)
            if (Math.random() > 0.92) {
                const id = Date.now();
                const text = THOUGHTS[Math.floor(Math.random() * THOUGHTS.length)];

                // Add thought
                setThoughts(prev => [...prev, {
                    id, text,
                    x: e.clientX + (Math.random() * 50 - 25),
                    y: e.clientY + (Math.random() * 50 - 25)
                }]);

                // Remove after timeout
                setTimeout(() => {
                    setThoughts(prev => prev.filter(t => t.id !== id));
                }, 2000);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [hyperfocus]);


    // --- 3. Dopamine Friction (Scroll Interception) ---
    // Note: Intercepting 'wheel' is aggressive. We'll use a lighter touch:
    // We will just modify the scroll behavior visually or use a very careful handler.
    // For this prototype/simulator nature, we will try the direct approach but handle it carefully.
    useEffect(() => {
        if (hyperfocus) return;

        const handleWheel = (e) => {
            // Simple friction logic:
            // Check what section we are over?
            // Actually, let's just use global "friction" based on where we are.
            // Finding the element under the center of the viewport?

            // Simplified: Boring sections have class 'sim-boring', Shiny 'sim-shiny'
            // We can't easily know which one is "active" for the scroll event without heavy calculation.
            // Let's rely on the DOM structure.

            // Alternative: Simply apply a multiplier to the default scroll? 
            // We can't change the default scroll amount. We have to preventDefault and scroll manually.

            // To be safe and accessible, let's SKIP full scroll hijacking and instead use
            // CSS 'scroll-behavior' or visual cues, OR implement it only if user confirms.
            // Given the user request explicit "intercept scroll wheel", I will try it for the experience.

            e.preventDefault();

            // Determine multiplier based on active element or general area
            // We'll roughly guess based on scroll position context or just randomize "friction" slightly
            // to simulate "inconsistent" focus.

            // Let's find if we are in a "boring" section.
            // Heuristic: Are we in the lower half of the page? (Just for demo)
            // Better: Let's assume standard friction (0.5x) normally (distracted), 
            // and acceleration (1.5x) on "shiny" things.

            let multiplier = 1;
            const centerEl = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
            if (centerEl && centerEl.closest('.sim-boring')) {
                multiplier = 0.3; // Very slow/heavy
            } else if (centerEl && centerEl.closest('.sim-shiny')) {
                multiplier = 2.5; // Zoom past
            } else {
                multiplier = 0.8; // Default slightly distracted
            }

            window.scrollBy({
                top: e.deltaY * multiplier,
                behavior: 'auto'
            });
        };

        // Passive: false to allow preventDefault
        window.addEventListener('wheel', handleWheel, { passive: false });
        return () => window.removeEventListener('wheel', handleWheel);
    }, [hyperfocus]);


    // Styles Helper
    const containerStyle = hyperfocus ? {
        filter: 'brightness(1.1) contrast(1.1)',
        overflowY: 'auto' // Restoration of normal scroll
    } : {
        cursor: 'wait' // Hint at the friction?
    };

    return (
        <div
            ref={containerRef}
            className={`container-fluid ${hyperfocus ? 'bg-dark text-white' : 'bg-light'}`}
            style={{
                minHeight: '100vh',
                position: 'relative',
                transition: 'background 0.5s',
                ...containerStyle
            }}
        >

            {/* Intrusive Thoughts Layer */}
            {!hyperfocus && thoughts.map(t => (
                <div key={t.id} style={{
                    position: 'fixed',
                    left: t.x, top: t.y,
                    pointerEvents: 'none',
                    opacity: 0.7,
                    zIndex: 9999,
                    animation: 'floatUp 2s ease-out forwards',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.2rem',
                    color: '#ff6b6b',
                    fontWeight: 'bold',
                    textShadow: '2px 2px 0px white'
                }}>
                    {t.text}
                </div>
            ))}

            <style>
                {`
                @keyframes floatUp {
                    0% { transform: translateY(0) scale(1); opacity: 0.8; }
                    100% { transform: translateY(-100px) scale(1.1); opacity: 0; }
                }
                .sim-section {
                    min-height: 80vh;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    transition: filter 0.5s, opacity 0.5s, transform 0.5s;
                    padding: 2rem;
                }
                .sim-text {
                    max-width: 600px;
                    font-size: 1.25rem;
                    line-height: 1.8;
                }
                `}
            </style>

            {/* Hyperfocus Toggle */}
            <div className="fixed-top p-3 d-flex justify-content-end pointer-events-none">
                <button
                    className={`btn btn-lg ${hyperfocus ? 'btn-outline-info' : 'comic-btn-primary'}`}
                    onClick={() => setHyperfocus(!hyperfocus)}
                    style={{ pointerEvents: 'auto', zIndex: 10000 }}
                >
                    {hyperfocus ? 'DISABLE HYPERFOCUS' : 'ACTIVATE HYPERFOCUS'}
                </button>
            </div>

            {/* Section 1: The Ferrari Engine */}
            <div
                ref={el => sectionsRef.current[0] = el}
                className="sim-section sim-shiny"
            >
                <div className="comic-panel tilt-left p-5 text-center">
                    <h1 className="display-1" style={{ fontFamily: 'var(--font-heading)' }}>The Ferrari Engine</h1>
                    <p className="lead">You have a race car engine...</p>
                    <h2 className="text-danger mt-3 mb-3">BUT BICYCLE BRAKES!</h2>
                    <p>Welcome to the ADHD Simulator. Scroll down to experience the ride.</p>
                </div>
            </div>

            {/* Section 2: The Bicycle Brakes (Boring) */}
            <div
                ref={el => sectionsRef.current[1] = el}
                className="sim-section sim-boring"
            >
                <div className="card border-0 bg-transparent">
                    <div className="card-body">
                        <h2 className="mb-4">The Wall of Text</h2>
                        <div className="sim-text text-muted">
                            <p>Here is a very mundane task. Imagine this is a tax form, or a long email from HR, or the instructions for a board game you don't really want to play. Notice how your scroll wheel feels heavy? That's the friction. Your brain refuses to supply the dopamine needed to process this low-stimulation information.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                            <p>Are you skimming this? Of course you are. It's painful to read word for word. Why is the scroll so slow? Why can't we just skip to the fun part?</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 3: The 30 Tabs (Overload) */}
            <div
                ref={el => sectionsRef.current[2] = el}
                className="sim-section sim-shiny"
            >
                <h2 className="display-3 mb-5">OOH! SHINY!</h2>
                <div className="row g-4 rotate-container">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="col-md-4">
                            <div
                                className="comic-panel p-4"
                                style={{
                                    transform: `rotate(${Math.random() * 10 - 5}deg)`,
                                    backgroundColor: ['#ff9ff3', '#feca57', '#54a0ff', '#5f27cd', '#ff6b6b', '#48dbfb'][i]
                                }}
                            >
                                <h4>Tab #{i + 1}</h4>
                                <p>Did you know penguins utilize projectile poo?</p>
                                <button className="btn btn-sm btn-dark w-100">Read More</button>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="mt-5 lead">Did you feel the scroll speed up? Your brain loves this. It's easy, it's colorful, it's irrelevant.</p>
            </div>

            {/* Section 4: The Superpower */}
            <div
                ref={el => sectionsRef.current[3] = el}
                className="sim-section"
            >
                <div className={`p-5 rounded ${hyperfocus ? 'border border-info shadow-lg' : ''}`}>
                    <h2 className="display-4">Lateral Thinking</h2>
                    <p className="sim-text">
                        But it's not all chaos. When the stars align, or the deadline is 5 minutes away, or you find something *truly* fascinating...
                    </p>
                    <p className="sim-text">
                        <strong>Hyperfocus kicks in.</strong><br />
                        The friction disappears. The background noise fades. You become a machine.
                    </p>
                    {!hyperfocus && (
                        <p className="mt-4 text-center">
                            <em>Try the "ACTIVATE HYPERFOCUS" button at the top right to see what clarity feels like.</em>
                        </p>
                    )}
                </div>
            </div>

            <div className="text-center pb-5 mb-5">
                <button className="btn btn-outline-dark" onClick={() => navigate('/')}>Exit Simulation</button>
            </div>

        </div>
    );
};

export default Simulator;
