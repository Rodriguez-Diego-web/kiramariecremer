const fs = require('fs-extra');
const path = require('path');
const matter = require('gray-matter');

const aboutContentPath = path.join(process.cwd(), 'src', 'content', 'about.md');
const outputDir = path.join(process.cwd(), 'public', 'data');
const outputFilePath = path.join(outputDir, 'aboutData.json');

const resolveImagePath = (imagePath, fieldName) => {
  return imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
};

async function generateAboutData() {
  try {
    await fs.ensureDir(outputDir);

    const fileContent = await fs.readFile(aboutContentPath, 'utf8');
    const { data, content } = matter(fileContent);

    const aboutData = {
      page_title: data.page_title || 'Über Mich',
      name_for_tag_and_headline: data.name_for_tag_and_headline || 'Kira Marie Cremer',
      headline_main_text: data.headline_main_text || 'ist eine der führenden deutschen Stimmen im Bereich New Work.',
      profile_image: data.profile_image || null,
      left_image_1: data.left_image_1 || null,
      left_image_2: data.left_image_2 || null,
      right_image: data.right_image || null,
      body: content || ''
    };

    await fs.writeFile(outputFilePath, JSON.stringify(aboutData, null, 2));

  } catch (error) {
    const fallbackData = {
      page_title: 'Über Mich',
      name_for_tag_and_headline: 'Kira Marie Cremer',
      headline_main_text: 'ist eine der führenden deutschen Stimmen im Bereich New Work.',
      profile_image: null,
      left_image_1: null,
      left_image_2: null,
      right_image: null,
      body: 'Inhalt wird geladen...'
    };

    await fs.ensureDir(outputDir);
    await fs.writeFile(outputFilePath, JSON.stringify(fallbackData, null, 2));
  }
}

generateAboutData();
