import { RequestHandler, Router } from 'express';
import OrganizationUrlController from '../controllers/OrganizationUrlController';

const router = Router();

const organizationUrlController = new OrganizationUrlController();

interface RequestBody {
  url: string;
  organisationId: number;
  rank: number;
  partner: string;
  key: string | undefined;
}

router.get('/organization-url', (async (req, res) => {
  const organizationUrl = await organizationUrlController.list();
  res.json(organizationUrl);
}) as RequestHandler);

router.get('/organization-url/:id', (async (req, res) => {
  const organizationUrl = await organizationUrlController.one(parseInt(req.params.id, 10));
  res.json(organizationUrl);
}) as RequestHandler);

router.post('/organization-url', (async (req, res) => {
  const body = <RequestBody>req.body;
  const organizationUrl = await organizationUrlController.create(
    body.url,
    body.organisationId,
    body.rank,
    body.partner,
    body.key
  );
  res.json(organizationUrl);
}) as RequestHandler);

router.put('/organization-url/:id', (async (req, res) => {
  const body = <RequestBody>req.body;
  const organizationUrl = await organizationUrlController.update(
    parseInt(req.params.id, 10),
    body.url,
    body.organisationId,
    body.rank,
    body.partner,
    body.key
  );
  res.json(organizationUrl);
}) as RequestHandler);
router.delete('/organization-url/:id', (async (req, res) => {
  const organizationUrl = await organizationUrlController.delete(parseInt(req.params.id, 10));
  res.json(organizationUrl);
}) as RequestHandler);

export default router;
