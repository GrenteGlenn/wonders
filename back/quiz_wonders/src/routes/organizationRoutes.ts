import { RequestHandler, Router } from 'express';
import OrganizationController from '../controllers/OrganizationController';

interface Body {
  user_id: number;
  status_id: number;
}

const router = Router();

const organizationController = new OrganizationController();

router.get('/organization', (async (req, res) => {
  const organization = await organizationController.list();
  res.json(organization);
}) as RequestHandler);

router.get('/organization/:id', (async (req, res) => {
  const organization = await organizationController.one(parseInt(req.params.id, 10));
  res.json(organization);
}) as RequestHandler);

router.post('/organization', (async (req, res) => {
  const body = <Body>req.body;
  const organization = await organizationController.new(body.user_id, body.status_id, new Date(), new Date());
  res.json(organization);
}) as RequestHandler);

router.put('/organization/:id', (async (req, res) => {
  const body = <Body>req.body;
  const organization = await organizationController.update(parseInt(req.params.id, 10), body.user_id, body.status_id, new Date(), new Date());
  res.json(organization);
}) as RequestHandler);

router.delete('/organization/:id', (async (req, res) => {
  const organization = await organizationController.delete(parseInt(req.params.id, 10));
  res.json(organization);
}) as RequestHandler);

export default router;
