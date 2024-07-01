import { Router } from 'express';
import CountryController from '../controllers/CountryController';

const router = Router();
const countryController = new CountryController();

router.get('/countries', async (req, res) => {
    const countries = await countryController.list();
    res.json(countries);
});

router.get('/countries/:id', async (req, res) => {
    const country = await countryController.one(parseInt(req.params.id, 10));
    res.json(country);
});

router.post('/countries', async (req, res) => {
    const country = await countryController.new(req.body.name, req.body.code);
    res.json(country);
});

router.put('/countries/:id', async (req, res) => {
    const country = await countryController.update(parseInt(req.params.id, 10), req.body.name, req.body.code);
    res.json(country);
});

router.delete('/countries/:id', async (req, res) => {
    const country = await countryController.remove(parseInt(req.params.id, 10));
    res.json(country);
});



export default router;
