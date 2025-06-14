const fs = require('fs-extra');
const path = require('path');
const matter = require('gray-matter');

const seoDir = path.join(process.cwd(), 'src', 'content', 'seo');
const outputDir = path.join(process.cwd(), 'public', 'data');

async function generateSeoData() {
  try {
    await fs.ensureDir(outputDir);

    const homeSeoPath = path.join(seoDir, 'home.md');
    const funkeFeedSeoPath = path.join(seoDir, 'funke-feed.md');

    let homeSeoData = {
      title: 'Kira Marie - Leadership & Vertrauensexpertin',
      description: 'Kira Marie ist Ihre Expertin für Leadership und Vertrauen.',
      og_image: null
    };

    let funkeFeedSeoData = {
      title: 'Aktuelle Beiträge von Kira Marie bei Funke',
      description: 'Entdecken Sie die neuesten Artikel von Kira Marie.',
      og_image: null
    };

    try {
      const homeSeoContent = await fs.readFile(homeSeoPath, 'utf8');
      const homeData = matter(homeSeoContent).data;
      homeSeoData = {
        title: homeData.title || homeSeoData.title,
        description: homeData.description || homeSeoData.description,
        og_image: homeData.og_image || homeSeoData.og_image
      };
    } catch (error) {
      //
    }

    try {
      const funkeFeedSeoContent = await fs.readFile(funkeFeedSeoPath, 'utf8');
      const funkeData = matter(funkeFeedSeoContent).data;
      funkeFeedSeoData = {
        title: funkeData.title || funkeFeedSeoData.title,
        description: funkeData.description || funkeFeedSeoData.description,
        og_image: funkeData.og_image || funkeFeedSeoData.og_image
      };
    } catch (error) {
      //
    }

    const homeSeoOutputPath = path.join(outputDir, 'homeSeoData.json');
    const funkeFeedSeoOutputPath = path.join(outputDir, 'funkeFeedSeoData.json');

    await fs.writeFile(homeSeoOutputPath, JSON.stringify(homeSeoData, null, 2));
    await fs.writeFile(funkeFeedSeoOutputPath, JSON.stringify(funkeFeedSeoData, null, 2));

  } catch (error) {
    //
  }
}

generateSeoData();
