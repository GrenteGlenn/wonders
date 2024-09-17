import { RequestHandler, Router } from 'express';
import RoleController from '../controllers/RoleController';
import RoleInterface from '../interfaces/RoleInterface';

const router = Router();

const roleController = new RoleController();

router.get('/role', (async (req, res) => {
  const roles = await roleController.list();
  res.status(200).json(roles);
}) as RequestHandler);

router.get('/role/:id', (async (req, res) => {
  const roles = await roleController.getOne(parseInt(req.params.id, 10));
  res.status(200).json(roles);
}) as RequestHandler);

router.post('/role', (async (req, res) => {
  const body = <RoleInterface>req.body;
  const roles = await roleController.create(body);
  res.status(200).json(roles);
}) as RequestHandler);

router.put('/role/:id', (async (req, res) => {
  const body = <RoleInterface>req.body;
  const roles = await roleController.update(parseInt(req.params.id, 10), body);
  res.status(200).json(roles);
}) as RequestHandler);

router.delete('/role/:id', (async (req, res) => {
  const roles = await roleController.delete(parseInt(req.params.id, 10));
  res.status(200).json(roles);
}) as RequestHandler);

export default router;
