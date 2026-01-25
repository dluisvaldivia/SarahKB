import React, { useState, useEffect } from 'react';
import '../../styles/comic-style.scss'; // Ensure styles are available

export default function TabsBoxCustom({ tabs, defaultTab, activeTabProp }) {
    // If activeTabProp is provided (controlled component), use it, otherwise use local state
    // If activeTabProp is provided, we sync to it, but we primarily use local state for rendering
    // to allow clicking tabs even if the parent doesn't update the prop immediately (semi-controlled).
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

    // Handler for tab click
    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    // If activeTabProp changes (external control like URL change), sync local state
    useEffect(() => {
        if (activeTabProp !== undefined) {
            setActiveTab(activeTabProp);
        }
    }, [activeTabProp]);

    return (
        <div className="w-100">
            {/* Tabs Header - Wrapping enabled for mobile */}
            <div className="d-flex flex-wrap gap-2 mb-0" role="tablist" style={{ marginLeft: '1rem' }}>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        role="tab"
                        aria-selected={activeTab === tab.id}
                        className={`btn ${activeTab === tab.id ? 'comic-btn-primary' : 'btn-outline-dark bg-white'} flex-grow-1 flex-md-grow-0 py-2 px-4`}
                        style={{
                            borderRadius: '0',
                            borderWidth: '4px',
                            fontWeight: 'bold',
                            position: 'relative',
                            marginBottom: '-4px', // Overlap border exactly
                            zIndex: activeTab === tab.id ? 3 : 1, // Higher z-index for active
                            borderBottom: activeTab === tab.id ? '4px solid transparent' : '4px solid black', // "Remove" bottom border visually by making it match background or be transparent? 
                            // Actually, to make it look connected, we usually hide the bottom border. 
                            // But since we use background colors, transparency might show the underlying element.
                            // Better trick: Use the same background color as the panel (white/variable) and cover the panel's border?
                            // Or simpler: The comic-btn-primary has a background color. content panel also has a background color? 
                            // Content panel is .comic-panel which has standard background.
                        }}
                        onClick={() => handleTabClick(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Box */}
            <div className="comic-panel mt-0" style={{
                position: 'relative',
                zIndex: 2,
                backgroundColor: 'var(--panel-bg)', // Ensure opaque formatting
                minHeight: '200px'
            }}>
                <div className="p-3">
                    {tabs.find(t => t.id === activeTab)?.content}
                </div>
            </div>
        </div>
    );
}
