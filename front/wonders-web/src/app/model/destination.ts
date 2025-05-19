export interface Destination {
  id?: number;
  name: string;
  image: string;
  description: string;
  type: 'city' | 'country';
  isDescriptionLoading?: boolean;
  isImageLoading?: boolean;
  longitude?: number;
  latitude?: number;


}
