const fs = require('fs-extra');
const path = require('path');
const matter = require('gray-matter');

const logosDir = path.join(process.cwd(), 'src', 'content', 'partner_logos');
const outputDir = path.join(process.cwd(), 'public', 'data');
const outputFilePath = path.join(outputDir, 'partnerLogosData.json');

async function generatePartnerLogosData() {
  try {
    await fs.ensureDir(outputDir);
    const files = await fs.readdir(logosDir);
    const markdownFiles = files.filter(file => file.endsWith('.md'));

    const logos = [];

    for (const file of markdownFiles) {
      const filePath = path.join(logosDir, file);
      const fileContent = await fs.readFile(filePath, 'utf8');
      const { data } = matter(fileContent);

      if (!data.name || !data.image || !data.alt_text) {
        continue;
      }

      logos.push({
        name: data.name,
        image: data.image,
        alt_text: data.alt_text,
        order: data.order === undefined ? 100 : Number(data.order),
      });
    }

    logos.sort((a, b) => a.order - b.order);

    await fs.writeFile(outputFilePath, JSON.stringify(logos, null, 2));

  } catch (error) {
    if (error.code === 'ENOENT' && error.path === logosDir) {
      await fs.ensureDir(outputDir);
      await fs.writeFile(outputFilePath, JSON.stringify([], null, 2));
    }
  }
}

generatePartnerLogosData();
