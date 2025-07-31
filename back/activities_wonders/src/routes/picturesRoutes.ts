import { RequestHandler, Router } from 'express';
import PictureController from '../controllers/pictureController';

const router = Router();

const pictureController = new PictureController();

interface Body {
  path: string;
}

router.get('/', (async (_, res) => {
  const picture = await pictureController.list();
  res.json(picture);
}) as RequestHandler);

router.get('/:id', (async (req, res) => {
  const picture = await pictureController.one(parseInt(req.params.id, 10));
  res.json(picture);
}) as RequestHandler);

router.post('/', (async (req, res) => {
  const body = <Body>req.body;
  const picture = await pictureController.new({ path: body.path });
  res.json(picture);
}) as RequestHandler);

router.put('/:id', (async (req, res) => {
  const body = <Body>req.body;
  const picture = await pictureController.update(parseInt(req.params.id, 10), body.path);
  res.json(picture);
}) as RequestHandler);

router.delete('/:id', (async (req, res) => {
  const picture = await pictureController.delete(parseInt(req.params.id, 10));
  res.json(picture);
}) as RequestHandler);

export default router;
