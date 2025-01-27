/* eslint-disable */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    this.handleRequest = this.handleRequest.bind(this);
    this.handleError = this.handleError.bind(this);

    // Ajouter des intercepteurs
    this.client.interceptors.request.use(this.handleRequest as any, this.handleError);

    this.client.interceptors.response.use(this.handleResponse, this.handleError);
  }

  // Gestion des requêtes
  private handleRequest(config: AxiosRequestConfig): AxiosRequestConfig {
    // Vous pouvez ajouter des en-têtes ou des tokens ici
    // config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  }

  // Gestion des réponses
  private handleResponse(response: AxiosResponse): AxiosResponse {
    return response;
  }

  // Gestion des erreurs
  private handleError(error: any): Promise<any> {
    // Gérer les erreurs globales ici (par ex. rafraîchir un token expiré)
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }

  // Méthodes pour appeler l'API
  public get<T>(url: string, params?: object): Promise<T> {
    return this.client.get(url, { params }).then((res) => res.data);
  }

  public post<T>(url: string, data?: object): Promise<T> {
    return this.client.post(url, data).then((res) => res.data);
  }

  public put<T>(url: string, data?: object): Promise<T> {
    return this.client.put(url, data).then((res) => res.data);
  }

  public delete<T>(url: string): Promise<T> {
    return this.client.delete(url).then((res) => res.data);
  }
}

export default ApiClient;
