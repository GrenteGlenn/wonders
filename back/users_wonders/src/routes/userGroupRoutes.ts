import { RequestHandler, Router, Request, Response } from 'express';
import UserGroupController from '../controllers/UserGroupController';
import UserGroupLink from '../../models/user-group-link';
import { UserGroupLinkInterface } from '../interfaces/UserGroup';

const router = Router();

const userGroupController = new UserGroupController();

interface AddUserToGroupBody {
  user_id: number;
  group_id: number;
}

interface AcceptJoinGroupBody {
  user_id: number;
  group_id: number;
}

interface AddAndRemoveQuiz {
  quiz_answer_id: number | null;
  user_id: number;
  group_id: number;
}

router.get('/by-user/:id', (async (req, res) => {
  try {
    const groups = await userGroupController.getAllByUser(parseInt(req.params.id));
    res.status(200).json(groups);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}) as RequestHandler);

router.get('/:id', (async (req: Request, res: Response) => {
  try {
    const group = await userGroupController.one(parseInt(req.params.id, 10));
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}) as RequestHandler);

router.post('/add-user', (async (req: Request, res: Response) => {
  try {
    const body = <AddUserToGroupBody>req.body;
    if (!req.body || !body.user_id || !body.group_id) {
      return res.status(400).json({ error: 'Données manquantes ou invalides' });
    }
    const groupLink = await UserGroupLink.create({
      user_id: body.user_id,
      user_group_id: body.group_id,
      is_accepted: false,
      is_owner: false
    } as UserGroupLinkInterface);
    groupLink ? res.status(201).json(groupLink) : res.status(400).end();
  } catch (error) {
    res.status(500).json({ error: error });
  }
}) as RequestHandler);

router.put('/accept-join-group', (async (req: Request, res: Response) => {
  try {
    const body = <AcceptJoinGroupBody>req.body;
    if (!body || !body.user_id || !body.group_id) {
      return res.status(400).json({ error: 'Données manquantes ou invalides' });
    }

    const result = await userGroupController.acceptToJoinToGroup(body.user_id, body.group_id);
    result !== null ? res.status(200).end() : res.status(400).end();
  } catch (error) {
    res.status(500).json({ error: error });
  }
}) as RequestHandler);

router.get('/remove-user/:id/:groupId', (async (req: Request, res: Response) => {
  try {
    await userGroupController.removeUserFromGroup(parseInt(req.params.id, 10), parseInt(req.params.groupId, 10));
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error });
  }
}) as RequestHandler);

router.delete('/:id/:userId', (async (req: Request, res: Response) => {
  try {
    const group = await userGroupController.delete(parseInt(req.params.id, 10), parseInt(req.params.userId, 10));
    group ? res.status(204).end() : res.status(403).end();
  } catch (error) {
    res.status(500).json({ error: error });
  }
}) as RequestHandler);

router.patch('/add-quiz', (async (req: Request, res: Response) => {
  try {
    const body = <AddAndRemoveQuiz>req.body;
    const result = await userGroupController.addUserQuizAnswerToUserGroup(
      body.quiz_answer_id as number,
      body.user_id,
      body.group_id
    );
    result !== null ? res.status(200).end() : res.status(400).end();
  } catch (error) {
    res.status(500).json({ error: error });
  }
}) as RequestHandler);

router.patch('/remove-quiz', (async (req: Request, res: Response) => {
  try {
    const body = <AddAndRemoveQuiz>req.body;
    const result = await userGroupController.removeUserQuizAnswerToUserGroup(body.user_id, body.group_id);
    result !== null ? res.status(200).end() : res.status(400).end();
  } catch (error) {
    res.status(500).json({ error: error });
  }
}) as RequestHandler);

export default router;
