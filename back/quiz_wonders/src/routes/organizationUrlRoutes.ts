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

router.get('/', (async (req, res) => {
  try {
    const organizationUrl = await organizationUrlController.list();
    res.json(organizationUrl);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.get('/:id', (async (req, res) => {
  try {
    const organizationUrl = await organizationUrlController.one(parseInt(req.params.id, 10));
    res.json(organizationUrl);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.post('/', (async (req, res) => {
  try {
    const body = <Body>req.body;
    const organizationUrl = await organizationUrlController.create(
      body.url,
      body.organization_id,
      body.rank,
      body.partner,
      body.status_id,
      body.key,
      new Date(),
      new Date()
    );
    res.json(organizationUrl);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);
router.put('/:id', (async (req, res) => {
  try {
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
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.delete('/:id', (async (req, res) => {
  try {
    const organizationUrl = await organizationUrlController.delete(parseInt(req.params.id, 10));
    res.json(organizationUrl);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

export default router;
