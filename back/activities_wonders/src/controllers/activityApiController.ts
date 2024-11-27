import { z } from 'zod';

const google_key = process.env.SECRET_KEY_GOOGLE;

const AddressComponentSchema = z.object({
  long_name: z.string().optional(),
  short_name: z.string().optional(),
  types: z.array(z.string()).optional()
});

const LatLngSchema = z.object({
  lat: z.number().optional(),
  lng: z.number().optional()
});

const ViewportSchema = z.object({
  northeast: LatLngSchema,
  southwest: LatLngSchema
});

const GeometrySchema = z.object({
  location: LatLngSchema,
  viewport: ViewportSchema
});

const TimeInfoSchema = z.object({
  day: z.number().optional(),
  date: z.string().optional(),
  time: z.string().optional()
});

const PeriodSchema = z.object({
  close: TimeInfoSchema.optional(),
  open: TimeInfoSchema.optional()
});

const SpecialDay = z.object({
  date: z.string().optional(),
  exceptional_hours: z.boolean().optional()
});

const OpeningHoursSchema = z.object({
  open_now: z.boolean(),
  periods: z.array(PeriodSchema).optional(),
  special_days: z.array(SpecialDay).optional(),
  type: z.string().optional(),
  weekday_text: z.array(z.string()).optional()
});

const PhotoSchema = z.object({
  height: z.number().optional(),
  html_attributions: z.array(z.string()).optional(),
  photo_reference: z.string(),
  width: z.number()
});

const PlusCodeSchema = z.object({
  compound_code: z.string().optional(),
  global_code: z.string().optional()
});

const ReviewSchema = z.object({
  author_name: z.string(),
  rating: z.number(),
  relative_time_description: z.string(),
  time: z.number(),
  author_url: z.string().optional(),
  language: z.string().optional(),
  original_language: z.string().optional(),
  profile_photo_url: z.string().optional(),
  text: z.string().optional(),
  translated: z.boolean().optional()
});

const EditorialSummarySchema = z.object({
  language: z.string().optional(),
  overview: z.string().optional()
});

const PlaceGoogleSchema = z.object({
  address_components: z.array(AddressComponentSchema).optional(),
  adr_address: z.string().optional(),
  business_status: z.enum(['OPERATIONAL', 'CLOSED_TEMPORARILY', 'CLOSED_PERMANENTLY']).optional(),
  curbside_pickup: z.boolean().optional(),
  current_opening_hours: OpeningHoursSchema.optional(),
  delivery: z.boolean().optional(),
  dine_in: z.boolean().optional(),
  editorial_summary: EditorialSummarySchema.optional(),
  formatted_address: z.string().optional(),
  formatted_phone_number: z.string().optional(),
  geometry: GeometrySchema.optional(),
  icon: z.string().optional(),
  icon_background_color: z.string().optional(),
  icon_mask_base_uri: z.string().optional(),
  international_phone_number: z.string().optional(),
  name: z.string().optional(),
  opening_hours: OpeningHoursSchema.optional(),
  permanently_closed: z.boolean().optional(),
  photos: z.array(PhotoSchema).optional(),
  place_id: z.string().optional(),
  plus_code: PlusCodeSchema.optional(),
  price_level: z.number().optional(),
  rating: z.number().optional(),
  reference: z.string().optional(),
  reviews: z.array(ReviewSchema).optional(),
  scope: z.string().optional(),
  secondary_opening_hours: z.array(OpeningHoursSchema).optional(),
  serves_beer: z.boolean().optional(),
  serves_breakfast: z.boolean().optional(),
  serves_brunch: z.boolean().optional(),
  serves_dinner: z.boolean().optional(),
  serves_lunch: z.boolean().optional(),
  serves_wine: z.boolean().optional(),
  takeout: z.boolean().optional(),
  types: z.array(z.string()).optional(),
  url: z.string().optional(),
  user_ratings_total: z.number().optional(),
  utc_offset: z.number().optional(),
  vicinity: z.string().optional(),
  website: z.string().optional(),
  wheelchair_accessible_entrance: z.boolean().optional()
});

