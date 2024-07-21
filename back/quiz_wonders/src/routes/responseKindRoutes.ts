import { Router } from "express";
import  ResponseKindController  from "../controllers/ResponseKindController";

const router = Router();
const responseKindController = new ResponseKindController();

router.get("/", async (req, res) => {
    const response = await responseKindController.list()
    res.json(response);
});

router.get("/:id", async (req, res) => {
    const response = await responseKindController.one(parseInt(req.params.id, 10))
    res.json(response);
});

router.post("/", async (req, res) => {
    const response = await responseKindController.new(req.body.type)
    res.json(response);
});

router.put("/:id", async (req, res) => {
    const response = await responseKindController.update(parseInt(req.params.id, 10), req.body.type)
    res.json(response);
});

router.delete("/:id", async (req, res) => {
    const response = await responseKindController.remove(parseInt(req.params.id, 10))
    res.json(response);
});

export default router;
