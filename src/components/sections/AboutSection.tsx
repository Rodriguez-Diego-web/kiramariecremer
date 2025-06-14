import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AboutSectionContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FFFFFF;
  padding: 60px 20px;   
  position: relative;
  overflow: hidden;

  @media (max-width: 991px) {
    padding: 40px 20px;
  }
`;

const ContentLayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const HeaderContainer = styled.div`
  margin-bottom:-30px; 
  text-align: left;
  max-width: 100%;
  padding-left: 20px; 
  
  @media (max-width: 1024px) and (min-width: 768px) {
    padding-left: 20px;
    margin-bottom: -20px; 
    text-align: left;
  }
  
  @media (max-width: 1200px) and (min-width: 1025px) {
    padding-left: 20px;
    margin-bottom: -25px;
  }
  
  @media (max-width: 767px) {
    text-align: center;
    max-width: 100%;
    padding-left: 0;
  }
`;

const MainTitle = styled.h1`
  font-family: 'Kingdom', 'Montserrat', sans-serif;
  font-size: 2.8rem;
  color: #000000;
  margin: 0 0 20px 0; 
  position: relative;
  display: inline-block;
  font-weight: 400;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 5px; 
    left: 0;
    width: calc(100% + 30px); 
    height: 15px; 
    background-color: #cdaffd;
    opacity: 0.6;
    z-index: -1; 
  }
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const MainContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr; 
  gap: 50px;
  margin: 0 auto;
  align-items: center; 
  width: 100%;
  
  @media (max-width: 1024px) and (min-width: 768px) {
    grid-template-columns: 1fr 1fr; 
    gap: 40px;
    align-items: start; 
  }
  
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px; 

  @media (max-width: 1024px) and (min-width: 768px) {
    display: flex; 
    flex-direction: column;
    gap: 25px;
  }

  @media (max-width: 767px) {
    display: contents; 
  }
`;

const TopParagraphTextWrapper = styled.div`
  font-family: 'Montserrat', sans-serif !important;
  font-size: 1rem; 
  line-height: 1.8; 
  color: #333333;
  padding-left: 20px; 
  width: 80%; 
  margin-top: 20px; 
  overflow: hidden; 
  font-weight: 400; 
  
  .body-text {
    font-family: 'Montserrat', sans-serif !important;
    font-weight: 400;
    font-size: 1rem;
  }
  
  p, div, span, br {
    font-family: 'Montserrat', sans-serif !important;
    font-size: 1rem;
    font-weight: 400;
  }
  
  @media (max-width: 1024px) and (min-width: 768px) {
    width: 100%; 
    padding-left: 20px;
    margin-top: 20px;
    overflow: visible; 
    font-size: 1.1rem; 
    line-height: 1.9;
  }
  
  @media (max-width: 1200px) and (min-width: 1025px) {
    padding-left: 20px;
    width: 90%; 
    margin-top: 20px;
    overflow: visible;
  }
  
  @media (max-width: 767px) {
    text-align: center;
    order: 1; 
    width: 100%; 
    padding-left: 0; 
    margin-top: 20px;
    overflow: visible;
  }
