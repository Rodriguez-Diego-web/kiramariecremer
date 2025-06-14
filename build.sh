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

echo "🔧 Configuring server files for SPA routing..."

# Ensure .htaccess is in the root
if [ -f "public/.htaccess" ]; then
    cp public/.htaccess public_html/.htaccess
    echo "✅ .htaccess copied to public_html root"
    echo "📄 .htaccess content:"
    head -5 public_html/.htaccess
else
    echo "❌ ERROR: No .htaccess found in public/ directory!"
fi

# Copy web.config for IIS servers
if [ -f "public/web.config" ]; then
    cp public/web.config public_html/web.config
    echo "✅ web.config copied for IIS compatibility"
else
    echo "⚠️ No web.config found"
fi

# List final structure
echo "📂 Final public_html structure:"
ls -la public_html/ | head -10

echo "✅ Build complete! Website ready in public_html/"
echo "🌐 Website can now be served from public_html/"
echo ""
echo "🔍 SPA Routing Debug Info:"
echo "- .htaccess should be in public_html/.htaccess"
echo "- Test routes: /whatthework, /funke-rss"
echo "- If still 404: Check Apache AllowOverride and mod_rewrite" 