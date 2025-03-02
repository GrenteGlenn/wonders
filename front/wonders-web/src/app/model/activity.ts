export interface Activity {
  id?: number;
  name: string;
  description: string;
  is_free: boolean;
  duration: number;
  price: number;
  category_id: number;
  partner: string;
  url: string;
}

export interface ActivityCategory {
  id?: number;
  name: string;
  picture_id?: number;
}
export interface Picture {
  id?: number;
  path: string;
}