import { RequestHandler, Router } from 'express';
import HotelController from '../controllers/HotelController';
import { getHotelOffers, checkHotelOffers } from '../services/Amadeus';
import { z } from 'zod';
import { HotelOffersSchema, HotelSchema } from '../interface/Global';

// Définition du schéma Zod pour HotelResponse
// const HotelResponseSchema = z.object({
//   latitude: z.number().optional(),
//   longitude: z.number().optional(),
//   radius: z.number().optional(),
//   hotelScore: z.number().optional(),
//   ratings: z.number().optional(),
//   hotelIds: z.string().optional(),
//   adults: z.string().optional()
// });

const HotelResponseSchema = z.object({
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
  radius: z.coerce.number().optional(),
  hotelScore: z.coerce.number().optional(),
  ratings: z.coerce.number().optional(),
  hotelIds: z.string().optional(),
  adults: z.string().optional()
});
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
  const validationResult = HotelResponseSchema.safeParse(req.query);

  if (!validationResult.success) {
    return res.status(400).json({
      status: 'error',
      message: 'Paramètres de recherche invalides',
      errors: validationResult.error.format()
    });
  }

  const { latitude, longitude, radius, hotelScore, ratings } = validationResult.data;

  try {
    const hotel = (await getHotelOffers(latitude, longitude, radius, hotelScore, ratings)) as typeof HotelSchema;

    res.json(hotel);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.get('/offers', (async (req, res) => {
  const validationResult = HotelResponseSchema.safeParse(req.query);

  if (!validationResult.success) {
    return res.status(400).json({
      status: 'error',
      message: 'Paramètres de recherche invalides',
      errors: validationResult.error.format()
    });
  }

  const { hotelIds, adults } = validationResult.data;

  try {
    const hotel = (await checkHotelOffers(hotelIds, adults)) as typeof HotelOffersSchema;

    res.json(hotel);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

export default router;
