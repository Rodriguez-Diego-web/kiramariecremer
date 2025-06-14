import React from 'react';
import styled from 'styled-components';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { VscMail } from 'react-icons/vsc';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();

    if (target === '#') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }

    const targetElement = document.querySelector(target);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCookieSettings = () => {
    // Remove cookie consent to show banner again
    localStorage.removeItem('cookie-consent');
    localStorage.removeItem('cookie-consent-date');
    // Reload page to trigger cookie banner
    window.location.reload();
  };

  return (
    <FooterWrapper>
      <Container>
        <FooterContent>
          <BrandSection>
            <LogoImage src="/images/KMClogoweiss.webp" alt="Kira Marie Cremer Logo" />
            <SocialLinks>
              <SocialLink 
                href="https://www.instagram.com/kiramariecremer/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </SocialLink>
              
              <SocialLink 
                href="https://www.linkedin.com/in/kiramariecremer/" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </SocialLink>
              
              <SocialLink 
                href="mailto:kontakt@kira-marie.com" 
                rel="noopener noreferrer"
                aria-label="Email"
              >
                <VscMail />
              </SocialLink>
            </SocialLinks>
          </BrandSection>
          
          <LinksSection>
            <LinkGroup>
              <FooterLink href="#about-section" onClick={(e) => handleSmoothScroll(e, '#about-section')}>ÜBER MICH</FooterLink>
              <FooterLink href="#presse" onClick={(e) => handleSmoothScroll(e, '#presse')}>ZUSAMMENARBEIT</FooterLink> 
              <FooterLink href="#collaboration" onClick={(e) => handleSmoothScroll(e, '#collaboration')}>PODCAST: NEW WORK NOW</FooterLink> 
              <FooterLink href="#kontakt" onClick={(e) => handleSmoothScroll(e, '#kontakt')}>KONTAKT</FooterLink>
              <FooterLink href="#about-section" onClick={(e) => handleSmoothScroll(e, '#about-section')}>ÜBER MICH</FooterLink>
            </LinkGroup>
          </LinksSection>
        </FooterContent>
        
        <FooterBottom>
          <Copyright>&copy; {currentYear} Kira Marie. Alle Rechte vorbehalten.</Copyright>
          <LegalLinks>
            <LegalLink href="/datenschutz">Datenschutz</LegalLink>
            <LegalSeparator>•</LegalSeparator>
            <LegalLink href="/cookies">Cookies</LegalLink>
            <LegalSeparator>•</LegalSeparator>
            <LegalLink href="/impressum">Impressum</LegalLink>
            <LegalSeparator>•</LegalSeparator>
            <CookieSettingsButton onClick={handleCookieSettings}>
              Cookie-Einstellungen
            </CookieSettingsButton>
          </LegalLinks>
          <CreatedBy> handcrafted by <a href="https://www.rodriguez-web.de" target="_blank" rel="noopener noreferrer">Rodriguez Web</a></CreatedBy>
        </FooterBottom>
      </Container>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  background-color: #0a0a0a;
  padding: 1rem 0 1.5rem;
  width: 100%;
`;

const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    align-items: stretch;
  }
`;

const BrandSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 1rem;
  }
`;

const LogoImage = styled.img`
  height: 90px;
  width: auto;
  
  @media (max-width: 768px) {
    height: 60px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled.a`
  color: #ffffff;
  font-size: 1.2rem;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
  
  &:hover {
    color: #cdaffd;
  }
`;

const LinksSection = styled.div`
  display: flex;
  gap: 4rem;
  
  @media (max-width: 768px) {
    align-self: flex-end;
    gap: 2rem;
  }

  @media (max-width: 576px) {
    flex-wrap: wrap;
    justify-content: flex-end;
  }
`;

const LinkGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  align-items: flex-end;
`;

const FooterLink = styled.a`
  font-family: var(--body-font);
  font-size: 0.9rem;
  color: #fff;
  text-decoration: none;
  transition: color 0.2s ease;
  text-transform: uppercase;
  
  &:hover {
    color: #cdaffd;
  }
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
    margin-bottom: 0.4rem;
  }
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.8rem;
    text-align: center;
  }
`;

const LegalLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    order: -1;
    margin-bottom: 0.5rem;
  }
`;

const LegalLink = styled.a`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.75rem;
  color: #888888;
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: #cdaffd;
  }
`;

const LegalSeparator = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.75rem;
  color: #888888;
`;

const Copyright = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  color: #888888;
  margin: 0;
`;

const CreatedBy = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  color: #888888;
  margin: 0;
`;

const CookieSettingsButton = styled.button`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.75rem;
  color: #888888;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;
  padding: 0;
  
  &:hover {
    color: #cdaffd;
  }
`;

export default Footer;
