import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

interface CookieConsent {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<CookieConsent>({
    necessary: true, 
    functional: false,
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    
    const savedConsent = localStorage.getItem('cookie-consent');
    if (!savedConsent) {
      setShowBanner(true);
    } else {
      const parsedConsent = JSON.parse(savedConsent);
      setConsent(parsedConsent);
      loadConsentedServices(parsedConsent);
    }
  }, []);

  const loadConsentedServices = (consentData: CookieConsent) => {
    
    if (consentData.functional) {
      
      const existingLink = document.querySelector('link[href*="fonts.googleapis.com"]');
      if (!existingLink) {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap';
        link.rel = 'stylesheet';
        link.id = 'google-fonts-stylesheet';
        document.head.appendChild(link);
        console.log('Google Fonts loaded via cookie consent');
      }
    } else {
      
      const existingLink = document.querySelector('#google-fonts-stylesheet');
      if (existingLink) {
        existingLink.remove();
        console.log('Google Fonts removed due to lack of consent');
      }
    }

    
    if (consentData.analytics) {
      console.log('Analytics tracking enabled');
      
    } else {
      console.log('Analytics tracking disabled');
    }

    
    if (consentData.marketing) {
      console.log('Marketing cookies enabled');
      
    } else {
      console.log('Marketing cookies disabled');
    }
  };

  const handleAcceptAll = () => {
    const allConsent: CookieConsent = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true
    };
    
    setConsent(allConsent);
    localStorage.setItem('cookie-consent', JSON.stringify(allConsent));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    loadConsentedServices(allConsent);
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const minimalConsent: CookieConsent = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false
    };
    
    setConsent(minimalConsent);
    localStorage.setItem('cookie-consent', JSON.stringify(minimalConsent));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    loadConsentedServices(minimalConsent);
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(consent));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    loadConsentedServices(consent);
    setShowBanner(false);
    setShowDetails(false);
  };

  const handleConsentChange = (type: keyof CookieConsent, value: boolean) => {
    if (type === 'necessary') return; 
    
    setConsent(prev => ({
      ...prev,
      [type]: value
    }));
  };

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      <CookieOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <CookieContainer
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {!showDetails ? (
            <BasicView>
              <ContentWrapper>
                <CookieTitle>🍪 Cookie-Einstellungen</CookieTitle>
                <CookieText>
                  Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten. 
                  Einige sind technisch notwendig, andere helfen uns, die Website zu verbessern.
                </CookieText>
              </ContentWrapper>
              
              <ButtonGroup>
                <AcceptButton onClick={handleAcceptAll}>
                  Alle akzeptieren
                </AcceptButton>
                <RejectButton onClick={handleRejectAll}>
                  Nur notwendige
                </RejectButton>
                <SettingsButton onClick={() => setShowDetails(true)}>
                  Einstellungen
                </SettingsButton>
              </ButtonGroup>
              
              <PrivacyLink href="/datenschutz" target="_blank">
                Mehr in der Datenschutzerklärung
              </PrivacyLink>
            </BasicView>
          ) : (
            <DetailedView>
              <CookieTitle>Cookie-Einstellungen verwalten</CookieTitle>
              
              <CookieCategory>
                <CategoryHeader>
                  <CategoryTitle>Notwendige Cookies</CategoryTitle>
                  <ToggleSwitch disabled checked={true} />
                </CategoryHeader>
                <CategoryDescription>
                  Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden. 
                  Dazu gehören Session-Management, Sicherheit und Cookie-Präferenzen.
                </CategoryDescription>
              </CookieCategory>

              <CookieCategory>
                <CategoryHeader>
                  <CategoryTitle>Funktionale Cookies</CategoryTitle>
                  <ToggleSwitch 
                    checked={consent.functional}
                    onClick={() => handleConsentChange('functional', !consent.functional)}
                  />
                </CategoryHeader>
                <CategoryDescription>
                  Google Fonts für die korrekte Darstellung der Website. Diese Cookies verbessern die Benutzererfahrung 
                  durch bessere Typografie und Design.
                </CategoryDescription>
              </CookieCategory>

              <CookieCategory>
                <CategoryHeader>
                  <CategoryTitle>Analyse-Cookies</CategoryTitle>
                  <ToggleSwitch 
                    checked={consent.analytics}
                    onClick={() => handleConsentChange('analytics', !consent.analytics)}
                  />
                </CategoryHeader>
                <CategoryDescription>
                  Diese Cookies helfen uns zu verstehen, wie Besucher unsere Website nutzen. 
                  Alle Daten werden anonymisiert und aggregiert ausgewertet.
                </CategoryDescription>
              </CookieCategory>

              <CookieCategory>
                <CategoryHeader>
                  <CategoryTitle>Marketing-Cookies</CategoryTitle>
                  <ToggleSwitch 
                    checked={consent.marketing}
                    onClick={() => handleConsentChange('marketing', !consent.marketing)}
                  />
                </CategoryHeader>
                <CategoryDescription>
                  Diese Cookies werden für Werbezwecke und personalisierte Inhalte verwendet. 
                  Sie können von externen Werbepartnern gesetzt werden.
                </CategoryDescription>
              </CookieCategory>

              <ButtonGroup>
                <SaveButton onClick={handleSavePreferences}>
                  Einstellungen speichern
                </SaveButton>
                <BackButton onClick={() => setShowDetails(false)}>
                  Zurück
                </BackButton>
              </ButtonGroup>
            </DetailedView>
          )}
        </CookieContainer>
      </CookieOverlay>
    </AnimatePresence>
  );
};

