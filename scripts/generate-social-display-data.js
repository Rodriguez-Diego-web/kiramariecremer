const fs = require('fs-extra');
const path = require('path');

const inputFilePath = path.join(process.cwd(), 'src', 'content', 'social_stats.json');
const outputDir = path.join(process.cwd(), 'public', 'data');
const outputFilePath = path.join(outputDir, 'socialDisplayData.json');

function formatFollowerCount(name, count) {
  if (count === 0) {
    return null;
  }
  let unit = 'Follower';
  if (name.toLowerCase() === 'spotify') {
    unit = 'Hörer';
  }


  if (count >= 1000000) {
    return (count / 1000000).toFixed(1).replace('.0', '') + 'M ' + unit;
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1).replace('.0', '') + 'K ' + unit;
  } else {
    return count + ' ' + unit;
  }
}

async function generateSocialDisplayData() {
  try {
    await fs.ensureDir(outputDir);

    const inputData = await fs.readJson(inputFilePath);
    
    if (!inputData.platforms || !Array.isArray(inputData.platforms)) {
      throw new Error('Invalid social stats data: platforms array not found');
    }

    const displayData = inputData.platforms.map(platform => {
      if (!platform.name || !platform.count || !platform.url) {
        throw new Error(`Invalid platform data: ${JSON.stringify(platform)}`);
      }

      return {
        name: platform.name,
        count: platform.count.toLocaleString('de-DE'),
        url: platform.url
      };
    });

    await fs.writeFile(outputFilePath, JSON.stringify(displayData, null, 2));

  } catch (error) {
    const fallbackData = [
      { name: 'LinkedIn', count: '25.000', url: 'https://linkedin.com/in/kiramarie' },
      { name: 'Instagram', count: '15.000', url: 'https://instagram.com/kiramarie' },
      { name: 'Spotify', count: '10.000', url: 'https://open.spotify.com/show/kiramarie' }
    ];

    await fs.ensureDir(outputDir);
    await fs.writeFile(outputFilePath, JSON.stringify(fallbackData, null, 2));
  }
}

generateSocialDisplayData();
