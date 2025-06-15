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

# Manually copy public assets that React doesn't copy automatically
echo "📂 Copying additional assets from public/..."
if [ -d "public/images" ]; then
    cp -r public/images public_html/
    echo "✅ Images copied"
fi

if [ -d "public/fonts" ]; then
    cp -r public/fonts public_html/
    echo "✅ Fonts copied"
fi

if [ -d "public/videos" ]; then
    cp -r public/videos public_html/
    echo "✅ Videos copied"
fi

if [ -d "public/uploads" ]; then
    cp -r public/uploads public_html/
    echo "✅ Uploads copied"
fi

if [ -d "public/data" ]; then
    cp -r public/data public_html/
    echo "✅ Data files copied"
fi

# Copy admin directory for CMS
if [ -d "public/admin" ]; then
    cp -r public/admin public_html/
    echo "✅ Admin CMS copied"
else
    echo "❌ ERROR: No admin directory found!"
fi

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

# Copy asset configuration for server admin
if [ -f "apache-assets-config.txt" ]; then
    cp apache-assets-config.txt public_html/apache-assets-config.txt
    echo "✅ Apache asset configuration copied for server admin reference"
else
    echo "⚠️ No apache-assets-config.txt found"
fi

# Copy nginx configuration for server admin
if [ -f "nginx-spa-config.txt" ]; then
    cp nginx-spa-config.txt public_html/nginx-spa-config.txt
    echo "✅ Nginx SPA configuration copied for server admin"
else
    echo "⚠️ No nginx-spa-config.txt found"
fi

# List final structure
echo "📂 Final public_html structure:"
ls -la public_html/ | head -10

# Check for specific assets that were causing 404 errors
echo ""
echo "🔍 Asset Verification:"
echo "Checking for critical assets..."

# Check fonts
if [ -f "public_html/fonts/optimized/Kingdom-Regular.woff2" ]; then
    echo "✅ Kingdom-Regular.woff2 found ($(ls -lh public_html/fonts/optimized/Kingdom-Regular.woff2 | awk '{print $5}'))"
else
    echo "❌ Kingdom-Regular.woff2 MISSING"
fi

if [ -f "public_html/fonts/optimized/Kingdom-Regular.woff" ]; then
    echo "✅ Kingdom-Regular.woff found ($(ls -lh public_html/fonts/optimized/Kingdom-Regular.woff | awk '{print $5}'))"
else
    echo "❌ Kingdom-Regular.woff MISSING"
fi

# Check images
if [ -f "public_html/images/KMClogo.webp" ]; then
    echo "✅ KMClogo.webp found"
else
    echo "❌ KMClogo.webp MISSING"
fi

if [ -f "public_html/uploads/img_5189.jpg" ]; then
    echo "✅ img_5189.jpg found in uploads"
else
    echo "❌ img_5189.jpg MISSING in uploads"
fi

if [ -f "public_html/uploads/img_5998.jpg" ]; then
    echo "✅ img_5998.jpg found in uploads"
else
    echo "❌ img_5998.jpg MISSING in uploads"
fi

if [ -f "public_html/uploads/img2.jpg" ]; then
    echo "✅ img2.jpg found in uploads"
else
    echo "❌ img2.jpg MISSING in uploads"
fi

echo "✅ Build complete! Website ready in public_html/"
echo "🌐 Website can now be served from public_html/" 
echo ""
echo "🔍 SPA Routing Debug Info:"
echo "- .htaccess should be in public_html/.htaccess"
echo "- Test routes: /whatthework, /funke-rss"
echo "- If still 404: Check Apache AllowOverride and mod_rewrite" 