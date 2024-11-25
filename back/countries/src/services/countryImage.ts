import { CustomSearchResponse } from '../interfaces/FetchExterne';

export async function fetchImages(target: string = 'France', type: string) {
  const apiKey = process.env.GOOGLE_KEY; // Remplace par ta clé API Google
  const cx = process.env.CX; // Remplace par ton identifiant CX de moteur de recherche personnalisé
  const query = type === 'city' ? `Monument ${target}` : `paysages de ${target}`;
  const searchType = 'image';
  const numResults = 1; // Nombre de résultats que tu veux récupérer (max 10 par requête)

  const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&cx=${cx}&key=${apiKey}&searchType=${searchType}&num=${numResults}`;

  try {
    const response: Response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data: Promise<CustomSearchResponse> = await response.json();

    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des images:', error);
  }
}
