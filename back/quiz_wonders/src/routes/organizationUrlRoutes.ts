import { RequestHandler, Router } from 'express';
import OrganizationUrlController from '../controllers/OrganizationUrlController';

interface Body {
  url: string;
  organization_id: number;
  rank: number;
  partner: string;
  key: string;
  status_id: number;
}

const router = Router();

const organizationUrlController = new OrganizationUrlController();

router.get('/organization-url', (async (req, res) => {
  const organizationUrl = await organizationUrlController.list();
  res.json(organizationUrl);
}) as RequestHandler);

router.get('/organization-url/:id', (async (req, res) => {
  const organizationUrl = await organizationUrlController.one(parseInt(req.params.id, 10));
  res.json(organizationUrl);
}) as RequestHandler);

router.post('/organization-url', (async (req, res) => {
  const body = <Body>req.body;
  const organizationUrl = await organizationUrlController.create(
    body.url,
    body.organization_id,
    body.rank,
    body.partner,
    body.status_id,
    body.key,
  
    new Date,
    new Date
  );
  res.json(organizationUrl);
}) as RequestHandler);
router.put('/organization-url/:id', (async (req, res) => {
  const body = <Body>req.body;
  const organizationUrl = await organizationUrlController.update(
    parseInt(req.params.id, 10),
    body.url,
    body.organization_id,
    body.rank,
    body.partner,
    body.key,
    body.status_id
  );
  res.json(organizationUrl);
}) as RequestHandler);

router.delete('/organization-url/:id', (async (req, res) => {
  const organizationUrl = await organizationUrlController.delete(parseInt(req.params.id, 10));
  res.json(organizationUrl);
}) as RequestHandler);

export default router;
