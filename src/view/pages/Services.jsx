import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TabsBoxCustom from '../components/TabsBoxCustom';

export default function Services() {
    const location = useLocation();
    const [defaultTab, setDefaultTab] = useState('individuals');

    // Extract 'tab' query parameter
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const tab = searchParams.get('tab');
        if (tab) {
            setDefaultTab(tab);
        }
    }, [location.search]);

    const servicesData = [
        {
            id: 'individuals',
            label: 'Individuals',
            content: (
                <div>
                    <h2>Services for Individuals</h2>
                    <p>
                        We offer personalized coaching and support for individuals with ADHD.
                        Whether you are looking to improve your productivity, manage your emotions,
                        or simply understand your brain better, we are here to help.
                    </p>
                    <p>
                        Our approach is strengths-based and neurodiversity-affirming.
                    </p>
                </div>
            )
        },
        {
            id: 'parents',
            label: 'Parents',
            content: (
                <div>
                    <h2>Services for Parents</h2>
                    <p>
                        Parenting a child with ADHD can be challenging, but also incredibly rewarding.
                        We provide guidance, strategies, and emotional support to help you advocate for your child
                        and build a strong, positive relationship.
                    </p>
                </div>
            )
        },
        {
            id: 'organizations',
            label: 'Organizations',
            content: (
                <div>
                    <h2>Services for Organizations</h2>
                    <p>
                        We help organizations create neuroinclusive environments where everyone can thrive.
                        From workshops and training to policy consultation, we support businesses in harnessing the unique strengths of neurodivergent talent.
                    </p>
                </div>
            )
        }
    ];

    return (
        <main className="container mt-5 pt-5 mb-5">
            <h1 className="text-center mb-5">Our Services</h1>
            {/* Pass activeTabProp to control the tab from URL updates */}
            <TabsBoxCustom tabs={servicesData} activeTabProp={defaultTab} />
        </main>
    );
}
