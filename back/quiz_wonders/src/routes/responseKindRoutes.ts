import { RequestHandler, Router } from 'express';
import ResponseKindController from '../controllers/ResponseKindController';

interface Body {
  type: string;
}

const router = Router();

const responseKindController = new ResponseKindController();

router.get('/', (async (req, res) => {
  const response = await responseKindController.list();
  res.json(response);
}) as RequestHandler);

router.get('/:id', (async (req, res) => {
  const response = await responseKindController.one(parseInt(req.params.id, 10));
  res.json(response);
}) as RequestHandler);

router.post('/', (async (req, res) => {
  const body = <Body>req.body;
  const response = await responseKindController.new(body.type);
  res.json(response);
}) as RequestHandler);

router.put('/:id', (async (req, res) => {
  const body = <Body>req.body;
  const response = await responseKindController.update(parseInt(req.params.id, 10), body.type);
  res.json(response);
}) as RequestHandler);

router.delete('/:id', (async (req, res) => {
  const response = await responseKindController.remove(parseInt(req.params.id, 10));
  res.json(response);
}) as RequestHandler);

export default router;
