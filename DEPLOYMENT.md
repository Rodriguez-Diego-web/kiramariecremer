# Deployment Setup für byts.tech Server

## 🚀 Übersicht

Das System verwendet **GitHub Webhooks** für automatisches Deployment:
1. Push auf `main` branch → GitHub sendet Webhook
2. Server führt `git pull` aus
3. Server führt `build.sh` aus → Website wird gebaut
4. Fertig! ✅

## 📋 Server Setup (für Florian)

### 1. Repository klonen
```bash
cd /path/to/webroot
git clone https://github.com/Rodriguez-Diego-web/kiramariecremer.git .
```

### 2. Node.js Dependencies installieren
```bash
npm ci
```

### 3. Ersten Build ausführen
```bash
chmod +x build.sh
./build.sh
```

### 4. Webserver konfigurieren
- **Document Root**: `/path/to/webroot/public_html/`
- Die Website wird nach dem Build in `public_html/` verfügbar sein

### 5. GitHub Webhook einrichten

**In GitHub Repository Settings > Webhooks:**
- **Payload URL**: `https://domain.de/webhook.php`
- **Content type**: `application/json`
- **Events**: "Just the push event"
- **Active**: ✅

## 🔧 Wie es funktioniert

### Automatischer Deployment-Prozess:
1. **Developer pusht Code** → GitHub Repository
2. **GitHub sendet Webhook** → `webhook.php`
3. **Server führt aus**:
   ```bash
   git pull origin main
   ./build.sh
   ```
4. **Website ist aktualisiert** 🎉

### Build-Prozess (`build.sh`):
1. `npm ci` - Dependencies installieren
2. Alle Daten-Scripts ausführen (Podcast, Press, etc.)
3. `npm run build` - React App builden
4. `build/` → `public_html/` verschieben

## 📁 Verzeichnis-Struktur auf Server

```
/path/to/webroot/
├── public_html/          # ← Webserver Document Root
│   ├── index.html
│   ├── static/
│   └── ...
├── src/                  # React Source Code
├── scripts/              # Daten-Generierungs-Scripts
├── build.sh             # Build-Script
├── webhook.php          # Webhook-Handler
├── webhook.log          # Deployment-Logs
└── package.json
```

## 🐛 Debugging

### Logs prüfen:
```bash
tail -f webhook.log
```

### Manueller Build:
```bash
./build.sh
```

### Git Status prüfen:
```bash
git status
git log --oneline -5
```

## ⚙️ Konfiguration

### Webhook-Handler anpassen:
In `webhook.php` den Pfad anpassen falls nötig:
```php
$websiteDir = __DIR__; // Aktuelles Verzeichnis
```

### Build-Script anpassen:
In `build.sh` den Ziel-Ordner ändern falls nötig:
```bash
mv build public_html  # oder anderer Name
```

## 🔒 Sicherheit

- Webhook läuft nur bei Push auf `main` branch
- Alle Aktionen werden geloggt
- Fehler werden mit HTTP Status Codes gemeldet

## 📞 Support

Bei Problemen:
1. `webhook.log` prüfen
2. Manuell `./build.sh` ausführen
3. GitHub Webhook Delivery History prüfen 