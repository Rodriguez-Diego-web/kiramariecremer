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

const Datenschutz: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Datenschutzerklärung - Kira Marie Cremer</title>
        <meta name="description" content="Datenschutzerklärung und Informationen zum Umgang mit personenbezogenen Daten auf kira-marie.com" />
      </Helmet>
      <Container>
        <Title>Datenschutzerklärung</Title>
        
        <Section>
          <SectionTitle>1. Verantwortlicher</SectionTitle>
          <Paragraph>
            Verantwortlich für die Datenverarbeitung auf dieser Website ist:<br />
            Kira Marie Cremer<br />
            E-Mail: hi@kiramariecremer.de
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>2. Hosting</SectionTitle>
          <Paragraph>
            Diese Website wird auf einem Server von byts.tech gehostet. Der Anbieter erhebt in sogenannten Logfiles
            folgende Daten, die Ihr Browser übermittelt:
          </Paragraph>
          <List>
            <li>IP-Adresse</li>
            <li>die Adresse der vorher besuchten Website (Referrer-URL)</li>
            <li>Datum und Uhrzeit der Anfrage</li>
            <li>Zeitzonendifferenz zur Greenwich Mean Time</li>
            <li>Inhalt der Anforderung</li>
            <li>HTTP-Statuscode</li>
            <li>übertragene Datenmenge</li>
            <li>Website, von der die Anforderung kommt</li>
            <li>Informationen zu Browser und Betriebssystem</li>
          </List>
          <Paragraph>
            Das ist erforderlich, um unsere Website anzuzeigen und die Stabilität und Sicherheit zu gewährleisten.
            Dies entspricht unserem berechtigten Interesse im Sinne des Art. 6 Abs. 1 lit. f DSGVO.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>3. Content Management System</SectionTitle>
          <Paragraph>
            Wir verwenden Decap CMS mit GitHub als Backend für die Verwaltung unserer Inhalte.
            Dabei werden keine personenbezogenen Daten von Website-Besuchern verarbeitet.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>4. Newsletter (Beehiiv)</SectionTitle>
          <Paragraph>
            Für unseren Newsletter nutzen wir den Dienst Beehiiv. Wenn Sie sich für unseren Newsletter anmelden,
            werden Ihre E-Mail-Adresse und optional weitere Angaben an Beehiiv übertragen.
          </Paragraph>
          <Paragraph>
            Rechtsgrundlage ist Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO.
            Sie können Ihre Einwilligung jederzeit widerrufen, indem Sie sich vom Newsletter abmelden.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>5. Ihre Rechte</SectionTitle>
          <Paragraph>
            Sie haben folgende Rechte:
          </Paragraph>
          <List>
            <li>Recht auf Auskunft über Ihre gespeicherten Daten</li>
            <li>Recht auf Berichtigung unrichtiger Daten</li>
            <li>Recht auf Löschung Ihrer Daten</li>
            <li>Recht auf Einschränkung der Verarbeitung</li>
            <li>Recht auf Datenübertragbarkeit</li>
            <li>Widerspruchsrecht gegen die Verarbeitung</li>
            <li>Recht auf Beschwerde bei einer Aufsichtsbehörde</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>6. Kontakt</SectionTitle>
          <Paragraph>
            Bei Fragen zum Datenschutz können Sie sich jederzeit an uns wenden:<br />
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

export default Datenschutz; 