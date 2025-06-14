#!/bin/bash

# Build Script für Florians Server
# Wird nach git pull automatisch ausgeführt

echo "🚀 Starting build process..."

# 1. Dependencies installieren
echo "📦 Installing dependencies..."
npm install

# 2. Alle Daten-Scripts ausführen
echo "📊 Generating data files..."
node scripts/generate-press-data.js
node scripts/generate-beehiiv-feed-data.js
node scripts/generate-podcast-data.js
node scripts/generate-testimonials-data.js
node scripts/generate-whatthework-testimonials-data.js
node scripts/generate-partner-logos-data.js
node scripts/generate-about-data.js
node scripts/generate-social-display-data.js
node scripts/generate-seo-data.js
node scripts/generate-whatthework-about-data.js

# 3. Website builden
echo "🏗️ Building website..."
npm run build

# 4. Build-Ordner für Webserver vorbereiten
echo "📁 Preparing build directory..."
if [ -d "public_html" ]; then
    rm -rf public_html
fi
mv build public_html

echo "✅ Build complete! Website ready in public_html/"
echo "🌐 Website can now be served from public_html/" 