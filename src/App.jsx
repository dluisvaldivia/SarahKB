import React, { useEffect } from 'react';
import './styles/global.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './view/components/Navbar.jsx';
import Footer from './view/components/Footer.jsx';
import MyStory from './view/pages/MyStory.jsx';
import Landing from './view/pages/Landing.jsx';
import Contact from './view/pages/Contact.jsx';
import NotFound from './view/pages/NotFound.jsx';
import Schedule from './view/pages/Schedule.jsx';
import BackToTop from './view/components/backToTop.jsx';
import PrivacyPolicy from './view/pages/PrivacyPolicy.jsx';
import TermsOfService from './view/pages/TermsOfService.jsx';
import AccessibilityStatement from './view/pages/AccessibilityStatement.jsx';
import CookieConsent from 'react-cookie-consent';
import { getInitialTheme, setTheme } from './controllers/themeController.js';
import EmotionsWheel from './view/pages/EmotionsWheel.jsx';
import SelfAssessment from './view/pages/SelfAssessment.jsx';
import PomodoroTimer from './view/pages/PomodoroTimer.jsx';
import Simulator from './view/pages/Simulator.jsx';

function App() {
  useEffect(() => {
    setTheme(getInitialTheme());
  }, []);

  const loadCalendlyScript = () => {
    const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
    }
  };

  return (
    <Router basename="/">
      <div className="bg-halftone"></div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/accessibility-statement" element={<AccessibilityStatement />} />
        <Route path="/emotions-wheel" element={<EmotionsWheel />} />
        <Route path="/self-assessment" element={<SelfAssessment />} />
        <Route path="/pomodoro" element={<PomodoroTimer />} />
        <Route path="/simulator" element={<Simulator />} />
      </Routes>
      <CookieConsent
        location="bottom"
        enableDeclineButton
        declineButtonText="Decline"
        buttonText="Accept All"
        cookieName="myWebsiteCookieConsent"
        style={{
          background: '#fcf1a3',
          color: 'black',
          fontSize: '25px',
        }}
        buttonStyle={{
          background: '#55f715',
          color: 'black',
          fontSize: '20px',
          borderRadius: '5px',
          padding: '10px 20px',
        }}
        declineButtonStyle={{
          background: '#ff0044',
          color: 'white',
          fontSize: '14px',
          borderRadius: '5px',
          padding: '10px 20px',
        }}
        expires={365}
        onAccept={() => {
          console.log('Cookies accepted');
          loadCalendlyScript(); // Load Calendly script after cookies are accepted
        }}
        onDecline={() => {
          console.log('Cookies declined');
        }}
      >
        We use cookies to improve user experience. By clicking "Accept All," you consent to the use of cookies. Read more at our <a href="/privacy-policy" style={{ color: 'black', textDecoration: 'underline' }}>Privacy Policy</a>.
      </CookieConsent>
      <Footer />
      <BackToTop />
    </Router>
  );
}

export default App;
