import { Router } from "express";
import OrganizationUrlController from "../controllers/OrganizationUrlController";

const router = Router();
const organizationUrlController = new OrganizationUrlController();

router.get('/organization-url', async (req, res) => {
    const organizationUrl = await organizationUrlController.list();
    res.json(organizationUrl);
})

router.get('/organization-url/:id', async (req, res) => {
    const organizationUrl = await organizationUrlController.one(parseInt(req.params.id, 10))
    res.json(organizationUrl);
})
router.post('/organization-url', async (req, res) => {
    const organizationUrl = await organizationUrlController.create(req.body.url, req.body.organisationId, req.body.rank, req.body.partner, req.body.key);
    res.json(organizationUrl);
})
router.put('/organization-url/:id', async (req, res) => {
    const organizationUrl = await organizationUrlController.update(parseInt(req.params.id, 10), req.body.url, req.body.organisationId, req.body.rank, req.body.partner, req.body.key)
    res.json(organizationUrl);
})
router.delete('/organization-url/:id', async (req, res) => {
    const organizationUrl =  await organizationUrlController.delete(parseInt(req.params.id, 10))
    res.json(organizationUrl);
})

export default router;