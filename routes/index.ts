// @ts-nocheck
import express, { Router } from 'express';
import { useYouTubeData } from '../functions/useYouTubeData';
import { name, version } from '../package.json';
import Indonesia from '../models/Indonesia';
import Malaysia from '../models/Malaysia';
import Singapore from '../models/Singapore';
import Vietnam from '../models/Vietnam';

const router: Router = express.Router();
const regions = [
    { code: 'id', db: Indonesia },
    { code: 'my', db: Malaysia },
    { code: 'sg', db: Singapore },
    { code: 'vn', db: Vietnam },
];

router.get('/', (req, res) => {
    res.send({ _APPNAME: name, message: 'Hello!', version: version });
});

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
        const filterred = await useYouTubeData(req.params.handle as string, region.code == 'vn');
        res.send({ ...data.toJSON(), ...filterred });
    });
});

export default router;
