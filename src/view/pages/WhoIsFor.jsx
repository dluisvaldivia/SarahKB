import React from 'react';
import { useTranslation } from 'react-i18next';

export default function WhoIsFor() {
    const { t } = useTranslation();

    return (
        <div className="container ">
            <div className="row">
                <div className="col-10 mx-auto mb-5">
                    <h1>{t('whoIsFor.title')}</h1>
                    <p>{t('whoIsFor.intro')}</p>

                    <ul>
                        <li>{t('whoIsFor.audience1')}</li>
                        <li>{t('whoIsFor.audience2')}</li>
                        <li>{t('whoIsFor.audience3')}</li>
                        <li>{t('whoIsFor.audience4')}</li>
                    </ul>

                    <p>{t('whoIsFor.conclusion')}</p>

                    <p>{t('whoIsFor.ready')}</p>

                    <ul>
                        <li>{t('whoIsFor.goal1')}</li>
                        <li>{t('whoIsFor.goal2')}</li>
                        <li>{t('whoIsFor.goal3')}</li>
                        <li>{t('whoIsFor.goal4')}</li>
                    </ul>

                </div>
            </div>
        </div>
    )

}