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

                    {/* Calendly inline widget */}
                    <div
                        className="calendly-inline-widget"
                        data-url="https://calendly.com/sarahbuendia/curiosity-call"
                        style={{
                            minWidth: '320px',
                            height: '700px',
                            border: '4px solid black',
                            boxShadow: '8px 8px 0px black'
                        }}
                    ></div>

                    <script
                        type="text/javascript"
                        src="https://assets.calendly.com/assets/external/widget.js"
                        async
                    ></script>
                </div>
            </div>
        </div>
    );
}
