const fs = require('fs-extra');
const path = require('path');
const matter = require('gray-matter');

const pressContentDir = path.join(__dirname, '..', 'src', 'content', 'press');
const outputDir = path.join(__dirname, '..', 'src', 'generated');
const outputFile = path.join(outputDir, 'pressArticles.json');

async function generatePressData() {
  try {
    await fs.ensureDir(outputDir);
    
    let files = [];
    try {
      files = await fs.readdir(pressContentDir);
    } catch (err) {
      await fs.ensureDir(pressContentDir);
      files = [];
    }
    
    const mdFiles = files.filter(file => file.endsWith('.md'));
    const articles = [];
    const warnings = [];

    for (const mdFile of mdFiles) {
      const filePath = path.join(pressContentDir, mdFile);
      let fileContent = '';
      
      try {
        fileContent = await fs.readFile(filePath, 'utf8');
      } catch (err) {
        continue;
      }

      let data = {};
      let content = '';
      
      try {
        const parsed = matter(fileContent);
        data = parsed.data;
        content = parsed.content;
      } catch (err) {
        warnings.push(`Could not parse frontmatter in ${mdFile}: ${err.message}`);
        continue;
      }

      const defaultTitle = mdFile
        .replace(/^\d{4}-\d{2}-\d{2}-/, '')
        .replace(/\.md$/, '')
        .replace(/-/g, ' ')
        .split(' ')                            
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
        .join(' ');                            

      let imagePath = data.image || null;
      
      if (imagePath) {
        imagePath = imagePath.replace(/^\/+/, '').replace(/^public\//, '');
        
        if (!imagePath.startsWith('uploads/')) {
          imagePath = 'uploads/' + imagePath;
        }
        
        imagePath = '/' + imagePath;
        
        if (!imagePath.includes('-small.webp')) {
          const baseName = imagePath.replace(/\.[^/.]+$/, '');
          imagePath = baseName + '-small.webp';
        }
      }

      const article = {
        id: mdFile.replace(/\.md$/, ''),             
        title: data.title || defaultTitle,           
        publication: data.publication || 'Unbekannte Quelle',  
        url: data.url || '#',                        
        excerpt: data.excerpt || (content.trim() ? content.substring(0, 150) + (content.length > 150 ? '...' : '') : 'Kein Auszug verfügbar'), 
        image: imagePath
      };
      
      if (!data.title) warnings.push(`Used filename-based title for ${mdFile} because no title field found in frontmatter`);

      articles.push(article);
    }

    articles.sort((a, b) => {
      const isANtv = a.publication === 'n-tv.de';
      const isBNtv = b.publication === 'n-tv.de';

      if (isANtv && !isBNtv) {
        return -1;
      }
      if (!isANtv && isBNtv) {
        return 1;
      }
      return a.title.localeCompare(b.title);
    });

    const maxArticles = Math.min(articles.length, 10); 
    const finalArticles = articles.slice(0, maxArticles);

    await fs.writeFile(outputFile, JSON.stringify(finalArticles, null, 2));

  } catch (error) {
    if (error.code === 'ENOENT' && error.path === pressContentDir) {
      await fs.ensureDir(outputDir);
      await fs.writeFile(outputFile, JSON.stringify([], null, 2));
    }
  }
}

generatePressData();
