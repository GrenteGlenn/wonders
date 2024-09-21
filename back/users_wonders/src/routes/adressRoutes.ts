import { RequestHandler, Router } from 'express';
import AddressController from '../controllers/AddressController';
import AddressInterface from '../interfaces/AddressInterface';

const router = Router();

const addressController = new AddressController();

router.get('/', (async (req, res) => {
  const address = await addressController.list();
  res.status(200).json(address);
}) as RequestHandler);

router.get('/:id', (async (req, res) => {
  const address = await addressController.getOne(parseInt(req.params.id, 10));
  res.status(200).json(address);
}) as RequestHandler);

router.get('/user/:id', (async (req, res) => {
  const address = await addressController.getByUser(parseInt(req.params.id, 10));
  res.status(200).json(address);
}) as RequestHandler);

router.get('/country/:id', (async (req, res) => {
  const address = await addressController.getByCountry(parseInt(req.params.id, 10));
  res.status(200).json(address);
}) as RequestHandler);

router.post('/register', (async (req, res) => {
  const body = <AddressInterface>req.body;
  await addressController.new(body);
  res.status(200).json(body);
}) as RequestHandler);

router.put('/:id', (async (req, res) => {
  const body = <AddressInterface>req.body;
  const address = await addressController.update(parseInt(req.params.id, 10), body);
  res.status(200).json(address);
}) as RequestHandler);

router.delete('/:id', (async (req, res) => {
  const address = await addressController.remove(parseInt(req.params.id, 10));
  res.status(200).json(address);
}) as RequestHandler);

export default router;
