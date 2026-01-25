import { useTranslation } from 'react-i18next';
import TabsBoxCustom from '../components/TabsBoxCustom.jsx';

export default function AboutMe() {
    const { t } = useTranslation();

    const toolsTabsData = [
        {
            id: 'clean',
            label: 'Clean Language',
            content: (
                <div>
                    <h4>Clean Language</h4>
                    <p>Clean Language is a questioning technique that helps clients explore their own metaphors and mental models without contamination from the coach's assumptions. It respects the client's unique inner world and facilitates deep self-discovery.</p>
                </div>
            )
        },
        {
            id: 'strength',
            label: 'Strength Based Approach',
            content: (
                <div>
                    <h4>Strength Based Approach</h4>
                    <p>This approach focuses on identifying and leveraging your existing strengths, talents, and resources. Instead of fixing what's "wrong", we build on what's strong to overcome challenges and achieve your goals with greater ease and confidence.</p>
                </div>
            )
        },
        {
            id: 'polyvagal',
            label: 'Polyvagal Theory',
            content: (
                <div>
                    <h4>Polyvagal Theory</h4>
                    <p>Polyvagal Theory helps us understand the nervous system's response to stress and safety. By mapping your autonomic states (fight/flight, freeze, social engagement), we can develop tools to regulate your nervous system and move out of survival mode.</p>
                </div>
            )
        }
    ];

    return (
        <main>
            <div className="container pb-5 mb-5">
                <div className="row align-items-center">
                    {/* Text Column */}
                    <div className="col-12">
                        <h1 className="mb-4">About Me</h1>
                        <p>Hi, I'm a software developer with a passion for creating innovative and user-friendly applications. I have a strong background in programming and a deep understanding of the latest technologies. I am always looking for new challenges and opportunities to learn and grow.</p>
                        <h2 className="mb-4">Who I Work With</h2>
                        <p className="lead">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <p>
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>

                        <h2 className="mt-5 mb-4">Tools I Use</h2>
                        <TabsBoxCustom tabs={toolsTabsData} />
                    </div>
                </div>
            </div>
        </main>
    );
}