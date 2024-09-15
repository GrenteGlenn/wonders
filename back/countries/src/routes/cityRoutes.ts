import { RequestHandler, Router } from 'express';
import CityController from '../controllers/CityController';

interface Body {
  name: string;
  country: number;
  created_at: Date;
  updated_at: Date;
}

const router = Router();

const countryController = new CityController();

router.get('/cities', (async (req, res) => {
  try {
    const cities = await countryController.list();
    res.json(cities);
  } catch (error) {
    res.json({ error: error });
  }

}) as RequestHandler);

router.get('/cities/:id', (async (req, res) => {
  try {
    const country = await countryController.one(parseInt(req.params.id, 10));
    res.json(country);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.post('/cities', (async (req, res) => {
  try {
    const body = <Body>req.body;
    const country = await countryController.new(body.name, body.country, new Date(), new Date());
    res.json(country);
  } catch (error) {
    res.json({error: error});
  }

}) as RequestHandler);

router.put('/cities/:id', (async (req, res) => {
  try {
    const body = <Body>req.body;
    const country = await countryController.update(parseInt(req.params.id, 10), body.name, body.country, new Date(), new Date());
    res.json(country);
  } catch (error) {
    res.json({error: error});
  }
}) as RequestHandler);

router.delete('/cities/:id', (async (req, res) => {
  try {
    const country = await countryController.remove(parseInt(req.params.id, 10));
    res.json(country);
  } catch (error) {
    res.json({error: error});
  }
}) as RequestHandler);

export default router;
