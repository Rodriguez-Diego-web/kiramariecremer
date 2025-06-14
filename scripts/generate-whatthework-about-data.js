const fs = require('fs-extra');
const path = require('path');
const matter = require('gray-matter');

const aboutContentPath = path.join(process.cwd(), 'src', 'content', 'whatthework-about.md');
const outputDir = path.join(process.cwd(), 'public', 'data');
const outputFilePath = path.join(outputDir, 'whattheworkAboutData.json');

async function generateAboutData() {
  try {
    await fs.ensureDir(outputDir);

    const fileContent = await fs.readFile(aboutContentPath, 'utf8');
    const { data, content } = matter(fileContent);

    const aboutData = {
      headline: data.headline || 'Das ist WHAT THE WORK?!',
      subHeadline: data.subHeadline || null,
      body: content || '',
      image: data.image || null,
      buttonText: data.buttonText || null,
      buttonLink: data.buttonLink || null,
    };

    await fs.writeFile(outputFilePath, JSON.stringify(aboutData, null, 2));

  } catch (error) {
    const fallbackData = {
      headline: 'Das ist WHAT THE WORK?!',
      subHeadline: null,
      body: 'Inhalt wird geladen...',
      image: null,
      buttonText: null,
      buttonLink: null,
    };

    await fs.ensureDir(outputDir);
    await fs.writeFile(outputFilePath, JSON.stringify(fallbackData, null, 2));
  }
}

generateAboutData();
