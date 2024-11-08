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
    res.status(200).json(organizationUrl);
  } catch (error) {
    res.status(500).json({ 'code': '500','message': error });
  }
}) as RequestHandler);

router.get('/:id', (async (req, res) => {
  try {
    const organizationUrl = await organizationUrlController.one(parseInt(req.params.id, 10));
    if(organizationUrl) {
      res.status(200).json(organizationUrl);
    } else {
      res.status(404).json({ 'code': '500','message': 'entry does not exists' });
    }
  } catch (error) {
    res.status(500).json({ 'code': '500','message': error });
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
    organizationUrl ? res.status(201).json(organizationUrl) : res.status(400).json({'code': '400', 'message': 'an error occured while creating resource'});
  } catch (error) {
    res.status(500).json({ 'code': '500','message': error });
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

    if(organizationUrl) {
      res.status(200).json(organizationUrl);
    } else {
      res.status(404).json({ 'code': '500','message': 'entry does not exists' });
    }
  } catch (error) {
    res.status(500).json({ 'code': '500','message': error });
  }
}) as RequestHandler);

router.delete('/:id', (async (req, res) => {
  try {
    const organizationUrl = await organizationUrlController.delete(parseInt(req.params.id, 10));
    if(organizationUrl) {
      res.status(204).json(organizationUrl);
    } else {
      res.status(404).json({ 'code': '500','message': 'entry does not exists' });
    }
  } catch (error) {
    res.status(500).json({ 'code': '500','message': error });
  }
}) as RequestHandler);

export default router;
