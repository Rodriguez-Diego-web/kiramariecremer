import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface FeedItemData {
  guid: string;
  title: string;
  link: string;
  pubDate: string;
  isoDate: string;
  imageUrl: string | null;
  creator: string;
  description: string;
  categories: string[];
}

const FALLBACK_IMAGE_URL = '/uploads/default-newsletter-image.webp'; 

const SectionWrapper = styled.section`
  padding: 80px 20px;
  background-color: #8facff; 
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-family: 'kingdom', sans-serif;
  font-size: 3rem;
  font-weight: normal;
  color: #000000;
  margin-top: -115px; 
  margin-bottom: 13px;
  padding: 5.5px 20px;
  display: inline-block;
  border-radius: 0;
  position: relative;
  z-index: 1;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50%;
    background-color: #f7c948;
    z-index: -1;
    border-radius: 0;
  }
  
  @media (min-width: 821px) and (max-width: 1024px) {
    &::after {
      bottom: 25px !important;
    }
  }

  .mobile-title {
    display: none;
  }

  .desktop-title {
    display: inline;
  }
  
  @media (min-width: 768px) and (max-width: 820px) {
    font-size: 3.2rem; 
    margin-top: -117px;
    padding: 6px 20px; 
    
    &::after {
      height: 50%; 
    }
  }
  
    @media (min-width: 821px) and (max-width: 1024px) {
    font-size: 3.5rem; 
    margin-top: -117px;
    padding: 8px 25px; 
    
    &::after {
      height: 50% !important;
      bottom: 20px !important;
    }
  }
  
  @media (min-width: 1025px) {
    margin-top: -113px; 
    font-size: 3.2rem;
  }

  @media (max-width: 767px) {
    font-size: 2rem;
    margin-top: -105px; 
    
    .mobile-title {
      display: inline;
    }

    .desktop-title {
      display: none;
    }
  }

  @media (max-width: 480px) {
    font-size: 2.3rem;
    margin-top: -108px;
  }
`;

const FeedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  max-width: 1200px;
  width: 100%;
  margin-top: 40px;

  @media (max-width: 991px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const FeedCard = styled.a`
  background-color: #fff;
  border-radius: 0; 
  padding: 0; 
  text-decoration: none;
  position: relative; 
  color: inherit;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  min-height: 400px; 

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 0; 
  margin-bottom: 15px;
  background-color: #f0f0f0; 
  border-top-left-radius: 0; 
  border-top-right-radius: 0;
`;

const CardContentWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1; 
`;

const CardCategoryContainer = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  display: flex;
  gap: 5px;
  z-index: 1;
`;

const CategoryTag = styled.span`
  background-color: rgba(0,0,0,0.6);
  color: white;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  padding: 3px 8px;
    border-radius: 0; 
  text-transform: uppercase;
`;

const CardIconsContainer = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  display: flex;
  gap: 8px;
  z-index: 1;
  span {
    font-size: 1.2rem; 
    color: #555;
  }
`;

const CardDate = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  color: #777;
  margin-bottom: 8px;
`;

const CardTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px; 
`;

const CardDescription = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  line-height: 1.5;
  color: #555;
  margin-bottom: 15px;
  flex-grow: 1;
`;

const CardAuthorWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: auto; 
`;

const AuthorImagePlaceholder = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%; 
  background-color: #ccc; 
`;

const CardAuthor = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  color: #555;
`;

const LoadMoreButton = styled.button`
  margin-top: 50px;
  padding: 12px 30px;
  background-color: #f7c948; 
  color: #333;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 0; 
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e6b840;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-family: 'Montserrat', sans-serif;
`;

const LoadingMessage = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
`;

const BeehiivFeedSection: React.FC = () => {
  const [feedItems, setFeedItems] = useState<FeedItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleItemsCount, setVisibleItemsCount] = useState(6);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/data/beehiivFeedData.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFeedItems(data);
      } catch (e) {
        console.error('Failed to fetch Beehiiv feed data:', e);
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('Ein unbekannter Fehler ist aufgetreten.');
        }
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleLoadMore = () => {
    setVisibleItemsCount((prev) => prev + 6);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString('de-DE', {
        day: '2-digit',
        month: 'long', 
        year: 'numeric',
      });
    } catch (e) {
      return dateString; 
    }
  };

  if (loading) {
    return <SectionWrapper><LoadingMessage>Lade Newsletter...</LoadingMessage></SectionWrapper>;
  }

  if (error) {
    return <SectionWrapper><ErrorMessage>Fehler beim Laden: {error}</ErrorMessage></SectionWrapper>;
  }

  return (
    <SectionWrapper>
      <SectionTitle>
        <span className="desktop-title">Letzte Newsletter-Ausgaben</span>
        <span className="mobile-title">Letzte Ausgaben</span>
      </SectionTitle>
      <FeedGrid>
        {feedItems.slice(0, visibleItemsCount).map((item, index) => (
          <FeedCard key={item.link || index} href={item.link} target="_blank" rel="noopener noreferrer">
            <CardCategoryContainer>
              {item.categories && item.categories.slice(0, 1).map(cat => (
                <CategoryTag key={cat}>{cat}</CategoryTag>
              ))}
            </CardCategoryContainer>
            <CardIconsContainer>
              <span>❤</span> 
              <span>💬</span>
            </CardIconsContainer>
            <CardImage 
              src={item.imageUrl || FALLBACK_IMAGE_URL} 
              alt={item.title || 'Feed item image'} 
              onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE_URL)}
            />
            <CardContentWrapper>
              <CardDate>{formatDate(item.isoDate || item.pubDate)}</CardDate>
              <CardTitle>{item.title || 'Kein Titel'}</CardTitle>
              <CardDescription>{item.description || 'Keine Beschreibung verfügbar.'}</CardDescription>
              <CardAuthorWrapper>
                <AuthorImagePlaceholder /> 
                <CardAuthor>{item.creator || 'Kira Marie Cremer'}</CardAuthor>
              </CardAuthorWrapper>
            </CardContentWrapper>
          </FeedCard>
        ))}
      </FeedGrid>
      {visibleItemsCount < feedItems.length && (
        <LoadMoreButton onClick={handleLoadMore}>Mehr laden</LoadMoreButton>
      )}
    </SectionWrapper>
  );
};

export default BeehiivFeedSection;
