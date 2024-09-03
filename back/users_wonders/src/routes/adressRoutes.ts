import { RequestHandler, Router } from 'express';
import AddressController from '../controllers/AddressController';
import AddressInterface from '../interfaces/AddressInterface';

const router = Router();

const addressController = new AddressController();

router.get('/address', (async (req, res) => {
  const address = await addressController.list();
  res.json(address);
}) as RequestHandler);

router.get('/address/:id', (async (req, res) => {
  const address = await addressController.getOne(parseInt(req.params.id, 10));
  res.json(address);
}) as RequestHandler);

router.get('/address/user/:id', (async (req, res) => {
  const address = await addressController.getByUser(parseInt(req.params.id, 10));
  res.json(address);
}) as RequestHandler);

router.get('/address/country/:id', (async (req, res) => {
  const address = await addressController.getByCountry(parseInt(req.params.id, 10));
  res.json(address);
}) as RequestHandler);

router.post('/register', (async (req) => {
  const body = <AddressInterface>req.body;
  await addressController.new(body);
}) as RequestHandler);

router.put('/address/:id', (async (req, res) => {
  const body = <AddressInterface>req.body;
  const address = await addressController.update(parseInt(req.params.id, 10), body);
  res.json(address);
}) as RequestHandler);

router.delete('/address/:id', (async (req, res) => {
  const address = await addressController.remove(parseInt(req.params.id, 10));
  res.json(address);
}) as RequestHandler);

export default router;
