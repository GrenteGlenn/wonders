import { RequestHandler, Router } from 'express';
import OrganizationController from '../controllers/OrganizationController';

interface Body {
  user_id: number;
  status_id: number;
}

const router = Router();

const organizationController = new OrganizationController();

router.get('/', (async (req, res) => {
  try {
    const organization = await organizationController.list();
    res.status(200).json(organization);
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

router.get('/:id', (async (req, res) => {
  try {
    const organization = await organizationController.one(parseInt(req.params.id, 10));
    if (organization) {
      res.status(200).json(organization);
    } else {
      res.status(404).json({ code: '404', message: 'entry does not exists' });
    }
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

router.post('/', (async (req, res) => {
  try {
    const body = <Body>req.body;
    const organization = await organizationController.new(body.user_id, body.status_id, new Date(), new Date());
    organization
      ? res.status(201).json(organization)
      : res.status(400).json({ code: '400', message: 'an error occured while creating resource' });
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

router.put('/:id', (async (req, res) => {
  try {
    const body = <Body>req.body;
    const organization = await organizationController.update(
      parseInt(req.params.id, 10),
      body.user_id,
      body.status_id,
      new Date()
    );
    res.status(200).json(organization);
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

router.delete('/:id', (async (req, res) => {
  try {
    const organization = await organizationController.delete(parseInt(req.params.id, 10));
    if (organization) {
      res.status(204).json(organization);
    } else {
      res.status(404).json({ code: '500', message: 'entry doen not exists' });
    }
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

export default router;
