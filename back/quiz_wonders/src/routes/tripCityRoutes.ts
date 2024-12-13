import { Router, RequestHandler } from "express";
import TripCityController from "../controllers/TripCityController";
import TripCityInterface from "../interfaces/TripCityInterface";

const router = Router();
const tripCityController = new TripCityController();

router.get('/', async (req, res) => {
    try {
      const tripCity = await tripCityController.list();
      res.status(200).json(tripCity);
    } catch (error) {
      res.status(500).json({ 'code': '500','message': error });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const tripCity = await tripCityController.one(parseInt(req.params.id, 10));
      tripCity? res.status(200).json(tripCity): res.status(404).json({ message: 'No trip trip city found' });
      res.status(200).json(tripCity);
    } catch (error) {
      res.status(500).json({ 'code': '500','message': error });
    }
  });

  router.post('/', (async (req, res) => {
    try {
      const body = <TripCityInterface>req.body;
      const tripCity = await tripCityController.new(body.trip_id, body.city_id, body.transportation_id, new Date(), new Date());
      tripCity ? res.status(201).json(tripCity) : res.status(400).json({'code': '400', 'message': 'an error occured while creating resource'});
    } catch (error) {
      res.status(500).json({ 'code': '500','message': error });
    }
  }) as RequestHandler);

  router.put('/:id', (async (req, res) => {
    const body = <TripCityInterface>req.body;
    try {
      const tripCity = await tripCityController.update(parseInt(req.params.id, 10), body.trip_id, body.city_id, body.transportation_id, new Date(), new Date());
      tripCity ? res.status(200).json(tripCity) : res.status(404).json({'code': '404', "message": 'entry does not exists'});
    } catch (error) {
      res.status(500).json({ 'code': '500','message': error });
    }
  }) as RequestHandler);

  router.delete('/:id', (async (req, res) => {
    try {
      await tripCityController.delete(parseInt(req.params.id, 10));
      res.status(204);
    } catch (error) {
      res.status(500).json({ 'code': '500','message': error });
    }
  }) as RequestHandler);
export default router; 