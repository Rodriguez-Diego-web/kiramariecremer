import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import WhatTheWorkTestimonialsSection from '../sections/WhatTheWorkTestimonialsSection';
import WhatTheWorkAboutSection from '../sections/WhatTheWorkAboutSection';
import BeehiivFeedSection from '../sections/BeehiivFeedSection';


const PageWrapper = styled.div`
  background-color: #F9F7F4; /* Light cream background for the page below blue header */
  overflow-x: hidden; /* Prevent horizontal scrolling */
  position: relative; /* Immer position relative für den Container */
`;

const BlueHeaderSection = styled.div`
  background-color: #8facff; /* User specified blue */
  padding: 40px 20px; 
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 150px; 
  @media (max-width: 768px) {
    padding: 20px 15px;
    margin-top: 75px;
    min-height: 90px;
  }
`;

const LogoImage = styled.img`
  max-height: 180px; 
  max-width: 90%; 
  display: block; 
  margin: 50px auto -10px auto; /* Center the logo properly */
  @media (max-width: 768px) {
    max-height: 50px;
    margin: 0 auto;
  }
`;

const MainContentSection = styled.div`
  padding: 60px 20px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative; /* For absolute positioned mockups */
  
  @media (max-width: 768px) {
    padding: 20px 15px;
  }
`;

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "headline mockups"
    "subscription mockups"
    "text mockups";
  gap: 50px;
  align-items: start; /* Changed from center to start for better alignment */

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "headline"
      "subscription"
      "mockups"
      "text";
    gap: 20px;
    overflow: visible;
  }
  
  @media (max-width: 480px) {
    gap: 15px; /* Reduced gap but not zero */
    margin-bottom: 30px;
  }
`;

const TextContainer = styled.div`
  grid-area: text;
  @media (max-width: 991px) {
    order: 4;
    margin-top: 30px; /* Reduced margin */
  }
  
  @media (max-width: 480px) {
    margin-top: 20px;
  }
`;

const Headline = styled.h2`
  grid-area: headline;
  font-family: 'kingdom', sans-serif;
  font-size: 3rem;
  font-weight: normal;
  color: #000000;
  margin-bottom: 25px;
  line-height: 1.3;
  max-width: 100%; /* Changed from fixed width */
  width: 100%;
  
  @media (max-width: 991px) {
    order: 1;
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 15px;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 12px;
    margin-top: 10px;
  }
`;

// Formular-Styling jetzt direkt per Inline-Styles

const SubscriptionBarWrapper = styled.div`
  grid-area: subscription;
  display: flex;
  justify-content: flex-start;
  width: 100%;

  @media (max-width: 991px) {
    order: 2;
    margin-top: 15px; 
    margin-bottom: 20px; 
  }
`;

const DescriptionText = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #333333;
  max-width: 450px;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 1.5;
    max-width: 100%; /* Allow full width on mobile */
  }
`;

const MockupContainer = styled.div`
  grid-area: mockups;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  
  @media (max-width: 991px) {
    order: 3;
    margin-bottom: 15px;
    width: 100%;
    overflow: visible;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 10px;
    padding-top: 20px;
    min-height: 300px;
  }
`;

const StyledMockupImagesWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0;
  margin-right: 0; /* Reset this */
  min-height: 500px; /* Reasonable container height */
  width: 100%;

  .mockup-container {
    position: absolute;
    transition: transform 0.5s ease-out;
  }

  .mockup-main {
    z-index: 1;
    left: 15%; /* Back to working position */
    top: -200px;
    transform: translate(0, 0);
    img {
      width: 500px;
      min-width: 500px;
      height: auto;
    }
  }

  .mockup-secondary {
    z-index: 2;
    left: 18%; /* Back to working position */
    top: -200px;
    transform: translate(0, 0);
    img {
      width: 500px;
      min-width: 500px;
      height: auto;
    }
  }
  
  /* iPad Air specific (820x1180) */
  @media (max-width: 1180px) and (min-width: 820px) {
    margin-top: 0;
    min-height: 500px;
    
    .mockup-main {
      left: 5%; /* Much further left */
      top: -350px;
      transform: translate(0, 0);
      img {
        width: 350px; /* Much smaller for iPad Air */
        min-width: 350px;
        height: auto;
      }
    }
    .mockup-secondary {
      left: 8%; /* Much further left and closer together */
      top: -150px;
      transform: translate(0, 0);
      img {
        width: 350px; /* Much smaller for iPad Air */
        min-width: 350px;
        height: auto;
      }
    }
  }
  
  /* Large iPad Pro (1112px) */
  @media (max-width: 1200px) and (min-width: 992px) {
    .mockup-main {
      left: 20%; /* Same positioning as tablet */
      top: -100px; /* Same positioning as tablet */
      transform: translate(0, 0);
      img {
        width: 400px; /* Slightly larger than tablet */
        min-width: 400px;
        height: auto;
      }
    }
    .mockup-secondary {
      left: 23%; /* Same positioning as tablet */
      top: -100px; /* Same positioning as tablet */
      transform: translate(0, 0);
      img {
        width: 400px; /* Slightly larger than tablet */
        min-width: 400px;
        height: auto;
      }
    }
  }
  
  @media (max-width: 991px) {
    margin-top: 0;
    min-height: 400px;
    
    .mockup-main {
      left: 20%; /* Centered better - moved right from 5% */
      top: -100px; /* Keep the working height */
      transform: translate(0, 0);
      img {
        width: 350px; /* Keep the working size */
        min-width: 350px;
        height: auto;
      }
    }
    .mockup-secondary {
      left: 23%; /* Centered better - moved right from 8% */
      top: -100px; /* Keep the working height */
      transform: translate(0, 0);
      img {
        width: 350px; /* Keep the working size */
        min-width: 350px;
        height: auto;
      }
    }
  }
  
  @media (max-width: 768px) {
    min-height: 350px;
    margin-top: 20px;
    
    .mockup-main {
      left: 15%; /* Same as desktop */
      top: -20px;
      transform: translate(0, 0); /* Same as desktop */
      img {
        width: 280px; /* Smaller for mobile */
        min-width: 280px;
        height: auto;
      }
    }
    .mockup-secondary {
      left: 18%; /* Same as desktop */
      top: -20px;
      transform: translate(0, 0); /* Same as desktop */
      img {
        width: 280px; /* Smaller for mobile */
        min-width: 280px;
        height: auto;
      }
    }
  }
  
  @media (max-width: 480px) {
    min-height: 300px;
    margin-top: 15px;
    
    .mockup-main {
      left: 15%; /* Same as desktop */
      top: -15px;
      transform: translate(0, 0); /* Same as desktop */
      img {
        width: 220px; /* Smaller for small mobile */
        min-width: 220px;
        height: auto;
      }
    }
    .mockup-secondary {
      left: 18%; /* Same as desktop */
      top: -15px;
      transform: translate(0, 0); /* Same as desktop */
      img {
        width: 220px; /* Smaller for small mobile */
        min-width: 220px;
        height: auto;
      }
    }
  }
`;

const StyledMockupImage = styled.img`
  display: block;
  height: auto;
  /* Removed border-radius and box-shadow for clean mockups */
`;



const Newworknow: React.FC = () => {
  const textContainerRef = useRef<HTMLDivElement>(null);
  const mockupContainerRef = useRef<HTMLDivElement>(null);
  const textInView = useInView(textContainerRef, { once: true, amount: 0.3 });
  const mockupsInView = useInView(mockupContainerRef, { once: true, amount: 0.1 });
  
  return (
    <PageWrapper>
      <BlueHeaderSection>
        <LogoImage src="/uploads/NLLogo.png" alt="What The Work Logo" />
      </BlueHeaderSection>

      <MainContentSection>
        <GridLayout>
          <Headline>Jede Woche praktische Hacks für mehr Erfolg in deiner Karriere!</Headline>
          <SubscriptionBarWrapper>
            {/* Beehiiv iframe embed anstelle des benutzerdefinierten Formulars */}
            <div style={{ marginTop: '20px', marginBottom: '20px', width: '100%', maxWidth: '500px' }}>
              <iframe 
                src="https://embeds.beehiiv.com/81fc6fc1-ddd0-4079-81fb-899807142dfd?slim=true" 
                data-test-id="beehiiv-embed" 
                width="100%" 
                height="53" 
                frameBorder="0" 
                scrolling="no" 
                style={{
                  borderRadius: '15px', 
                  border: '1px solid #8facff', 
                  margin: 0, 
                  backgroundColor: 'transparent',
                  minHeight: 'auto'
                }}
                title="Kira Marie Newsletter Subscription"
              />
            </div>
          </SubscriptionBarWrapper>
          <TextContainer>
            <div ref={textContainerRef}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={textInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              >
                <DescriptionText>
                  „What The Work?!" ist der Newsletter für alle, die mehr vom Job wollen. Jede Woche gibt's Klartext zu Themen rund um deine Karriere und die neue Arbeitswelt. Mit Hacks, Tipps und Tools, die dich wirklich weiterbringen: Melde dich jetzt an und hol dir Karriere-Input, den du wirklich brauchst!
                </DescriptionText>
              </motion.div>
            </div>
          </TextContainer>
          <MockupContainer ref={mockupContainerRef}>
            <StyledMockupImagesWrapper>
              <motion.div
                className="mockup-container mockup-main"
                initial={{ opacity: 0, y: -50 }}
                animate={mockupsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                <StyledMockupImage src="/images/3.webp" alt="What The Work?! Newsletter Mockup Main" />
              </motion.div>
              <motion.div
                className="mockup-container mockup-secondary"
                initial={{ opacity: 0, y: 50 }}
                animate={mockupsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                <StyledMockupImage src="/images/2-small.webp" alt="What The Work?! Newsletter Mockup Secondary" />
              </motion.div>
            </StyledMockupImagesWrapper>
          </MockupContainer>
        </GridLayout>
      </MainContentSection>

      <WhatTheWorkTestimonialsSection />

      <WhatTheWorkAboutSection />
      <BeehiivFeedSection />
    </PageWrapper>
  );
};

export default Newworknow;
