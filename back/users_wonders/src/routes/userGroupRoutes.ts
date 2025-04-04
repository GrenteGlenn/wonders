import { RequestHandler, Router } from 'express';
import UserGroupController from '../controllers/UserGroupController';

const router = Router();

const userGroupController = new UserGroupController()

router.get('/user-groups/:id', (async (req, res) => {
    try {
        const groups = await userGroupController.getAllByUser(parseInt(req.params.id))
        res.status(200).json(groups);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}) as RequestHandler);

router.get('/user-group/:id', (async (req, res) => {
    try {
        const group = await userGroupController.one(parseInt(req.params.id, 10))
        res.status(200).json(group);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}) as RequestHandler);

export default router