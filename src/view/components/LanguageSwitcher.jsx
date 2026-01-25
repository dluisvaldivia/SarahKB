import React from 'react';
import { useTranslation } from 'react-i18next';

// SVG Flag Components
const FlagEN = () => (
    <svg width="20" height="15" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="30" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFF" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" clipPath="url(#clip)" />
        <path d="M30,0 V30 M0,15 H60" stroke="#FFF" strokeWidth="10" />
        <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
);

const FlagES = () => (
    <svg width="20" height="15" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="30" fill="#AA151B" />
        <rect y="7.5" width="60" height="15" fill="#F1BF00" />
    </svg>
);

const FlagFR = () => (
    <svg width="20" height="15" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
        <rect width="20" height="30" fill="#002395" />
        <rect x="20" width="20" height="30" fill="#FFFFFF" />
        <rect x="40" width="20" height="30" fill="#ED2939" />
    </svg>
);

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const languages = [
        { code: 'en', name: 'English', Flag: FlagEN },
        { code: 'es', name: 'Español', Flag: FlagES },
        { code: 'fr', name: 'Français', Flag: FlagFR }
    ];

    const changeLanguage = (languageCode) => {
        i18n.changeLanguage(languageCode);
    };

    const currentLang = languages.find(lang => lang.code === i18n.language) || languages[0];

    return (
        <div className="dropdown">
            <button
                className="btn btn-outline-dark btn-sm dropdown-toggle"
                type="button"
                id="languageDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '1rem',
                    borderWidth: '3px',
                    borderRadius: '0',
                    padding: '1.2rem 1rem',
                    boxShadow: '3px 3px 0px black'
                }}
            >
                <span style={{ display: 'flex', alignItems: 'center' }}>
                    <currentLang.Flag />
                </span>
                <span className="d-none d-md-inline">
                    {currentLang.name}
                </span>
            </button>
            <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="languageDropdown"
                style={{
                    borderRadius: '0',
                    border: '3px solid black',
                    boxShadow: '4px 4px 0px black'
                }}
            >
                {languages.map((language) => (
                    <li key={language.code}>
                        <button
                            className={`dropdown-item ${i18n.language === language.code ? 'active' : ''}`}
                            onClick={() => changeLanguage(language.code)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                fontSize: '1rem',
                                padding: '0.5rem 1rem'
                            }}
                        >
                            <span style={{ display: 'flex', alignItems: 'center', width: '24px' }}>
                                <language.Flag />
                            </span>
                            <span>{language.name}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
