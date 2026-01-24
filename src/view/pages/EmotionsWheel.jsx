
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { emotionsData, emotionColors } from '../../data/emotions';
import '../../styles/comic-style.scss';

const EmotionsWheel = () => {
    const svgRef = useRef(null);
    const containerRef = useRef(null);
    const [selectedEmotions, setSelectedEmotions] = useState([]);

    // Toggle emotion selection
    const toggleEmotion = (emotionName) => {
        setSelectedEmotions(prev => {
            if (prev.includes(emotionName)) {
                return prev.filter(e => e !== emotionName);
            } else {
                return [...prev, emotionName];
            }
        });
    };

    // Save logs to localStorage
    const handleLogEmotions = () => {
        if (selectedEmotions.length === 0) return;

        const newLog = {
            id: Date.now(),
            date: new Date().toISOString(),
            emotions: selectedEmotions
        };

        const existingLogs = JSON.parse(localStorage.getItem('emotionLogs') || '[]');
        const updatedLogs = [...existingLogs, newLog];
        localStorage.setItem('emotionLogs', JSON.stringify(updatedLogs));

        alert('Emotions logged successfully!');
        setSelectedEmotions([]); // Clear selection after logging
    };

    useEffect(() => {
        if (!containerRef.current) return;

        const renderWheel = () => {
            const container = containerRef.current;
            const width = Math.min(container.clientWidth, 800);
            const radius = width / 2;

            d3.select(svgRef.current).selectAll("*").remove();

            const svg = d3.select(svgRef.current)
                .attr("width", width)
                .attr("height", width)
                .style("font", "12px sans-serif");

            const g = svg.append("g")
                .attr("transform", `translate(${width / 2},${width / 2})`);

            const root = d3.hierarchy(emotionsData).count();
            const partition = d3.partition().size([2 * Math.PI, radius]);

            partition(root);

            // Calculate the radius of the root node (which is invisible/skipped)
            // We want to shift everything inwards by this amount so L1 starts at 0
            const rootRadius = root.y1;
            const radiusScale = d3.scaleLinear()
                .domain([rootRadius, radius])
                .range([0, radius]);

            const arc = d3.arc()
                .startAngle(d => d.x0)
                .endAngle(d => d.x1)
                .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
                .padRadius(radius / 2)
                .innerRadius(d => Math.max(0, radiusScale(d.y0)))
                .outerRadius(d => Math.max(0, radiusScale(d.y1)) - 1);

            const getColor = (d) => {
                let current = d;
                while (current.depth > 1) current = current.parent;
                if (current.depth === 1) {
                    return emotionColors[current.data.name] || "#ccc";
                }
                return "#fff";
            };

            const paths = g.append("g")
                .selectAll("path")
                .data(root.descendants().slice(1))
                .join("path")
                .attr("fill", d => getColor(d))
                .attr("fill-opacity", d => 1 - (d.depth * 0.05))
                .attr("d", arc)
                .style("cursor", "pointer")
                .style("transition", "transform 0.2s ease-out, fill 0.2s")
                .style("transform-box", "fill-box")
                .style("transform-origin", "center")
                .attr("class", "emotion-segment") // Add class for selection
                .attr("id", d => `segment-${d.data.name.replace(/\s+/g, '-')}`) // ID for easier selection if needed
                .on("click", (event, d) => {
                    toggleEmotion(d.data.name);
                })
                .on("mouseenter", function (event, d) {
                    // Only apply hover effect if NOT selected
                    // We check React state inside D3? No, closure might be stale.
                    // Better to let the separate useEffect handle specific "selected" styles
                    // But for hover, we want immediate feedback.
                    // We can check class or attribute.
                    d3.select(this)
                        .raise()
                        .transition().duration(200)
                        .attr("transform", "scale(1.05)")
                        .attr("fill", d => d3.color(getColor(d)).brighter(0.3));
                })
                .on("mouseleave", function (event, d) {
                    // Revert to normal OR selected state.
                    // This is tricky without access to live state.
                    // Simpler approach: On mouseleave, trigger a re-evaluation of styles via a function that knows state?
                    // OR: Just reset to base and let the selection-effect (below) re-apply "selected" style immediately?
                    const isSelected = d3.select(this).classed("selected");

                    d3.select(this)
                        .transition().duration(200)
                        .attr("transform", isSelected ? "scale(0.95)" : "scale(1)")
                        .attr("fill", d => {
                            const c = d3.color(getColor(d));
                            return isSelected ? c.darker(0.2) : c;
                        });
                });

            // Text
            g.append("g")
                .attr("pointer-events", "none")
                .attr("text-anchor", "middle")
                .style("user-select", "none")
                .selectAll("text")
                .data(root.descendants().slice(1).filter(d => d.y1 - d.y0 > 10))
                .join("text")
                .attr("transform", function (d) {
                    const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
                    const y = (Math.max(0, radiusScale(d.y0)) + Math.max(0, radiusScale(d.y1))) / 2;
                    return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
                })
                .attr("dy", "0.35em")
                .style("fill", "white")
                .style("font-size", d => d.depth === 1 ? "14px" : "10px")
                .style("font-weight", "bold")
                .text(d => d.data.name);
        };

        renderWheel();

        const handleResize = () => {
            renderWheel();
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Run once on mount

    // Separate effect to handle selection updates efficiently without re-rendering the whole wheel
    useEffect(() => {
        if (!svgRef.current) return;

        const svg = d3.select(svgRef.current);
        const segments = svg.selectAll(".emotion-segment");

        segments.each(function (d) {
            const el = d3.select(this);
            const isSelected = selectedEmotions.includes(d.data.name);

            el.classed("selected", isSelected); // Mark class

            // Apply visual state
            // If selected: pressed look (scale down, darker)
            // If not selected: normal look (scale 1, normal color) -> Note: Mouseleave handles reset too
            // We use transition to animate it

            const baseColor = (() => {
                let current = d;
                while (current.depth > 1) current = current.parent;
                if (current.depth === 1) return emotionColors[current.data.name] || "#ccc";
                return "#fff";
            })();

            if (isSelected) {
                el.transition().duration(200)
                    .attr("transform", "scale(0.95)")
                    .attr("fill", d3.color(baseColor).darker(0.2));
            } else {
                // Only reset if NOT hovered? 
                // Actually, if we just toggled it off, we might want it to return to normal
                el.transition().duration(200)
                    .attr("transform", "scale(1)")
                    .attr("fill", baseColor);
            }
        });

    }, [selectedEmotions]);


    return (
        <div className="container-fluid bg-light p-4 pt-5 mt-5 pb-5">
            <h1 className="mb-4 display-4 text-center" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-color)' }}>Emotions Wheel</h1>

            <div className="row justify-content-center">

                {/* Wheel Column */}
                <div className="col-12 col-lg-8 d-flex justify-content-center mb-4 mb-lg-0">
                    <div ref={containerRef} style={{ width: '100%', maxWidth: '800px', display: 'flex', justifyContent: 'center' }}>
                        <svg ref={svgRef}></svg>
                    </div>
                </div>

                {/* Selection Box Column */}
                <div className="col-12 col-lg-4">
                    <div className="comic-panel p-4 h-100 d-flex flex-column">
                        <h3 className="mb-3 text-center">Selected Emotions</h3>

                        {selectedEmotions.length === 0 ? (
                            <p className="text-muted text-center flex-grow-1">Tap sections on the wheel to add them here.</p>
                        ) : (
                            <div className="flex-grow-1 overflow-auto mb-3" style={{ maxHeight: '400px' }}>
                                <ul className="list-group list-group-flush">
                                    {selectedEmotions.map(emotion => (
                                        <li key={emotion} className="list-group-item d-flex justify-content-between align-items-center bg-transparent">
                                            <span className="lead">{emotion}</span>
                                            <button
                                                className="btn btn-sm btn-outline-danger rounded-circle"
                                                onClick={() => toggleEmotion(emotion)}
                                                aria-label="Remove"
                                            >
                                                &times;
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="mt-auto">
                            <p className="text-end text-muted small">{selectedEmotions.length} selected</p>
                            <button
                                className="btn comic-btn-primary w-100"
                                onClick={handleLogEmotions}
                                disabled={selectedEmotions.length === 0}
                            >
                                Log Emotions
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default EmotionsWheel;
