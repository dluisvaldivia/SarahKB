import React from 'react';
import { useTranslation } from 'react-i18next'; // Assuming i18n is set up based on file list
import '../../styles/global.scss'; // Ensure global styles are loaded

const Maintenance = () => {
    // Fallback if useTranslation isn't fully ready, though file list showed i18n.js
    const { t } = useTranslation();

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div className="bg-halftone"></div>

            <div className="container">
                <div className="comic-panel text-center" style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'var(--panel-bg)' }}>
                    <h1 className="display-4 fw-bold mb-4" style={{
                        textTransform: 'uppercase',
                        transform: 'rotate(-2deg)',
                        textShadow: '4px 4px 0px #000'
                    }}>
                        🚧 Site Under Maintenance 🚧
                    </h1>

                    <div className="mb-4">
                        <p className="lead fw-bold mb-3" style={{ fontSize: '1.5rem' }}>
                            Oops! Our squirrels are taking a designated nap break.
                        </p>
                        <p className="mb-4">
                            We're currently tidying up the chaos and making things shinier.
                            Please check back in a little while!
                        </p>
                    </div>

                    <div className="p-4 mb-4" style={{
                        border: '3px solid black',
                        backgroundColor: '#fff',
                        boxShadow: '6px 6px 0px rgba(0,0,0,0.2)',
                        transform: 'rotate(1deg)'
                    }}>
                        <h3 className="h4 fw-bold">While you wait...</h3>
                        <p className="mb-0">Did you know? Switching tasks can sometimes help reset your focus! (Like we are doing right now!)</p>
                    </div>

                    <div className="mt-4">
                        <p className="small text-muted fw-bold">
                            Estimated time: Until the squirrels wake up.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Maintenance;
