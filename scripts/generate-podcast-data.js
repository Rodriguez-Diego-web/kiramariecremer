const fs = require('fs');
const path = require('path');

const FUNKE_PODCAST_DATA_PATH = path.join(__dirname, '..', 'public', 'data', 'funkePodcastData.json');
const OUTPUT_FILE = path.join(__dirname, '..', 'public', 'data', 'podcastEpisodes.json');

function convertToCardFormat(funkeData) {
  if (!funkeData || !Array.isArray(funkeData)) {
    return [];
  }

  return funkeData.map((episode, index) => {
    const idSuffix = funkeData.length - index;
    const id = `podcast-${idSuffix}`;
    
    const title = episode?.title || `Episode ${idSuffix}`;
    
    const description = episode?.contentSnippet || episode?.content || episode?.description || 'Keine Beschreibung verfügbar.';
    
    const pubDate = episode?.pubDate || episode?.isoDate || new Date().toISOString();
    const formattedDate = new Date(pubDate).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    let imageUrl = episode?.enclosure?.url || '/uploads/default-podcast-image.webp';
    if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('/')) {
      imageUrl = `/uploads/${imageUrl}`;
    }
    
    const duration = episode?.duration || episode?.itunes?.duration || '40 Minuten';

    return {
      id: id,
      title: title,
      date: formattedDate,
      duration: duration,
      description: description,
      imageUrl: imageUrl,
      altText: `Podcast-Episode: ${title}`
    };
  });
}

async function generatePodcastData() {
  try {
    if (!fs.existsSync(FUNKE_PODCAST_DATA_PATH)) {
      const fallbackEpisodes = [
        {
          id: "podcast-1",
          title: "Willkommen bei New Work Now",
          date: "01.01.2025",
          duration: "30 Minuten",
          description: "In der ersten Episode erklärt Kira Marie Cremer, was Sie bei New Work Now erwartet.",
          imageUrl: "/uploads/default-podcast-image.webp",
          altText: "New Work Now Podcast - Willkommen"
        }
      ];
      
      await fs.promises.writeFile(OUTPUT_FILE, JSON.stringify(fallbackEpisodes, null, 2), 'utf8');
      return;
    }

    const rawData = await fs.promises.readFile(FUNKE_PODCAST_DATA_PATH, 'utf8');
    const funkeData = JSON.parse(rawData);
    
    const episodes = convertToCardFormat(funkeData);
    
    await fs.promises.writeFile(OUTPUT_FILE, JSON.stringify(episodes, null, 2), 'utf8');
    
  } catch (error) {
    const fallbackEpisodes = [
      {
        id: "podcast-1",
        title: "Willkommen bei New Work Now",
        date: "01.01.2025",
        duration: "30 Minuten",
        description: "In der ersten Episode erklärt Kira Marie Cremer, was Sie bei New Work Now erwartet.",
        imageUrl: "/uploads/default-podcast-image.webp",
        altText: "New Work Now Podcast - Willkommen"
      }
    ];
    
    await fs.promises.writeFile(OUTPUT_FILE, JSON.stringify(fallbackEpisodes, null, 2), 'utf8');
  }
}

generatePodcastData();