`;

const ImagesCluster = styled.div`
  display: grid; 
  grid-template-columns: 1fr 1fr; 
  grid-template-rows: auto auto;
  gap: 15px; 
  width: 90%; 
  margin-top: 20px;
  margin-bottom: 30px;
  padding-left: 20px; 

  @media (max-width: 1024px) and (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr; 
    grid-template-rows: auto;
    gap: 15px;
    width: 100%;
    padding-left: 0;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  @media (max-width: 767px) {
    order: 4; 
    grid-template-columns: 1fr; 
    width: 100%;
    padding-left: 0;
    margin-top: 30px;
    gap: 20px;
  }
`;

const SmallImage1Wrapper = styled.div`
  grid-column: 1;
  grid-row: 1;
  transform: scale(0.96); 
  transform-origin: top left;

  @media (max-width: 1024px) and (min-width: 768px) {
    display: block; 
    grid-column: 1;
    grid-row: 1;
    transform: scale(0.9); 
    transform-origin: center;
  }

  @media (max-width: 767px) {
    display: none; 
  }
`;

const SmallImage2Wrapper = styled.div`
  grid-column: 1;
  grid-row: 2;
  transform: scale(1.6); 
  transform-origin: top left;
  margin-bottom: 20px;

  @media (max-width: 1024px) and (min-width: 768px) {
    display: block; 
    grid-column: 2;
    grid-row: 1;
    transform: scale(0.9); 
    transform-origin: center;
    margin-bottom: 0;
  }

  @media (max-width: 767px) {
    display: none; 
  }
`;

const SmallImage3Wrapper = styled.div`
  grid-column: 2;
  grid-row: 1 / span 2; 
  transform: scale(1.5); 
  transform-origin: top left;

  @media (max-width: 1024px) and (min-width: 768px) {
    display: none; 
  }

  @media (max-width: 767px) {
    display: none; 
  }
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-right: 15px; 

  @media (max-width: 1024px) and (min-width: 768px) {
    display: flex; 
    flex-direction: column;
    gap: 25px;
    padding-right: 20px;
  }

  @media (max-width: 767px) {
    display: contents; 
  }
`;

const MainImageContainer = styled.div`
  position: relative; 
  width: 100%;
  max-width: 80%; 
  margin: 0 auto; 
  transform: translate(40px, 105px); 
  
  @media (max-width: 950px) and (min-width: 850px) {
    max-width: 65%; 
    transform: translate(10px, 60px); 
    margin: 15px auto;
  }
  
  @media (max-width: 1024px) and (min-width: 768px) {
    max-width: 60%; 
    transform: translate(0px, 50px); 
    margin: 20px auto;
  }
  
  @media (max-width: 1200px) and (min-width: 1025px) {
    max-width: 70%;
    transform: translate(20px, 80px); 
  }
  
  @media (max-width: 767px) {
    order: 2; 
    transform: none; 
    max-width: 100%; 
    margin-top: 0px; 
    margin-bottom: 0; 
    padding-right: 0; 
  }
`;

const AuthorBioTextWrapper = styled.div`
  font-family: 'Montserrat', sans-serif !important;
  font-size: 1rem; 
  line-height: 1.8;
  color: #333333;
  margin-top: 90px; 
  max-width: 120%; 
  margin-left: -200px; 
  font-weight: 400; 
  
  .headline-main {
    font-family: 'Montserrat', sans-serif !important;
    font-weight: 400; 
    font-size: 1rem; 
    margin-bottom: 20px;
  }
  
  .body-bottom {
    font-family: 'Montserrat', sans-serif !important;
    font-weight: 400; 
    font-size: 1rem; 
    margin-top: 20px;
  }
  
  @media (max-width: 950px) and (min-width: 850px) {
    margin-top: 60px; 
    max-width: 100%;
    margin-left: 0;
    transform: none;
    padding: 0 20px;
    font-size: 1rem;
    line-height: 1.8;
    
    .headline-main {
      margin-bottom: 20px;
      font-size: 1rem;
    }
    
    .body-bottom {
      margin-top: 20px;
      font-size: 1rem;
    }
  }
  
  @media (max-width: 1024px) and (min-width: 768px) {
    margin-top: 80px; 
    max-width: 100%; 
    margin-left: 0; 
    transform: none; 
    padding: 0 20px; 
    font-size: 1.1rem; 
    line-height: 1.9;
    
    .headline-main {
      margin-bottom: 20px;
      font-size: 1.1rem;
    }
    
    .body-bottom {
      margin-top: 20px;
      font-size: 1.1rem;
    }
  }
  
  @media (max-width: 1200px) and (min-width: 1025px) {
    margin-top: 60px; 
    max-width: 110%;
    margin-left: -100px; 
    transform: translate(0px, 60px); 
    
    .headline-main {
      margin-bottom: 20px;
    }
    
    .body-bottom {
      margin-top: 20px;
    }
  }
  
  @media (max-width: 767px) {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    order: 3; 
    margin-top: -10px; 
    margin-bottom: -140px;
    max-width: 100%; 
    transform: none;
    
    .headline-main {
      margin-top: 20px;   
      margin-left: 0; 
    }
  }
  
  h2 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 10px;
    color: #1c1c1c;
  }
`;

const BackgroundBox = styled.div`
  position: absolute;
  top: -20px;
  left: -30px;
  background-color: #e6dfd7; 
  z-index: 1;
  width: calc(100% - 20px);
  height: calc(100% - 20px);
