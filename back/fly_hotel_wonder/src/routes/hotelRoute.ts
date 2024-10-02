import { RequestHandler, Router } from 'express';
import HotelController from '../controllers/HotelController';

const router = Router();

const hotelController = new HotelController();

router.get('/', (async (req, res) => {
  try {
    const hotel = hotelController.list();
    res.json(hotel);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

export default router;