import { RequestHandler, Router } from 'express';
import CountryController from '../controllers/CountryController';
import OpenAiService from '../services/openai'; // Ajustez le chemin selon votre structure de projet
import { Request, Response } from 'express';

interface Body {
  name: string;
  code: string;
  description: Text;
  image: string;
  created_at: Date;
  updated_at: Date;
  data: string;
}

interface Ai {
  country: string;
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

router.get('/country-description/:id', (async (req, res) => {
  try {
    const country = await countryController.getCountryDescription(parseInt(req.params.id, 10));
    res.json(country);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.post('/countries', (async (req, res) => {
  try {
    const body = <Body>req.body;
    const country = await countryController.new(body.name, body.code, body.description, body.image, new Date(), new Date());
    res.json(country);
  } catch (error) {
    res.json({error: error});
  }

}) as RequestHandler);

router.post('/ai', (async (req, res) => {
  try {
    const body = <Body>req.body;
      console.log(body);
      
      const countryData = await countryController.getDataFromOpenAI(body.data);
      res.json({ data: countryData });
  } catch (error) {
      console.error('Error in /ai route:', error);
      res.status(500).json({ error: error as any });
  }
}) as RequestHandler);

router.put('/countries/:id', (async (req, res) => {
  try {
    const body = <Body>req.body;
    const country = await countryController.update(parseInt(req.params.id, 10), body.name, body.code, body.description, body.image, new Date(), new Date());
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
