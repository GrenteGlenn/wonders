import { RequestHandler, Router } from 'express';
import TagController from '../controllers/TagController';

interface Body {
  name: string;
}

const router = Router();

const tagController = new TagController();

router.get('/', (async (req, res) => {
  try {
    const tags = await tagController.list();
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ 'code': '500','message': error });
  }
}) as RequestHandler);

router.get('/:id', (async (req, res) => {
  try {
    const tag = await tagController.one(parseInt(req.params.id, 10));
    tag ? res.status(200).json(tag) : res.status(404).json({'code': '404', "message": 'entry does not exists'});
  } catch (error) {
    res.status(500).json({ 'code': '500','message': error });
  }
}) as RequestHandler);

router.post('/', (async (req, res) => {
  const body = <Body>req.body;
  try {
    const tag = await tagController.new(body.name, new Date(), new Date());
    tag ? res.status(201).json(tag) : res.status(400).json({'code': '400', 'message': 'an error occured while creating resource'});
  } catch (error) {
    res.status(500).json({ 'code': '500','message': error });
  }
}) as RequestHandler);

router.put('/:id', (async (req, res) => {
  const body = <Body>req.body;
  try {
    const tag = await tagController.update(parseInt(req.params.id, 10), body.name, new Date(), new Date());
    tag ? res.status(200).json(tag) : res.status(404).json({'code': '404', "message": 'entry does not exists'});
  } catch (error) {
    res.status(500).json({ 'code': '500','message': error });
  }
}) as RequestHandler);

router.delete('/:id', (async (req, res) => {
  try {
    const tag = await tagController.remove(parseInt(req.params.id, 10));
    tag ? res.status(204) : res.status(404).json({'code': '404', "message": 'entry does not exists'});
  } catch (error) {
    res.status(500).json({ 'code': '500','message': error });
  }
}) as RequestHandler);

export default router;
