import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';

const Impressum: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Impressum - Kira Marie Cremer</title>
        <meta name="description" content="Impressum und rechtliche Informationen zu kira-marie.com" />
      </Helmet>
      <Container>
        <Content>
          <Title>Impressum</Title>
          <LastUpdated>Stand: {new Date().toLocaleDateString('de-DE')}</LastUpdated>
          
          <Section>
            <SectionTitle>Angaben gemäß § 5 TMG</SectionTitle>
            <Text>
              Kira Marie Cremer<br />
              <br />
              E-Mail: hi@kiramariecremer.de<br />
              Website: www.kiramariecremer.de/
            </Text>
          </Section>

          <Section>
            <SectionTitle>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</SectionTitle>
            <Text>
              Kira Marie Cremer<br />
              E-Mail: hi@kiramariecremer.de
            </Text>
          </Section>

          <Section>
            <SectionTitle>Haftung für Inhalte</SectionTitle>
            <Text>
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen 
              Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind 
              wir als Diensteanbieter jedoch nicht unter der Verpflichtung, übermittelte oder 
              gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, 
              die auf eine rechtswidrige Tätigkeit hinweisen.
            </Text>
            <Text>
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach 
              den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung 
              ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung 
              möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese 
              Inhalte umgehend entfernen.
            </Text>
          </Section>

          <Section>
            <SectionTitle>Haftung für Links</SectionTitle>
            <Text>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir 
              keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine 
              Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige 
              Anbieter oder Betreiber der Seiten verantwortlich.
            </Text>
            <Text>
              Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche 
              Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der 
              Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten 
              Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht 
              zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links 
              umgehend entfernen.
            </Text>
          </Section>

          <Section>
            <SectionTitle>Urheberrecht</SectionTitle>
            <Text>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten 
              unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, 
              Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes 
              bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </Text>
            <Text>
              Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen 
              Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber 
              erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden 
              Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine 
              Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden 
              Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte 
              umgehend entfernen.
            </Text>
          </Section>
        </Content>
      </Container>
    </>
  );
};

const Container = styled.div`
  min-height: 100vh;
  padding: 120px 20px 80px;
  background-color: #fafafa;
`;

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 10px;
  font-weight: 600;
`;

const LastUpdated = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 30px;
`;

const Section = styled.section`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 1.4rem;
  color: #333;
  margin-bottom: 15px;
  font-weight: 600;
`;

const Text = styled.p`
  line-height: 1.6;
  color: #555;
  margin-bottom: 15px;

  a {
    color: #cdaffd;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default Impressum; 