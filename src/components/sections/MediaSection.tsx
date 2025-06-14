import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion'; 
import MediaCard, { MediaItem } from '../cards/MediaCard'; 
import pressArticlesData from '../../generated/pressArticles.json';

const PresseSectionWrapper = styled.section`
  position: relative;
  padding-top: 90px;
  padding-bottom: 0;
  margin-top: -100px;
  z-index: 2;
  font-family: 'Montserrat', sans-serif;
`;

const SectionTitle = styled(motion.h2)`
  font-family: 'Kingdom', serif;
  font-size: 5rem;
  font-weight: normal;
  color: #000000;
  text-align: center;
  
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  z-index: 3;

  @media (max-width: 767px) {
    font-size: 3rem;
    top: 60px;
  }
`;

const BeigeBackgroundContainer = styled.div`
  background-color: #E6DFD7;
  padding: 100px 20px 40px 20px;
  position: relative;
  z-index: 1;
  
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const MediaGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  margin-bottom: 40px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const LoadMoreButton = styled.button`
  margin-top: 20px;
  padding: 15px 40px;
  border: none;
  border-radius: 0;
  background-color: #000000;
  color: #fff;
  cursor: pointer;
  font-size: .8rem;
  font-weight: bold;
  text-transform: uppercase;
  transition: background-color 0.3s ease;
  font-family: var(--body-font); 

  &:hover {
    background-color: #333;
  }
`;

const mediaItemsContainerId = 'media-items-container';

interface PressArticle {
  id: string;
  title: string;
  publication: string;
  url: string;
  excerpt: string;
  image?: string | null; 
  tag?: string;   
}

const MediaSection: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState(4); 
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

  useEffect(() => {
    const placeholderImage = '/uploads/default-press-image.webp'; 

    const transformedArticles: MediaItem[] = (pressArticlesData as PressArticle[]).map(article => ({
      id: article.id,
      tag: article.tag || 'Presse', 
      source: article.publication, 
      image: article.image || placeholderImage, 
      title: article.title,
      description: article.excerpt, 
      link: article.url,
    }));

    setMediaItems(transformedArticles);
  }, []); 

  const showMoreItems = () => {
    setVisibleItems(prev => prev + 4);
  };

  return (
    <PresseSectionWrapper id="presse">
      <SectionTitle 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        Presse
      </SectionTitle>
      <BeigeBackgroundContainer>
        <ContentWrapper>
          {mediaItems.length > 0 ? (
            <MediaGrid
              id={mediaItemsContainerId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delayChildren: 0.1, staggerChildren: 0.05 }}
            >
              {mediaItems.slice(0, visibleItems).map(item => (
                <MediaCard
                  key={item.id}
                  item={item} 
                />
              ))}
            </MediaGrid>
          ) : (
            <p>Aktuell sind keine Presseartikel verfügbar.</p> 
          )}
          {visibleItems < mediaItems.length && (
            <LoadMoreButton onClick={showMoreItems}>Mehr laden</LoadMoreButton>
          )}
        </ContentWrapper>
      </BeigeBackgroundContainer>
    </PresseSectionWrapper>
  );
};

export default MediaSection;