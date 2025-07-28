export interface HotelSearchParams {
  latitude?: number;
  longitude?: number;
  radius?: number;
  hotelScore?: number;
  [key: string]: any;
}

export interface HotelAddress {
  countryCode?: string;
}

export interface HotelDistance {
  value?: number;
  unit?: string;
}

export interface HotelPrice {
  total?: number;
  currency?: string;
}

export interface HotelOffer {
  roomType?: string;
  price?: HotelPrice;
  checkIn?: string;
  checkOut?: string;
  guests?: {
    adults?: number;
  };
}

export interface Hotel {
  hotelId: string;
  name: string;
  chainCode?: string;
  address?: HotelAddress;
  distance?: HotelDistance;
  lastUpdate?: Date;
  latitude?: number;
  longitude?: number;
  
  showOffers?: boolean;
  isLoadingOffers?: boolean;
  offers?: HotelOffer[] | null;
}