import { RequestHandler, Router } from 'express';
import PictureController from '../controllers/pictureController';

const router = Router();

const pictureController = new PictureController()

interface RequestBody {
    path:string
  }

router.get('/picture', async (req, res) => {
    const picture = await pictureController.list()
    res.json(picture)
})

router.get('/picture/:id', async (req, res) => {
    const picture = await pictureController.one(parseInt(req.params.id, 10))
    res.json(picture)
});

router.post('/picture', async (req, res) => {
    const picture = await pictureController.new({ path: req.body.path });
    res.json(picture);
});

router.put('/picture/:id', async (req, res) => {
    const picture = await pictureController.update(parseInt(req.params.id, 10), req.body.path)
    res.json(picture)
})

router.delete('/picture/:id', async (req, res) => {
    const picture = await pictureController.delete(parseInt(req.params.id, 10))
    res.json(picture)
})

export default router;