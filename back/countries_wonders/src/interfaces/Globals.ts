export interface BodyCountry {
  name: string;
  code: string;
  description: string;
  image: string;
  language: number;
  longitude: number;
  latitude: number;
  created_at: Date;
  updated_at: Date;
  data: string;
}

export interface Pays {
  langue: Array<string>;
  climat: string;
  paysage: string;
  activity: Array<string>;
  populaire: boolean;
  duration: number;
  budget: number;
}

export interface ResultCountry {
  pays: string;
  img_full: string | null;
}

export interface TargetImage {
  pays: string;
}

export interface BodyCity {
  name: string;
  country: number;
  longitude: number;
  latitude: number;
  created_at: Date;
  updated_at: Date;
}

export interface Ville {
  activity: Array<string>;
  pays: Array<string>;
}

export interface ResultCity {
  pays: string;
  city: string;
  description: string;
  img_full: string | null;
  longitude: number;
  latitude: number;
}

export interface CityPosition {
  name: string;
  country: string;
  lat: number;
  lon: number;
  population: number;
  timezone: string;
  status: string;
}

export interface BodyLangague {
  name: string;
  code: string;
  created_at: Date;
  updated_at: Date;
}
