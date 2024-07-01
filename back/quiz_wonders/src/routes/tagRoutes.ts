import { Router } from 'express';
import TagController from '../controllers/TagController';

const router = Router();

const tagController = new TagController();

router.get('/tags', async (req, res) => {
    const tags = await tagController.list();
    res.json(tags);
});

router.get('/tags/:id', async (req, res) => {
    const tag = await tagController.one(parseInt(req.params.id, 10));
    res.json(tag);
});

router.post('/tags', async (req, res) => {
    const tag = await tagController.new(req.body.name);
    res.json(tag);
});

router.put('/tags/:id', async (req, res) => {
    const tag = await tagController.update(parseInt(req.params.id, 10), req.body.name);
    res.json(tag);
});

router.delete('/tags/:id', async (req, res) => {
    const tag = await tagController.remove(parseInt(req.params.id, 10));
    res.json(tag);
});

export default router;