// Styled Components
const CookieOverlay = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(3px);
  z-index: 9999;
  padding: 0;
`;

const CookieContainer = styled(motion.div)`
  width: 100%;
  margin: 0;
  background: #1a1a1a;
  border-radius: 0;
  padding: 12px 24px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.3);
  border-top: 1px solid #333;
`;

const BasicView = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
`;

const DetailedView = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const CookieTitle = styled.h3`
  font-size: 0.9rem;
  font-weight: 500;
  color: #ffffff;
  margin: 0 0 4px 0;
`;

const CookieText = styled.p`
  font-size: 0.8rem;
  color: #aaaaaa;
  line-height: 1.3;
  margin: 0;
  max-width: 600px;
`;

const ContentWrapper = styled.div`
  flex: 1;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    width: 100%;
    gap: 6px;
  }
`;

const BaseButton = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  
  @media (max-width: 768px) {
    flex: 1;
    padding: 10px 12px;
  }
`;

const AcceptButton = styled(BaseButton)`
  background: #4a5568;
  color: #ffffff;
  
  &:hover {
    background: #2d3748;
  }
`;

const RejectButton = styled(BaseButton)`
  background: #2d3748;
  color: #ffffff;
  border: 1px solid #4a5568;
  
  &:hover {
    background: #1a202c;
  }
`;

const SettingsButton = styled(BaseButton)`
  background: transparent;
  color: #aaaaaa;
  border: 1px solid #4a5568;
  
  &:hover {
    background: #2d3748;
    color: #ffffff;
  }
`;

const SaveButton = styled(BaseButton)`
  background: #4a5568;
  color: #ffffff;
  flex: 1;
  
  &:hover {
    background: #2d3748;
  }
`;

const BackButton = styled(BaseButton)`
  background: #2d3748;
  color: #ffffff;
  border: 1px solid #4a5568;
  
  &:hover {
    background: #1a202c;
  }
`;

const PrivacyLink = styled.a`
  display: block;
  text-align: center;
  color: #888;
  font-size: 0.7rem;
  text-decoration: none;
  margin-top: 8px;
  
  &:hover {
    color: #aaaaaa;
    text-decoration: underline;
  }
`;

const CookieCategory = styled.div`
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #333;
  
  &:last-child {
    border-bottom: none;
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`;

const CategoryTitle = styled.h4`
  font-size: 0.9rem;
  font-weight: 500;
  color: #ffffff;
  margin: 0;
`;

const CategoryDescription = styled.p`
  font-size: 0.75rem;
  color: #aaaaaa;
  line-height: 1.3;
  margin: 0;
`;

const ToggleSwitch = styled.button<{ checked: boolean; disabled?: boolean }>`
  width: 36px;
  height: 20px;
  border-radius: 10px;
  border: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  background: ${props => props.checked ? '#4a5568' : '#555'};
  position: relative;
  transition: background 0.2s ease;
  
  &:before {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 8px;
    background: white;
    top: 2px;
    left: ${props => props.checked ? '18px' : '2px'};
    transition: left 0.2s ease;
  }
  
  &:hover:not(:disabled) {
    background: ${props => props.checked ? '#2d3748' : '#666'};
  }
`;

export default CookieBanner; 