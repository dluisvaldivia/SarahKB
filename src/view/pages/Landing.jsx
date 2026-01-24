import React from 'react';
import Hero from '../components/Hero.jsx';
import Contact from './Contact.jsx';
import MyStory from './MyStory.jsx';
import Calendly from '../components/Calendly.jsx';
import WhoIsFor from '../pages/WhoIsFor.jsx';

export default function Landing() {

    return (
        <div className="container mt-5">
            <div className="row d-flex text-start">

                <div className="mb-5 py-5 comic-panel tilt-left">
                    <Hero />
                </div>
                <div id="my-story" className="mb-5 py-5 comic-panel tilt-right">
                    <MyStory />
                </div>
                <div className="mb-5 py-5 comic-panel tilt-left">
                    <WhoIsFor />
                </div>
                <div id="calendly-section" className="mb-5 py-5 comic-panel tilt-right burst-bg">
                    <Calendly />
                </div>
                <div id="contact-section" className="mb-5 py-5 comic-panel tilt-left">
                    <Contact />
                </div>


            </div>

        </div>

    )
}