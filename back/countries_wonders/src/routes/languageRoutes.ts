import { RequestHandler, Router } from 'express';
import LanguageController from '../controllers/LanguageController';
import { BodyLangague } from '../interfaces/Globals';

const router = Router();

const languageController = new LanguageController();

router.get('/', (async (req, res) => {
  try {
    const languages = await languageController.list();
    res.json(languages);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.get('/:id', (async (req, res) => {
  try {
    const languages = await languageController.one(parseInt(req.params.id, 10));
    res.json(languages);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.post('/', (async (req, res) => {
  try {
    const body = <BodyLangague>req.body;
    const language = await languageController.create(body.name, body.code, new Date(), new Date());
    res.json(language);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.put('/:id', (async (req, res) => {
  try {
    const body = <BodyLangague>req.body;
    const language = await languageController.update(parseInt(req.params.id, 10), body.name, body.code, new Date());
    res.json(language);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.delete('/:id', (async (req, res) => {
  try {
    const language = await languageController.delete(parseInt(req.params.id, 10));
    res.json(language);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

export default router;
