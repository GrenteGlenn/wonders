import { RequestHandler, Router } from 'express';
import ActivityCategoryController from '../controllers/activityCategoryController';

const router = Router();

const activityCategoryController = new ActivityCategoryController()

interface RequestBody {
    path:string
  }

router.get('/activity-category', async (req, res) => {
    const activityCategory = await activityCategoryController.list()
    res.json(activityCategory)
})

router.get('/activity-category/:id', async (req, res) => {
    const activityCategory = await activityCategoryController.one(parseInt(req.params.id, 10))
    res.json(activityCategory)
});

router.post('/activity-category', async (req, res) => {
    const activityCategory = await activityCategoryController.new({ name: req.body.name, picture_id: req.body.picture_id });
    res.json(activityCategory);
});

router.put('/activity-category/:id', async (req, res) => {
    const activityCategory = await activityCategoryController.update(parseInt(req.params.id, 10), req.body.name, req.body.picture_id)
    res.json(activityCategory)
})

router.delete('/activity-category/:id', async (req, res) => {
    const activityCategory = await activityCategoryController.delete(parseInt(req.params.id, 10))
    res.json(activityCategory)
})

export default router;