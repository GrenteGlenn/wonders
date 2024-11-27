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

router.get('/', (async (req, res) => {
  try {
    const countries = await countryController.list();
    res.json(countries);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.get('/:id', (async (req, res) => {
  try {
    const country = await countryController.one(parseInt(req.params.id, 10));
    res.json(country);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.post('/', (async (req, res) => {
  try {
    const body = <Body>req.body;
    const country = await countryController.new(body.name, body.code, new Date(), new Date());
    res.json(country);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.put('/:id', (async (req, res) => {
  try {
    const body = <Body>req.body;
    const country = await countryController.update(parseInt(req.params.id, 10), body.name, body.code);
    res.json(country);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.delete('/:id', (async (req, res) => {
  try {
    const country = await countryController.remove(parseInt(req.params.id, 10));
    res.json(country);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

export default router;
