// Paramètres de l'API
const apiKey = process.env.GOOGLE_KEY;  // Remplace par ta clé API Google
const cx = process.env.CX;  // Remplace par ton identifiant CX de moteur de recherche personnalisé
const query = 'landscape France';  // Remplace 'France' par le pays que tu veux rechercher
const searchType = 'image';
const numResults = 1;  // Nombre de résultats que tu veux récupérer (max 10 par requête)

// URL de l'API Google Custom Search
const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&cx=${cx}&key=${apiKey}&searchType=${searchType}&num=${numResults}`;

// Fonction pour faire la requête à l'API
async function fetchImages() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    const data = await response.json();

    // Afficher les résultats
    data.items.forEach((item: any) => {
      console.log(`Title: ${item.title}`);
      console.log(`Image URL: ${item.link}`);
      console.log(`Context Link: ${item.image.contextLink}`);
      console.log('--------------------------------------');
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des images:', error);
  }
}

// Appeler la fonction
fetchImages();