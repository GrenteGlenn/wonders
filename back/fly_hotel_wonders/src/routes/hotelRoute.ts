import { RequestHandler, Router } from 'express';
import HotelController from '../controllers/HotelController';
import { getHotelOffers, checkHotelOffers } from '../services/Amadeus';

interface HotelResponse {
  latitude: number;
  longitude: number;
  radius: number;
  hotelScore: number;
  ratings: number;
  hotelIds: string;
  adults: string;
}

const router = Router();

const hotelController = new HotelController();

router.get('/', ((req, res) => {
  try {
    const hotel = hotelController.list();

    res.json(hotel);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.get('/list', (async (req, res) => {
  const { hotelScore, ratings, radius, longitude, latitude } = <HotelResponse>req.body;

  try {
    const hotel = await getHotelOffers(latitude, longitude, radius, hotelScore, ratings);

    res.json(hotel);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.get('/offers', (async (req, res) => {
  const { hotelIds, adults } = <HotelResponse>req.body;

  try {
    const hotel = await checkHotelOffers(hotelIds, adults);

    res.json(hotel);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

export default router;
