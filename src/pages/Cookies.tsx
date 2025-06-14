import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Montserrat', sans-serif;
  line-height: 1.6;
  color: #333;
`;

const Title = styled.h1`
  font-family: 'Kingdom', sans-serif;
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #000;
`;

const Section = styled.section`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #000;
`;

const Paragraph = styled.p`
  margin-bottom: 15px;
`;

const List = styled.ul`
  margin-left: 20px;
  margin-bottom: 15px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  
  th, td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
  }
  
  th {
    background-color: #f5f5f5;
    font-weight: 600;
  }
`;

const Cookies: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Cookie-Richtlinie - Kira Marie Cremer</title>
        <meta name="description" content="Informationen über die Verwendung von Cookies auf kira-marie.com" />
      </Helmet>
      <Container>
          <Title>Cookie-Richtlinie</Title>
          
          <Section>
            <SectionTitle>Was sind Cookies?</SectionTitle>
          <Paragraph>
            Cookies sind kleine Textdateien, die auf Ihrem Gerät gespeichert werden, wenn Sie eine Website besuchen.
            Sie helfen dabei, die Website funktionsfähig zu machen und Ihre Nutzererfahrung zu verbessern.
          </Paragraph>
          </Section>

          <Section>
            <SectionTitle>Welche Cookies verwenden wir?</SectionTitle>
            
          <Table>
            <thead>
              <tr>
                <th>Cookie-Typ</th>
                <th>Zweck</th>
                <th>Speicherdauer</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Technisch notwendige Cookies</strong></td>
                <td>Grundlegende Website-Funktionen, Service Worker für Caching</td>
                <td>Session / 1 Jahr</td>
              </tr>
              <tr>
                <td><strong>Beehiiv Newsletter</strong></td>
                <td>Newsletter-Anmeldung und -Verwaltung</td>
                <td>Nach Beehiiv-Richtlinien</td>
              </tr>
            </tbody>
          </Table>
          </Section>

          <Section>
          <SectionTitle>Externe Dienste</SectionTitle>
          <Paragraph>
            <strong>Beehiiv Newsletter:</strong> Für unseren Newsletter nutzen wir Beehiiv.
            Beim Anmelden für den Newsletter können Cookies von Beehiiv gesetzt werden.
          </Paragraph>
          <Paragraph>
            <strong>GitHub (CMS):</strong> Unser Content Management System nutzt GitHub als Backend.
            Dies betrifft nur Administratoren, nicht normale Website-Besucher.
          </Paragraph>
          </Section>

          <Section>
          <SectionTitle>Hosting</SectionTitle>
          <Paragraph>
            Diese Website wird über byts.tech gehostet. Der Hosting-Provider kann technisch notwendige Cookies
            für die Bereitstellung der Website setzen.
          </Paragraph>
          <Paragraph>
            Weitere Informationen finden Sie in der Datenschutzerklärung von byts.tech.
          </Paragraph>
          </Section>

          <Section>
          <SectionTitle>Ihre Kontrolle über Cookies</SectionTitle>
          <Paragraph>
            Sie können Cookies in Ihren Browser-Einstellungen verwalten:
          </Paragraph>
          <List>
            <li>Cookies vollständig blockieren</li>
            <li>Cookies vor dem Setzen bestätigen lassen</li>
            <li>Bereits gesetzte Cookies löschen</li>
            <li>Cookies beim Schließen des Browsers automatisch löschen</li>
          </List>
          <Paragraph>
            Bitte beachten Sie, dass das Blockieren von Cookies die Funktionalität der Website beeinträchtigen kann.
          </Paragraph>
          </Section>

          <Section>
            <SectionTitle>Kontakt</SectionTitle>
          <Paragraph>
            Bei Fragen zu unserer Cookie-Richtlinie können Sie uns kontaktieren:<br />
            E-Mail: hi@kiramariecremer.de
          </Paragraph>
          </Section>

        <Paragraph style={{ marginTop: '40px', fontSize: '0.9rem', color: '#666' }}>
          Stand: Dezember 2024
        </Paragraph>
      </Container>
    </>
  );
};

export default Cookies; 