`;

const ImageWrapper = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    display: block;
  }
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 100%; 
  z-index: 2;
  overflow: hidden; 

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

type AboutPageData = {
  name: string;
  body: string;
  body_bottom: string;
  headlineMain: string;
  profile_image: string;
  left_image_1: string;
  left_image_2: string;
  right_image: string;
  page_title: string;
}

const AboutSection: React.FC = () => {
  const [aboutData, setAboutData] = useState<AboutPageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const textAnimationVariants = {
    hidden: { opacity: 0.2, y: 20, filter: "blur(4px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/aboutData.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAboutData(data);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('An unknown error occurred');
        }
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <AboutSectionContainer><p>Loading...</p></AboutSectionContainer>;
  }

  if (error) {
    return <AboutSectionContainer><p>Error loading data: {error}</p></AboutSectionContainer>;
  }

  if (!aboutData) {
    return <AboutSectionContainer><p>No data available.</p></AboutSectionContainer>;
  }

  const { name, body, body_bottom, headlineMain } = aboutData;

  const mainImage = aboutData.profile_image || '/images/image-small.webp';
  const smallImage1 = aboutData.left_image_1 || '/images/RSE_6158-small.webp';
  const smallImage2 = aboutData.left_image_2 || '/images/img2.jpg';
  const smallImage3 = aboutData.right_image || '/images/image-small.webp';

  return (
    <AboutSectionContainer id="about-section"> 
      <ContentLayoutWrapper>
        <MainContentWrapper>
          <LeftColumn>
            <HeaderContainer>
              <MainTitle as={motion.h1} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Hi, ich bin Kira
              </MainTitle>
            </HeaderContainer>
            <TopParagraphTextWrapper
              as={motion.div}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
              variants={textAnimationVariants}
            >
              {body && (
                <div 
                  className="body-text" 
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                  dangerouslySetInnerHTML={{ __html: body.replace(/\n/g, '<br />') }} 
                />
              )}
            </TopParagraphTextWrapper>
            <ImagesCluster>
              {smallImage1 && (
                <SmallImage1Wrapper>
                  <ImageWrapper>
                    <img 
                      src={smallImage1} 
                      srcSet={`${smallImage1} 450w, ${smallImage1.replace('.webp', '-small.webp') || smallImage1} 225w`} 
                      sizes="(max-width: 768px) 300px, 450px"
                      alt="Kira im Gespräch" 
                      loading="lazy" 
                      width="450" 
                      height="300" 
                    />
                  </ImageWrapper>
                </SmallImage1Wrapper>
              )}
              
              {smallImage2 && (
                <SmallImage2Wrapper>
                  <ImageWrapper>
                    <img 
                      src={smallImage2} 
                      srcSet={`${smallImage2} 450w, ${smallImage2.replace('.webp', '-small.webp') || smallImage2} 225w`} 
                      sizes="(max-width: 768px) 300px, 450px"
                      alt="Kira Marie Portrait" 
                      loading="lazy" 
                      width="450" 
                      height="300" 
                    />
                  </ImageWrapper>
                </SmallImage2Wrapper>
              )}
              
              {smallImage3 && (
                <SmallImage3Wrapper>
                  <ImageWrapper>
                    <img 
                      src={smallImage3} 
                      srcSet={`${smallImage3} 450w, ${smallImage3.replace('.webp', '-small.webp') || smallImage3} 225w`} 
                      sizes="(max-width: 768px) 300px, 450px"
                      alt="Kira spricht auf der Bühne" 
                      loading="lazy" 
                      width="450" 
                      height="600" 
                    />
                  </ImageWrapper>
                </SmallImage3Wrapper>
              )}
            </ImagesCluster>
          </LeftColumn>

          <RightColumn>
            {mainImage && (
              <MainImageContainer>
                <BackgroundBox />
                <ProfileImageWrapper> 
                  <img 
                    src={mainImage} 
                    srcSet={`${mainImage} 500w, ${mainImage.replace(/\.\w+$/, '-small$&') || mainImage} 250w`} 
                    sizes="(max-width: 768px) 350px, 500px"
                    alt={name || 'Kira Marie Cremer'} 
                    width="500" 
                    height="500" 
                  />
                </ProfileImageWrapper>
              </MainImageContainer>
            )}
            <AuthorBioTextWrapper className="author-bio-content">
              {headlineMain && (
                <motion.div 
                  className="headline-main"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.05 }}
                  variants={textAnimationVariants}
                >
                  <div dangerouslySetInnerHTML={{ 
                    __html: headlineMain
                      .replace('Als Speakerin', '<br /><br />Als Speakerin')
                      .replace(/\n/g, '<br />') 
                  }} />
                </motion.div>
              )}
              {body_bottom && (
                <motion.div 
                  className="body-bottom"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.05 }}
                  variants={textAnimationVariants}
                >
                  <div dangerouslySetInnerHTML={{ __html: body_bottom.replace(/\n/g, '<br />') }} />
                </motion.div>
              )}
            </AuthorBioTextWrapper>
          </RightColumn>
        </MainContentWrapper>
      </ContentLayoutWrapper>
    </AboutSectionContainer>
  );
};

export default AboutSection;