import React from 'react';
import styled from 'styled-components';

// Main container for the entire section
const SectionWrapper = styled.section`
  position: relative;
  padding-top: 150px; 
  margin-top: -100px;
  z-index: 2; 
  font-family: 'Montserrat', sans-serif;
`;

// The large, overlapping title
const SectionTitle = styled.h2`
  font-family: 'Kingdom', serif; 
  font-size: 5rem; 
  font-weight: normal;
  color: #000000; 
  text-align: center;
  
  position: absolute; 
  top: 50px; 
  left: 0;
  right: 0;
  z-index: 3; 

  @media (max-width: 767px) {
    font-size: 3.2rem;
    top: 70px; 
  }
`;

const ContentContainer = styled.div`
  background-color: #FFFFFF; 
  color: #333333; 
  padding: 50px 20px 20px 20px; 
  text-align: center;
  position: relative; 
  z-index: 1; 
  
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
`;

const ContactText = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: #555555; 
  margin: 0 auto 30px auto; 
  max-width: 600px; 
  position: relative; 
  z-index: 1;

  @media (max-width: 767px) {
    font-size: 1rem;
  }
`;

const ContactButton = styled.a`
  display: inline-block;
  background-color: #000000; 
  color: #FFFFFF; 
  padding: 15px 35px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  font-weight: bold;
  text-decoration: none;
  border-radius: 5px; 
  text-transform: uppercase;
  border: none;
  transition: background-color 0.3s ease, transform 0.2s ease;
  position: relative; 
  z-index: 1;

  &:hover {
    background-color: #333333; 
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ContactSection: React.FC = () => {
  return (
    <SectionWrapper id="kontakt">
      <SectionTitle>Kontakt</SectionTitle>
      <ContentContainer>
        <ContactText>
          Ob Anfrage, Idee oder einfach nur ein Hallo - <br />Ich freue mich auf deine Nachricht.
        </ContactText>
        <ContactButton href="mailto:HI@KIRAMARIECREMER.DE">
          HI@KIRAMARIECREMER.DE
        </ContactButton>
      </ContentContainer>
    </SectionWrapper>
  );
};

export default ContactSection;
