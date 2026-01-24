import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { IoChatbubblesOutline } from "react-icons/io5";
import { CiVideoOn } from "react-icons/ci";
import { useTranslation } from 'react-i18next';

export default function Hero() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <main>
            <div className="container py-5" >
                <div className="row d-flex text-start"
                    style={{
                        position: 'relative',
                    }}
                >
                    <div className="col">
                        <h1 style={{ fontSize: '6.5rem' }}>{t('hero.title_part1')}<strong>{t('hero.title_part2')}</strong>{t('hero.title_part3')}</h1>
                        <h2 style={{ fontSize: '3rem' }}>{t('hero.subtitle')}</h2>
                        <p className='col-9 mt-4' style={{ fontSize: '1.5rem' }}>{t('hero.description')}</p>
                        <button className='btn-secondary mt-2 me-5' onClick={() => document.getElementById('contact-section').scrollIntoView({ behavior: 'smooth' })}>{t('hero.btnChat')} <IoChatbubblesOutline />
                        </button>
                        <button className='btn-primary mt-4' onClick={() => document.getElementById('calendly-section').scrollIntoView({ behavior: 'smooth' })}>{t('hero.btnSchedule')} <CiVideoOn />
                        </button>
                        <div className='col-5 col-md-4 py-3 mt-4'>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}