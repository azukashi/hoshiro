import express, { Router } from 'express';
import { useYTData } from '../functions/useYTData';
import { apiRoute } from './info/api';
import { registerRoute } from './auth/register';
import { loginRoute } from './auth/login';
import { protectedRoute } from './protected/test';
import { regions } from '../constants/regions';

const router: Router = express.Router();

router.get('/', apiRoute);
router.post('/register', registerRoute);
router.post('/login', loginRoute);
router.get('/protected', protectedRoute);

regions.forEach((region) => {
    router.get(`/${region.code}`, async (req, res) => {
        const data = await region.db.find();
        res.send(data);
    });
    router.get(`/${region.code}/active`, async (req, res) => {
        const data = await region.db.find({ status: 'ACTIVE' });
        res.send(data);
    });
    router.get(`/${region.code}/graduated`, async (req, res) => {
        const data = await region.db.find({ status: 'GRADUATED' });
        res.send(data);
    });
    router.get(`/${region.code}/:handle`, async (req, res) => {
        let params: any = { handle: req.params.handle };
        if (region.code == 'vn') params = { ch_id: req.params.handle };
        let data = await region.db.findOne(params);
        if (!data) return res.status(404).send({ error: 'Queried handle not found!' });
        const filterred = await useYTData(req.params.handle as string, region.code == 'vn');
        res.send({ ...data.toJSON(), ...filterred });
    });
});

export default router;
