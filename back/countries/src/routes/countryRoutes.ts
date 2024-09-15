import { RequestHandler, Router } from 'express';
import CountryController from '../controllers/CountryController';

interface Body {
  name: string;
  code: string;
  created_at: Date;
  updated_at: Date;
}

const router = Router();

const countryController = new CountryController();

router.get('/countries', (async (req, res) => {
  try {
    const countries = await countryController.list();
    res.json(countries);
  } catch (error) {
    res.json({ error: error });
  }

}) as RequestHandler);

router.get('/countries/:id', (async (req, res) => {
  try {
    const country = await countryController.one(parseInt(req.params.id, 10));
    res.json(country);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.post('/countries', (async (req, res) => {
  try {
    const body = <Body>req.body;
    const country = await countryController.new(body.name, body.code, new Date(), new Date());
    res.json(country);
  } catch (error) {
    res.json({error: error});
  }

}) as RequestHandler);

router.put('/countries/:id', (async (req, res) => {
  try {
    const body = <Body>req.body;
    const country = await countryController.update(parseInt(req.params.id, 10), body.name, body.code, new Date(), new Date());
    res.json(country);
  } catch (error) {
    res.json({error: error});
  }
}) as RequestHandler);

router.delete('/countries/:id', (async (req, res) => {
  try {
    const country = await countryController.remove(parseInt(req.params.id, 10));
    res.json(country);
  } catch (error) {
    res.json({error: error});
  }
}) as RequestHandler);

export default router;
