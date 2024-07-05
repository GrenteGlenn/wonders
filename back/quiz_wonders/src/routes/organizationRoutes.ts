import { Router } from "express";
import OrganizationController from "../controllers/OrganizationController";

const router = Router();
const organizationController = new OrganizationController();

router.get('/organization', async (req, res) => {
    const organization = await organizationController.list()
    res.json(organization); 
})

router.get('/organization/:id', async (req, res) => {
    const organization = await organizationController.one(parseInt(req.params.id, 10));
    res.json(organization);
})

router.post('/orgnization', async (req, res) =>  {
    const organization = await organizationController.new(req.body.userId, req.body.statusId, req.body.userAnswerId)
    res.json(organization);
})

router.put('/orgnization/:id', async (req, res) =>  {
    const organization = await organizationController.update(parseInt(req.params.id, 10), req.body.userId, req.body.statusId, req.body.userAnswerId)
    res.json(organization);
})

router.delete('/orgnization/:id', async (req, res) =>  {
    const organization = await organizationController.delete(parseInt(req.params.id, 10))
    res.json(organization);
})

export default router;