const GooglePlaceDetailsSchema = z.object({
  html_attributions: z.array(z.string()),
  result: PlaceGoogleSchema,
  status: z.string()
});

const GoogleNearbyDetailsSchema = z.object({
  html_attributions: z.array(z.string()),
  next_page_token: z.string().optional(),
  results: z.array(PlaceGoogleSchema),
  status: z.string()
});

interface Result {
  name: string;
  price_level: number | undefined;
  ratting: number | undefined;
  photo: Blob | null;
  address: string | undefined;
}

class ActivityApiController {
  list() {
    const activity = [
      {
        id: 1,
        name: 'Cruise Bar',
        place_id: 'ChIJi6C1MxquEmsR9-c-3O48ykI',
        rating: 4,
        price_level: 2,
        address: 'Level 1, 2 and 3, Overseas Passenger Terminal, Circular Quay W, The Rocks',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        name: 'Sydney Harbour Dinner Cruises',
        place_id: 'ChIJM1mOVTS6EmsRKaDzrTsgids',
        rating: 4.8,
        price_level: null,
        address: '32 The Promenade, Sydney',
        created_at: new Date(),
        updated_at: new Date()
      }
    ];
    return activity;
  }

  async photo(width: number, photo_reference: string): Promise<Blob> {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${width}&photo_reference=${photo_reference}&key=${google_key}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return await response.blob();
  }

  async place_id(place_id: string) {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${google_key}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return GooglePlaceDetailsSchema.parse(await response.json());
  }

  async get_activity(
    location: string,
    radius: number,
    language: string,
    activity: string,
    max: number,
    token: string | null = null
  ): Promise<Result[]> {
    let value: Result[] = [];
    let photo = null;

    if (token === null) {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&Accept-Language=${language}&type=${activity}&key=${google_key}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data part 1');
      }

      const data = GoogleNearbyDetailsSchema.parse(await response.json());

      for (const result of data.results) {
        if (result.business_status === 'OPERATIONAL' && result.name && result.place_id && data.status === 'OK') {
          if (result.photos) photo = await this.photo(result.photos[0].width, result.photos[0].photo_reference);
          const address = await this.place_id(result.place_id);
          const resultData: Result = {
            name: result.name,
            price_level: result.price_level,
            ratting: result.rating,
            photo: photo,
            address: address.result.formatted_address
          };
          value = [...value, resultData];
          if (value.length === max) return value;
        }
      }

      // Récursion avec `next_page_token`
      if (value.length === max) return value;
      let recursiveResults: Result[];
      if (data.next_page_token) {
        recursiveResults = await this.get_activity(location, radius, language, activity, max, data.next_page_token);
        return [...value, ...recursiveResults];
      }
      return value;
    } else {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${token}&key=${google_key}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data part2');
      }

      const data = GoogleNearbyDetailsSchema.parse(await response.json());

      for (const result of data.results) {
        if (result.business_status === 'OPERATIONAL' && result.name && result.place_id && data.status === 'OK') {
          if (result.photos) photo = await this.photo(result.photos[0].width, result.photos[0].photo_reference);
          const address = await this.place_id(result.place_id);
          const resultData: Result = {
            name: result.name,
            price_level: result.price_level,
            ratting: result.rating,
            photo: photo,
            address: address.result.formatted_address
          };
          value = [...value, resultData];
          if (value.length === max) return value;
        }
      }

      // Récursion avec `next_page_token`
      if (value.length === max) return value;
      if (data.next_page_token) {
        const recursiveResults = await this.get_activity(
          location,
          radius,
          language,
          activity,
          max,
          data.next_page_token
        );
        return [...value, ...recursiveResults];
      } else {
        return value;
      }
    }
  }
}

export default ActivityApiController;
