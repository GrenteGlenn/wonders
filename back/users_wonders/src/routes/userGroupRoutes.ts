import { RequestHandler, Router } from 'express';
import UserGroupController from '../controllers/UserGroupController';
import UserGroupLink from '../../models/user-group-link';

const router = Router();

const userGroupController = new UserGroupController();

router.get('/by-user/:id', (async (req, res) => {
  try {
    const groups = await userGroupController.getAllByUser(parseInt(req.params.id));
    res.status(200).json(groups);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}) as RequestHandler);

router.get('/:id', (async (req, res) => {
  try {
    const group = await userGroupController.one(parseInt(req.params.id, 10));
    res.status(200).json(group);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}) as RequestHandler);

router.post('/add-user', async (req, res) => {
  const groupLink = await UserGroupLink.create({ user_id: req.body.user_id, user_group_id: req.body.group_id, is_accepted: false, is_owner: false })
})

router.put('/accept-join-group', async (req, res) => {
  await userGroupController.acceptToJoinToGroup(req.body.user_id, req.body.groupId)
})

router.get('/remove-user/:id/:groupId', (async (req, res) => {
  try {
    await userGroupController.removeUserFromGroup(parseInt(req.params.id, 10), parseInt(req.params.groupId, 10));
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error });
  }
}) as RequestHandler);

router.delete('/:id/:userId', (async (req, res) => {
  try {
    const group = await userGroupController.delete(parseInt(req.params.id, 10), parseInt(req.params.userId, 10));
    group ? res.status(204).end() : res.status(403).end()
  } catch (error) {
    res.status(400).json({ error: error });
  }
}) as RequestHandler);

export default router;
