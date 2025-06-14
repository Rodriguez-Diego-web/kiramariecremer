import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';

const NewsletterSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mockupContainerRef = useRef<HTMLDivElement>(null);
  
  const isInView = useInView(sectionRef, { once: true, amount: 0.5 });
  const mockupsInView = useInView(mockupContainerRef, { once: true, amount: 0.7 });
  
  return (
    <NewsletterWrapper id="newsletter" ref={sectionRef}>
      <ContentContainer>
        <KingdomTitle>Mein Newsletter</KingdomTitle>
        <NewsletterContent>
          <MockupImageContainer ref={mockupContainerRef}>
            <MockupImagesWrapper>
              <motion.div
                initial={{ opacity: 0, y: -80 }}
                animate={mockupsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -80 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="mockup-container mockup-1"
              >
                <MockupImage 
                  src="/images/3.webp" 
                  alt="What The Work?! Newsletter Mockup 1" 
                  className="newsletter-image"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 80 }}
                animate={mockupsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="mockup-container mockup-2"
              >
                <MockupImage 
                  src="/images/2-small.webp" 
                  alt="What The Work?! Newsletter Mockup 2" 
                  className="newsletter-image"
                />
              </motion.div>
            </MockupImagesWrapper>
          </MockupImageContainer>
          
          <TextContentContainer>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <NewsletterTitle>
                In meinem wöchentlichen Newsletter "What The Work?!" schreibe ich jede Woche über Karriere-Hacks, die dich wirklich weiterbringen: klar, praxisnah und auf den Punkt.
              </NewsletterTitle>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <NewsletterSubtext>
                Ob Mindset, Selbstorganisation oder Future Skills: Ich teile, was funktioniert und was ich gern früher gewusst hätte.
              </NewsletterSubtext>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <IframeContainer>
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
              </IframeContainer>
            </motion.div>
          </TextContentContainer>
        </NewsletterContent>
      </ContentContainer>
    </NewsletterWrapper>
  );
};

const NewsletterWrapper = styled.section`
  width: 100%;
  background-color: #ffffff;
  padding: 80px 0;
  position: relative;

  @media (max-width: 991px) {
    padding: 50px 0;
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
`;

const KingdomTitle = styled.h3`
  font-family: 'Kingdom', sans-serif;
  font-size: 4rem;
  font-weight: normal;
  color: #000000;
  position: absolute;
  top: -20px;
  right: 100px;
  z-index: 5;
  margin: 0;
  padding: 0 15px;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 15%;
    width: 110%;
    height: 35%;
    background-color: #86a4fd;
    z-index: -1;
    
    @media (max-width: 768px) {
      width: 85%;
      height: 30%;
      bottom: 18%;
      left: 10%;
    }
  }
  
  @media (max-width: 1024px) and (min-width: 768px) {
    font-size: 4.5rem;
    right: 80px;
    padding: 0 20px;
    
    &::after {
      width: 105%;
      height: 32%;
      bottom: 16%;
    }
  }
  
  @media (max-width: 991px) {
    font-size: 3.5rem;
    right: 60px;
  }
  
  @media (max-width: 767px) {
    font-size: 2.5rem;
    position: relative;
    top: 0;
    right: auto;
    text-align: center;
    margin: 0 auto 30px;
    display: block;
    padding: 0 10px;
  }
`;

const NewsletterContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
  
  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const MockupImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 991px) {
    order: 1;
  }
`;

const MockupImagesWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  justify-content: center;
  
  .mockup-container {
    position: relative;
  }
  
  .mockup-1 {
    z-index: 1;
    max-width: 100%;
    margin-right: -560px;
  }
  
  .mockup-2 {
    z-index: 2;
  }
  
  @media (max-width: 1024px) and (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    
    .mockup-1 {
      margin-right: -550px;
      max-width: 80%;
      z-index: 1;
    }
    
    .mockup-2 {
      max-width: 80%;
      z-index: 2;
    }
  }
  
  @media (max-width: 767px) {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    
    .mockup-1 {
      margin-right: -350px;
      max-width: 65%;
    }
    
    .mockup-2 {
      max-width: 65%;
    }
  }
  
  @media (max-width: 480px) {
    .mockup-1 {
      margin-right: -280px;
      max-width: 75%;
    }
    
    .mockup-2 {
      max-width: 75%;
    }
  }
`;

const MockupImage = styled.img`
  max-width: 100%;
  height: auto;
  display: block;
  will-change: transform, opacity;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const TextContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  
  @media (max-width: 1024px) and (min-width: 768px) {
    align-items: center;
  }
  
  @media (max-width: 991px) {
    order: 2;
    text-align: center;
    gap: 15px;
  }
`;

const NewsletterTitle = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.5;
  color: #333;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const NewsletterSubtext = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  line-height: 1.5;
  color: #555;
  margin: 0;
`;

const IframeContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 20px auto;
  
  iframe {
    @media (max-width: 768px) {
      height: 42px !important;
    }
  }
`;

export default NewsletterSection;
