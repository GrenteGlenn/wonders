import { RequestHandler, Router } from 'express';
import ActivityController from '../controllers/activityController';

const router = Router();

const activityController = new ActivityController()

interface RequestBody {
    path:string
  }

router.get('/activity', async (req, res) => {
    const activity = await activityController.list()
    res.json(activity)
})

router.get('/activity/:id', async (req, res) => {
    const activity = await activityController.one(parseInt(req.params.id, 10))
    res.json(activity)
});

router.post('/activity', async (req, res) => {
    const activity = await activityController.new({name: req.body.name, description: req.body.description,is_free: req.body.is_free,duration: req.body.duration, price: req.body.price, category_id: req.body.category_id, partner: req.body.partner, url: req.body.url});
    res.json(activity);
});

router.put('/activity/:id', async (req, res) => {
    const activity = await activityController.update(parseInt(req.params.id, 10), req.body.name, req.body.description, req.body.is_free, req.body.duration, req.body.price, req.body.category_id, req.body.partner, req.body.url)
    res.json(activity)
})

router.delete('/activity/:id', async (req, res) => {
    const activity = await activityController.delete(parseInt(req.params.id, 10))
    res.json(activity)
})

export default router;