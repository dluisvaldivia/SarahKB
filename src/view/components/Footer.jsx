import React from 'react';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

export default function Footer() {
    const { t } = useTranslation();

    return (
        <>
            <footer className="row text-white justify-content-center">
                <div className="text-center py-3">




                    <Link to="/privacy-policy" id="footerlink">{t('footer.privacyPolicy')}</Link>
                    <br />
                    <Link to="/terms-of-service" id="footerlink">{t('footer.termsOfService')}</Link>
                    <br />
                    <Link to="/accessibility-statement" id="footerlink">{t('footer.accessibilityStatement')}</Link>
                    <br />
                    <small>
                        {t('footer.developedBy')} <a href='https://github.com/dluisvaldivia' target='blank' id="footerlink">ValdiviaMedia</a> &copy; {t('footer.allRightsReserved')}
                    </small>
                </div>
            </footer>
        </>

    )

}