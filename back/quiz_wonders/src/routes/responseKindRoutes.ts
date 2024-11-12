import { RequestHandler, Router } from 'express';
import ResponseKindController from '../controllers/ResponseKindController';

interface Body {
  type: string;
}

const router = Router();

const responseKindController = new ResponseKindController();

router.get('/', (async (req, res) => {
  try {
    const responseKind = await responseKindController.list();
    res.status(200).json(responseKind);
  } catch (error) {
    res.status(500).json({ 'code': '500','message': error });
  }
}) as RequestHandler);

router.get('/:id', (async (req, res) => {
  try {
    const responseKind  = await responseKindController.one(parseInt(req.params.id, 10));
    responseKind ? res.status(200).json(responseKind) : res.status(404).json({'code': '404', "message": 'entry does not exists'});
  } catch (error) {
    res.status(500).json({ 'code': '500','message': error });
  }
}) as RequestHandler);

router.post('/', (async (req, res) => {
  try {
    const body = <Body>req.body;
    const responseKind = await responseKindController.new(body.type, new Date(), new Date());
    responseKind ? res.status(201).json(responseKind) : res.status(400).json({'code': '400', 'message': 'an error occured while creating resource'});
  } catch (error) {
    res.status(500).json({ 'code': '500','message': error });
  }
}) as RequestHandler);

router.put('/:id', (async (req, res) => {
  try {
    const body = <Body>req.body;
    const responseKind = await responseKindController.update(
      parseInt(req.params.id, 10),
      body.type,
      new Date(),
      new Date()
    );
    responseKind ? res.status(200).json(responseKind) : res.status(404).json({'code': '404', "message": 'entry does not exists'});
  } catch (error) {
    res.status(500).json({ 'code': '500','message': error });
  }
}) as RequestHandler);

router.delete('/:id', (async (req, res) => {
  try {
    const responseKind = await responseKindController.remove(parseInt(req.params.id, 10));
    if(responseKind) {
      res.status(204);
    } else {
      res.status(404).json({'code': '404', "message": 'entry does not exists'});
    }
  } catch (error) {
    res.status(500).json({ 'code': '500','message': error });
  }
}) as RequestHandler);

export default router;
