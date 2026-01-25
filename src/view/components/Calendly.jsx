import React from 'react';

export default function Calendly() {
    return (
        <div className="container text-center py-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h2 className="display-4 mb-4">Schedule a Free Call</h2>
                    <p className="lead mb-4">
                        Let's chat about how ADHD coaching can help you create a life that works with your brain.
                    </p>

                    {/* Calendly inline widget - Direct Iframe for immediate loading */}
                    <div style={{
                        minWidth: '320px',
                        height: '1100px',
                        border: '4px solid black',
                        boxShadow: '8px 8px 0px black',
                        overflow: 'hidden'
                    }}>
                        <iframe
                            src="https://calendly.com/sarahbuendia/curiosity-call"
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            title="Select a Date & Time - Calendly"
                        ></iframe>
                    </div>


                </div>
            </div>
        </div>
    );
}
