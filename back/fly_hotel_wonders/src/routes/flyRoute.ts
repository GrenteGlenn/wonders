import { RequestHandler, Router } from 'express';
import FlyController from '../controllers/FlyController';
import { getFlightOffers } from '../services/Amadeus';

interface FlyParams {
  originLocationCode: string;
  destinationLocationCode: string;
  departureDate: string;
  returnDate: string;
  adults: number;
  children: number;
  nonStop: boolean;
  maxPrice: number | null;
}

const router = Router();

const flyController = new FlyController();

router.get('/', ((req, res) => {
  try {
    const fly = flyController.list();
    res.json(fly);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.get('/list', (async (req, res) => {
  const {
    originLocationCode,
    destinationLocationCode,
    departureDate,
    returnDate,
    adults,
    children,
    nonStop,
    maxPrice
  } = <FlyParams>req.body;

  try {
    const fly = await getFlightOffers(
      originLocationCode,
      destinationLocationCode,
      departureDate,
      returnDate,
      adults,
      children,
      nonStop,
      maxPrice
    );
    console.log(fly);
    res.json(fly);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

export default router;
