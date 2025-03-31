import { CustomSearchResponse } from '../interfaces/FetchExterne';

// Limitation de débit
class RateLimiter {
  private queue: Array<() => Promise<void>> = [];
  private isProcessing = false;
  private rateLimitMs: number;

  constructor(requestsPerSecond: number) {
    // Calcule l'intervalle entre les requêtes en millisecondes
    this.rateLimitMs = 1000 / requestsPerSecond;
  }

  async add<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await fn();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });

      if (!this.isProcessing) {
        void this.processQueue();
      }
    });
  }

  private async processQueue(): Promise<void> {
    if (this.queue.length === 0) {
      this.isProcessing = false;
      return;
    }

    this.isProcessing = true;
    const task = this.queue.shift();
    
    if (task) {
      try {
        await task();
      } catch (error) {
        console.error('Error in rate limited task:', error);
      }

      // Attendre avant la prochaine requête
      await new Promise(resolve => setTimeout(resolve, this.rateLimitMs));
      
      // Traite la requête suivante
      await this.processQueue();
    }
  }
}

// Instance du rate limiter - 5 requêtes/seconde max
const imageFetchLimiter = new RateLimiter(5);

// Fonction de récupération d'images avec limitation de débit
export async function fetchImages(target: string = 'France', type: string): Promise<CustomSearchResponse | null> {
  const apiKey = process.env.GOOGLE_KEY;
  const cx = process.env.CX;
  const query = type === 'city' ? `Monument ${target}` : `paysages de ${target}`;
  const searchType = 'image';
  const numResults = 1;

  const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&cx=${cx}&key=${apiKey}&searchType=${searchType}&num=${numResults}`;

  return imageFetchLimiter.add(async () => {
    try {
      // Ajout d'une gestion de retries avec backoff exponentiel
      let retries = 3;
      let retryDelay = 1000; // 1 seconde initiale
      
      while (retries > 0) {
        const response: Response = await fetch(url);
        
        if (response.ok) {
          return await response.json() as CustomSearchResponse;
        } 
        
        if (response.status === 429) {
          // Si on reçoit un 429, on attend plus longtemps avant de réessayer
          console.log(`Rate limited (429), retrying in ${retryDelay/1000} seconds... (${retries} attempts left)`);
          await new Promise(resolve => setTimeout(resolve, retryDelay));
          retryDelay *= 2; // Backoff exponentiel
          retries--;
        } else {
          // Pour les autres erreurs, on arrête immédiatement
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
      }
      
      throw new Error('Trop de tentatives échouées en raison de la limitation de débit');
    } catch (error) {
      console.error('Erreur lors de la récupération des images:', error);
      return null;
    }
  });
}

// Cache simple pour éviter de refaire des requêtes pour les mêmes pays
const imageCache: Record<string, string> = {};

export async function fetchImagesWithCache(target: string = 'France', type: string): Promise<string | null> {
  const cacheKey = `${target}:${type}`;
  
  // Vérifier si l'image est déjà dans le cache
  if (imageCache[cacheKey]) {
    return imageCache[cacheKey];
  }
  
  // Sinon, faire la requête
  const result = await fetchImages(target, type);
  
  if (result?.items?.[0]?.link) {
    // Stocker dans le cache
    imageCache[cacheKey] = result.items[0].link;
    return result.items[0].link;
  }
  
  return null;
}