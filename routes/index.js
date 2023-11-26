import express from 'express';
import Indonesia from '../models/Indonesia.js';

const router = express.Router();

router.get('/id', async (req, res) => {
    const id = await Indonesia.find();
    res.send(id);
});

router.get('/id/active', async (req, res) => {
    const id = await Indonesia.find({ status: 'ACTIVE' });
    res.send(id);
});

router.get('/id/graduated', async (req, res) => {
    const id = await Indonesia.find({ status: 'GRADUATED' });
    res.send(id);
});

router.get('/id/:handle', async (req, res) => {
    const id = await Indonesia.findOne({ handle: req.params.handle });
    if (!id) return res.status(404).send({ error: 'Queried handle not found!' });
    res.send(id);
});

export default router;
