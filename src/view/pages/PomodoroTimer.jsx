import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import '../../styles/comic-style.scss';

const PomodoroTimer = () => {
    // Timers configuration in minutes
    const [timers, setTimers] = useState({
        work: 25,
        shortBreak: 5,
        longBreak: 15
    });

    const [activeMode, setActiveMode] = useState('work'); // 'work', 'shortBreak', 'longBreak'
    const [timeLeft, setTimeLeft] = useState(timers.work * 60);
    const [isActive, setIsActive] = useState(false);

    const svgRef = useRef(null);
    const containerRef = useRef(null);

    // Update timeLeft whenever mode or specific timer duration changes (if not active)
    useEffect(() => {
        if (!isActive) {
            setTimeLeft(timers[activeMode] * 60);
        }
    }, [timers, activeMode]);

    // Timer Interval
    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft => timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            // Optional: Play sound or notification here
            alert("Time's up!");
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    // D3 Visualization
    useEffect(() => {
        if (!containerRef.current) return;

        const renderTimer = () => {
            const container = containerRef.current;
            const width = Math.min(container.clientWidth, 400);
            const height = width;
            const radius = width / 2;

            d3.select(svgRef.current).selectAll("*").remove();

            const svg = d3.select(svgRef.current)
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", `translate(${width / 2},${height / 2})`);

            // Total time for current mode to calculate percentage
            const totalTime = timers[activeMode] * 60;
            const percentage = timeLeft / totalTime;

            // Background Arc (Gray ring)
            const arcBg = d3.arc()
                .innerRadius(radius - 20)
                .outerRadius(radius)
                .startAngle(0)
                .endAngle(2 * Math.PI);

            svg.append("path")
                .attr("d", arcBg)
                .attr("fill", "#e0e0e0");

            // Foreground Arc (Progress)
            const arcFg = d3.arc()
                .innerRadius(radius - 20)
                .outerRadius(radius)
                .startAngle(0)
                .endAngle(2 * Math.PI * percentage)
                .cornerRadius(10);

            // Color based on mode
            const color = activeMode === 'work' ? '#ff6b6b' : (activeMode === 'shortBreak' ? '#4ecdc4' : '#45b7d1');

            svg.append("path")
                .attr("d", arcFg)
                .attr("fill", color)
                .style("transition", "d 0.5s linear");

            // Text
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            svg.append("text")
                .text(formattedTime)
                .attr("text-anchor", "middle")
                .attr("dy", "0.35em")
                .style("font-size", "3rem")
                .style("font-family", "var(--font-heading)")
                .style("fill", "var(--text-color)");

            // Mode Label
            svg.append("text")
                .text(activeMode === 'work' ? 'FOCUS' : (activeMode === 'shortBreak' ? 'SHORT BREAK' : 'LONG BREAK'))
                .attr("text-anchor", "middle")
                .attr("dy", "2.5em")
                .style("font-size", "1rem")
                .style("font-family", "var(--font-body)")
                .style("fill", "#888")
                .style("text-transform", "uppercase");
        };

        renderTimer();

        window.addEventListener('resize', renderTimer);
        return () => window.removeEventListener('resize', renderTimer);

    }, [timeLeft, timers, activeMode]);


    const toggleTimer = () => setIsActive(!isActive);

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(timers[activeMode] * 60);
    };

    const handleModeChange = (mode) => {
        setIsActive(false);
        setActiveMode(mode);
        // useEffect will update timeLeft
    };

    const handleDurationChange = (e, mode) => {
        const val = parseInt(e.target.value);
        if (val > 0) {
            setTimers(prev => ({ ...prev, [mode]: val }));
        }
    };

    return (
        <div className="container mt-5 pt-5 mb-5 pb-5">
            <div className="comic-panel d-flex flex-column align-items-center">
                <h1 className="display-4 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Pomodoro Timer</h1>

                {/* D3 Timer Container */}
                <div ref={containerRef} className="mb-4" style={{ width: '100%', maxWidth: '400px', height: 'auto', display: 'flex', justifyContent: 'center' }}>
                    <svg ref={svgRef}></svg>
                </div>

                {/* Controls */}
                <div className="d-flex gap-3 mb-5">
                    <button className={`btn btn-lg ${isActive ? 'btn-outline-warning' : 'comic-btn-primary'}`} onClick={toggleTimer}>
                        {isActive ? 'PAUSE' : 'START'}
                    </button>
                    <button className="btn btn-lg btn-outline-dark" onClick={resetTimer}>
                        RESET
                    </button>
                </div>

                {/* Mode Selectors & Config */}
                <div className="row w-100 justify-content-center">
                    <div className="col-md-8">
                        <div className="card border-3 border-dark">
                            <div className="card-body">
                                <h5 className="card-title text-center mb-3">Settings</h5>
                                <div className="row g-3">
                                    <div className="col-4 text-center">
                                        <label className="form-label">Work</label>
                                        <div className="input-group">
                                            <input
                                                type="number"
                                                className="form-control border-dark text-center"
                                                value={timers.work}
                                                onChange={(e) => handleDurationChange(e, 'work')}
                                                min="1"
                                            />
                                        </div>
                                        <button
                                            className={`btn btn-sm mt-2 w-100 ${activeMode === 'work' ? 'comic-btn-primary' : 'btn-outline-secondary'}`}
                                            onClick={() => handleModeChange('work')}
                                        >
                                            Select
                                        </button>
                                    </div>
                                    <div className="col-4 text-center">
                                        <label className="form-label">Short Break</label>
                                        <div className="input-group">
                                            <input
                                                type="number"
                                                className="form-control border-dark text-center"
                                                value={timers.shortBreak}
                                                onChange={(e) => handleDurationChange(e, 'shortBreak')}
                                                min="1"
                                            />
                                        </div>
                                        <button
                                            className={`btn btn-sm mt-2 w-100 ${activeMode === 'shortBreak' ? 'comic-btn-primary' : 'btn-outline-secondary'}`}
                                            onClick={() => handleModeChange('shortBreak')}
                                        >
                                            Select
                                        </button>
                                    </div>
                                    <div className="col-4 text-center">
                                        <label className="form-label">Long Break</label>
                                        <div className="input-group">
                                            <input
                                                type="number"
                                                className="form-control border-dark text-center"
                                                value={timers.longBreak}
                                                onChange={(e) => handleDurationChange(e, 'longBreak')}
                                                min="1"
                                            />
                                        </div>
                                        <button
                                            className={`btn btn-sm mt-2 w-100 ${activeMode === 'longBreak' ? 'comic-btn-primary' : 'btn-outline-secondary'}`}
                                            onClick={() => handleModeChange('longBreak')}
                                        >
                                            Select
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PomodoroTimer;
