export interface Destination {
  name: string;
  image: string;
  description: string;
  type: 'city' | 'country';
  isDescriptionLoading?: boolean;
  isImageLoading?: boolean;
}
