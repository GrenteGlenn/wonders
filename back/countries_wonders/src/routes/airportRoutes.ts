import { Router, RequestHandler } from 'express';
import AirportController from '../controllers/AirportController';
import AirportInterface from '../interfaces/AirportInterface';

const router = Router();
const airportController = new AirportController();

interface Body {
  longitude: number;
  latitude: number;
}

router.get('/', (async (req, res) => {
  console.log('ici');
  try {
    const airports = await airportController.all();
    res.json(airports);
  } catch (error) {
    res.status(500).json({ error });
  }
}) as RequestHandler);

router.get('/city/:id', (async (req, res) => {
  console.log('city');
  try {
    const airports = await airportController.by_city(parseInt(req.params.id, 10));
    res.json(airports);
  } catch (error) {
    res.status(500).json({ error });
  }
}) as RequestHandler);

router.get('/geo', (async (req, res) => {
  const body = <Body>req.body;

  try {
    const airport = await airportController.geo(body.longitude, body.latitude);
    res.json(airport);
  } catch (error) {
    res.status(500).json({ error });
  }
}) as RequestHandler);

// router.post('/geo', async (req, res) => {
//   const { longitude, latitude } = req.body;
//   try {
//     const airport = await airportController.geo(longitude, latitude);  
//     res.json(airport);
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// }) as RequestHandler;

router.post('/geo', (async (req, res) => {
  try {
    const { longitude, latitude }: { longitude: number; latitude: number } = req.body;
    const airport = await airportController.geo(longitude, latitude);
    res.json(airport);
  } catch (error) {
    res.status(500).json({ error });
  }
}) as RequestHandler);

router.get('/:id', (async (req, res) => {
  console.log('id');
  try {
    const airport = await airportController.one(parseInt(req.params.id, 10));
    res.json(airport);
  } catch (error) {
    res.status(500).json({ error });
  }
}) as RequestHandler);

router.post('/', (async (req, res) => {
  try {
    const body = <AirportInterface>req.body;
    body.created_at = new Date();
    body.updated_at = new Date();

    const airport = await airportController.create(body);
    res.status(201).json(airport);
  } catch (error) {
    res.status(500).json({ error });
  }
}) as RequestHandler);

router.put('/:id', (async (req, res) => {
  try {
    const body = <AirportInterface>req.body;
    const airport = await airportController.update(parseInt(req.params.id, 10), body);
    res.json(airport);
  } catch (error) {
    res.status(500).json({ error });
  }
}) as RequestHandler);

router.delete('/:id', (async (req, res) => {
  try {
    await airportController.delete(parseInt(req.params.id, 10));
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error });
  }
}) as RequestHandler);

export default router;
