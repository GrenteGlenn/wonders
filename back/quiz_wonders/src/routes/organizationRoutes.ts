import { RequestHandler, Router } from 'express';
import OrganizationController from '../controllers/OrganizationController';

const router = Router();

const organizationController = new OrganizationController();

interface RequestBody {
  userId: number;
  statusId: number;
  userAnswerId: number;
}

router.get('/organization', (async (req, res) => {
  const organization = await organizationController.list();
  res.json(organization);
}) as RequestHandler);

router.get('/organization/:id', (async (req, res) => {
  const organization = await organizationController.one(parseInt(req.params.id, 10));
  res.json(organization);
}) as RequestHandler);

router.post('/orgnization', (async (req, res) => {
  const body = <RequestBody>req.body;
  const organization = await organizationController.new(body.userId, body.statusId, body.userAnswerId);
  res.json(organization);
}) as RequestHandler);

router.put('/orgnization/:id', (async (req, res) => {
  const body = <RequestBody>req.body;
  const organization = await organizationController.update(
    parseInt(req.params.id, 10),
    body.userId,
    body.statusId,
    body.userAnswerId
  );
  res.json(organization);
}) as RequestHandler);

router.delete('/orgnization/:id', (async (req, res) => {
  const organization = await organizationController.delete(parseInt(req.params.id, 10));
  res.json(organization);
}) as RequestHandler);

export default router;
