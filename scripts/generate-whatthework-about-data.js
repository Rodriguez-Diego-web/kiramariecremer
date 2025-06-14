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
      text_block_1: data.text_block_1 || content.split('\n\n')[0] || '',
      text_block_2: data.text_block_2 || content.split('\n\n')[1] || '',
      image: data.image || null,
      profile_image: data.image || null,
      buttonText: data.buttonText || data.button_text || null,
      buttonLink: data.buttonLink || data.button_link || null,
      button_text: data.button_text || data.buttonText || null,
      button_link: data.button_link || data.buttonLink || null,
    };

    await fs.writeFile(outputFilePath, JSON.stringify(aboutData, null, 2));

  } catch (error) {
    const fallbackData = {
      headline: 'Das ist WHAT THE WORK?!',
      subHeadline: null,
      body: 'Inhalt wird geladen...',
      text_block_1: 'Inhalt wird geladen...',
      text_block_2: '',
      image: null,
      profile_image: null,
      buttonText: null,
      buttonLink: null,
      button_text: null,
      button_link: null,
    };

    await fs.ensureDir(outputDir);
    await fs.writeFile(outputFilePath, JSON.stringify(fallbackData, null, 2));
  }
}

generateAboutData();
