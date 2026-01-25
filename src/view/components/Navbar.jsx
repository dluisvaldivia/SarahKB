import React, { useState, useRef, useEffect } from 'react';
import { IoChatbubblesOutline, IoHappyOutline, IoClipboardOutline, IoHourglassOutline } from "react-icons/io5";
import { IoMdContacts } from "react-icons/io";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { MdApps } from "react-icons/md";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import thatsveryadhd from '../../assests/thatsveryadhd_transparent.png';
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(true);
  const navbarRef = useRef(null);
  const toggleRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Handle closing the navbar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target) && !toggleRef.current.contains(event.target)) {
        setCollapsed(true);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleCollapseToggle = () => {
    setCollapsed(!collapsed);
  };

  const handleLinkClick = () => {
    if (!collapsed) {
      setCollapsed(true);
    }
  };

  const handleNavClick = (sectionId) => {
    handleLinkClick();
    if (location.pathname === '/') {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg" id="navbar1" ref={navbarRef}>

      <Link to='/'><img src={thatsveryadhd} alt="Thats very adhd logo" className="navbar-brand ms-5 me-0" id="logo" target='/' /></Link>

      <button
        className="navbar-toggler"
        type="button"
        onClick={handleCollapseToggle}
        aria-controls="navbarNavDropdown"
        aria-expanded={!collapsed}
        aria-label="Toggle navigation"
        ref={toggleRef}>
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className={`collapse navbar-collapse ${!collapsed ? 'show' : ''}`} id="navbarNavDropdown">
        <ul className="navbar-nav icon-spacing ms-3">
          <li className="nav-item">
            <Link
              to="/"
              className="nav-link text-center"
              onClick={(e) => { e.preventDefault(); handleNavClick('contact-section'); }}
            >
              <IoMdContacts className="nav-icon" />
              <br />
              <span className="nav-text">{t('nav.contact')}</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/"
              className="nav-link text-center"
              onClick={(e) => { e.preventDefault(); handleNavClick('calendly-section'); }}
            >
              <RiCalendarScheduleLine className="nav-icon" />
              <br />
              <span className="nav-text">{t('nav.schedule')}</span>
            </Link>
          </li>

          {/* Services Dropdown */}
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle text-center"
              href="#"
              id="servicesDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <MdApps className="nav-icon" /> {/* Using MdApps as placeholder or find another icon like IoBriefcaseOutline if available, but staying safe with existing imports or adding new one */}
              <br />
              <span className="nav-text">Services</span>
            </a>
            <ul className="dropdown-menu" aria-labelledby="servicesDropdown" style={{ borderRadius: '0', border: '3px solid black', boxShadow: '4px 4px 0px black' }}>
              <li>
                <Link
                  to="/services?tab=individuals"
                  className="dropdown-item"
                  onClick={handleLinkClick}
                >
                  Individuals
                </Link>
              </li>
              <li>
                <Link
                  to="/services?tab=parents"
                  className="dropdown-item"
                  onClick={handleLinkClick}
                >
                  Parents
                </Link>
              </li>
              <li>
                <Link
                  to="/services?tab=organizations"
                  className="dropdown-item"
                  onClick={handleLinkClick}
                >
                  Organizations
                </Link>
              </li>
            </ul>
          </li>

          {/* Free Tools Dropdown */}
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle text-center"
              href="#"
              id="freeToolsDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <MdApps className="nav-icon" />
              <br />
              <span className="nav-text">Free Tools</span>
            </a>
            <ul className="dropdown-menu" aria-labelledby="freeToolsDropdown" style={{ borderRadius: '0', border: '3px solid black', boxShadow: '4px 4px 0px black' }}>
              <li>
                <Link
                  to="/emotions-wheel"
                  className="dropdown-item"
                  onClick={handleLinkClick}
                >
                  <IoHappyOutline style={{ marginRight: '8px' }} />
                  {t('nav.emotions')}
                </Link>
              </li>
              <li>
                <Link
                  to="/pomodoro"
                  className="dropdown-item"
                  onClick={handleLinkClick}
                >
                  <IoHourglassOutline style={{ marginRight: '8px' }} />
                  {t('nav.timer')}
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <Link
              to="/self-assessment"
              className="nav-link text-center"
              onClick={handleLinkClick}
            >
              <IoClipboardOutline className="nav-icon" />
              <br />
              <span className="nav-text">{t('nav.assessment')}</span>
            </Link>
          </li>
        </ul>

        {/* Push controls to the right */}
        <div className="ms-auto d-flex align-items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle className="nav-link" />
        </div>
      </div>
    </nav>
  );
}
