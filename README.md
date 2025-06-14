# Kira Marie Cremer Website

Eine moderne React-Website für Autorin, Dozentin und Podcast-Host Kira Marie Cremer, entwickelt mit TypeScript und optimiert für Performance und SEO.

## 🚀 Technologie-Stack

- **Frontend**: React 18 mit TypeScript
- **Styling**: Styled Components
- **Animationen**: Framer Motion
- **CMS**: Decap CMS (ehemals Netlify CMS) mit GitHub Backend
- **Build Tool**: Vite
- **Deployment**: GitHub Actions → SSH zu byts.tech Server

## 📁 Projekt-Struktur

```
kira/
├── public/
│   ├── admin/              # Decap CMS Konfiguration
│   ├── data/               # Generierte JSON-Daten
│   ├── images/             # Optimierte Bilder
│   └── videos/             # Hero-Videos
├── scripts/                # Daten-Generierungs-Scripts
├── src/
│   ├── components/         # React-Komponenten
│   ├── content/            # CMS-Content-Dateien
│   ├── generated/          # Auto-generierte Daten
│   └── pages/              # Seiten-Komponenten
└── .github/workflows/      # GitHub Actions
```

## 🔧 Wichtige Scripts

### Daten-Generierung
Alle Scripts in `/scripts/` generieren JSON-Daten aus Markdown-Content:

```bash
# Alle Daten generieren
npm run generate-data

# Einzelne Daten-Scripts
node scripts/generate-press-data.js          # Presse-Artikel
node scripts/generate-podcast-data.js        # Podcast-Episoden  
node scripts/generate-beehiiv-feed-data.js   # Newsletter-Feed
node scripts/generate-testimonials-data.js   # Testimonials
node scripts/generate-about-data.js          # About-Sektion
node scripts/generate-social-display-data.js # Social Media Zahlen
```

### Development
```bash
npm install          # Dependencies installieren
npm run dev          # Development Server starten
npm run build        # Production Build
npm run preview      # Build-Preview testen
```

## 🎯 Content Management

### Decap CMS
- **URL**: `/admin`
- **Backend**: GitHub Repository `Rodriguez-Diego-web/kiramariecremer`
- **Auth**: GitHub OAuth App (Client ID: `0v231iDR9KJEvauhqnf5`)

### Content-Typen
- **Presse**: Artikel und Medienerwähnungen
- **Podcast**: Episoden mit RSS-Import
- **Testimonials**: Kundenbewertungen
- **About**: Über-Sektion Inhalte
- **Newsletter**: Beehiiv-Integration

## 🚀 Deployment

### GitHub Actions Workflow
Automatisches Deployment bei Push auf `main`:

1. **Build**: `npm run build` erstellt optimierte Dateien
2. **Data Generation**: Alle Scripts generieren aktuelle Daten
3. **SSH Deploy**: Dateien werden zu byts.tech übertragen
4. **Cleanup**: Temporäre Dateien werden entfernt

### Server-Konfiguration
- **Host**: byts.tech
- **Path**: `/var/www/kiramarie`
- **SSH**: Über GitHub Secrets konfiguriert

## 📊 Performance-Features

- **Lazy Loading**: Bilder und Komponenten
- **Code Splitting**: Automatisch durch Vite
- **Image Optimization**: WebP-Format mit Fallbacks
- **Service Worker**: Caching für bessere Performance
- **SEO**: React Helmet für Meta-Tags

## 🔄 Daten-Pipeline

1. **Content**: Wird über Decap CMS in Markdown-Dateien gespeichert
2. **Scripts**: Konvertieren Markdown zu JSON für React-Komponenten
3. **Build**: Vite bundelt alles für Production
4. **Deploy**: GitHub Actions überträgt zum Server

## 🛠 Wartung

### Regelmäßige Tasks
- **Newsletter-Feed**: Automatisch via Beehiiv RSS
- **Podcast-Daten**: Manuell über CMS aktualisierbar
- **Social Media Zahlen und vieles mehr**: Über CMS pflegbar

### Monitoring
- Build-Status über GitHub Actions
- Performance über Lighthouse-Metriken
- Uptime über Server-Monitoring

---

**Entwickelt für professionelle Wartung und einfache Content-Pflege.**
