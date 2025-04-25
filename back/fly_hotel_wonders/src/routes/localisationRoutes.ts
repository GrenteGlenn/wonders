import { RequestHandler, Router } from 'express';
import LocalisationController from '../controllers/LocalisationController';
import LocalisationInterface from '../interface/localisation';

const localisationController = new LocalisationController();
const router = Router();

router.get('/', (async (req, res) => {
  try {
    const localisations = await localisationController.all();
    res.json(localisations);
  } catch (error) {
    res.status(500).json({ error });
  }
}) as RequestHandler);

router.get('/:id', (async (req, res) => {
  try {
    const localisation = await localisationController.one(Number(req.params.id));
    if (!localisation) {
      return res.status(404).json({ error: 'Localisation not found' });
    }
    res.json(localisation);
  } catch (error) {
    res.status(500).json({ error });
  }
}) as RequestHandler);

router.post('/', (async (req, res) => {
  try {
    const body = <LocalisationInterface>req.body;
    const newLocalisation = await localisationController.create(body);
    res.status(201).json(newLocalisation);
  } catch (error) {
    res.status(500).json({ error });
  }
}) as RequestHandler);

router.put('/:id', (async (req, res) => {
  try {
    const body = <LocalisationInterface>req.body;
    const updatedLocalisation = await localisationController.update(Number(req.params.id), body);
    res.json(updatedLocalisation);
  } catch (error) {
    res.status(500).json({ error });
  }
}) as RequestHandler);

router.delete('/:id', (async (req, res) => {
  try {
    await localisationController.delete(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error });
  }
}) as RequestHandler);

export default router;
