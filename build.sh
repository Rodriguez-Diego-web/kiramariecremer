#!/bin/bash

echo "🚀 Starting build process..."


echo "📦 Installing dependencies..."
npm install


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


echo "🏗️ Building website..."
npm run build


echo "📁 Preparing build directory..."
if [ -d "public_html" ]; then
    rm -rf public_html
fi
mv build public_html

echo "✅ Build complete! Website ready in public_html/"
echo "🌐 Website can now be served from public_html/" 