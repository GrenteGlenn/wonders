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
    res.json(organization);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.get('/:id', (async (req, res) => {
  try {
    const organization = await organizationController.one(parseInt(req.params.id, 10));
    res.json(organization);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.post('/', (async (req, res) => {
  try {
    const body = <Body>req.body;
    const organization = await organizationController.new(body.user_id, body.status_id, new Date(), new Date());
    res.json(organization);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.put('/:id', (async (req, res) => {
  try {
    const body = <Body>req.body;
    const organization = await organizationController.update(parseInt(req.params.id, 10), body.user_id, body.status_id);
    res.json(organization);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.delete('/:id', (async (req, res) => {
  try {
    const organization = await organizationController.delete(parseInt(req.params.id, 10));
    res.json(organization);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

export default router;
