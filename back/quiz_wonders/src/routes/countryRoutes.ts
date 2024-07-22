import { RequestHandler, Router } from 'express';
import CountryController from '../controllers/CountryController';

const router = Router();

const countryController = new CountryController();

interface RequestBody {
  name: string;
  code: string;
}

router.get('/countries', (async (req, res) => {
  const countries = await countryController.list();
  res.json(countries);
}) as RequestHandler);

router.get('/countries/:id', (async (req, res) => {
  const country = await countryController.one(parseInt(req.params.id, 10));
  res.json(country);
}) as RequestHandler);

router.post('/countries', (async (req, res) => {
  const body = <RequestBody>req.body;
  const country = await countryController.new(body.name, body.code);
  res.json(country);
}) as RequestHandler);

router.put('/countries/:id', (async (req, res) => {
  const body = <RequestBody>req.body;
  const country = await countryController.update(parseInt(req.params.id, 10), body.name, body.code);
  res.json(country);
}) as RequestHandler);

router.delete('/countries/:id', (async (req, res) => {
  const country = await countryController.remove(parseInt(req.params.id, 10));
  res.json(country);
}) as RequestHandler);

export default router;
