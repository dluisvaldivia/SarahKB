import { useTranslation } from 'react-i18next';

export default function MyStory() {
    const { t } = useTranslation();

    return (
        <main>
            <div className="container pb-5 mb-5">
                <div className="row align-items-center">
                    {/* Text Column */}
                    <div className="col-12">
                        <p style={{ fontSize: '2rem' }}><b>{t('myStory.greeting')}</b></p>
                        <p>{t('myStory.intro')}</p>
                        <p dangerouslySetInnerHTML={{ __html: t('myStory.role') }}></p>

                        <p>{t('myStory.diagnosis')}</p>

                        <p><em>{t('myStory.honesty')}</em></p>

                        <p>{t('myStory.mission')}</p>

                    </div>
                </div>
            </div>
        </main>
    );
}