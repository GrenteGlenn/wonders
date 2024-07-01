import { Router } from 'express';
import StatusController from '../controllers/StatusController';

const router = Router();

const statusController = new StatusController();

router.get('/status', async (req, res) => {
    const status = await statusController.list();
    res.json(status);
});

router.get('/status/:id', async (req, res) => {
    const status = await statusController.one(parseInt(req.params.id, 10));
    res.json(status);
});

router.post('/status', async (req, res) => {
    const status = await statusController.new(req.body.name);
    res.json(status);
}); 

router.put('/status/:id', async (req, res) => {
    const status = await statusController.update(parseInt(req.params.id, 10), req.body.name);
    res.json(status);
});

router.delete('/status/:id', async (req, res) => {
    const status = await statusController.remove(parseInt(req.params.id, 10));
    res.json(status);
});


export default router;