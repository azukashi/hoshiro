import express, { Router } from 'express';
import Indonesia from '../models/Indonesia';
import { useChannelGetter } from '../functions/useChannelGetter';
import { YTNodes } from 'youtubei.js';

const router: Router = express.Router();

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
    const data = await useChannelGetter(`https://youtube.com/${req.params.handle}`);
    const header = data.header?.as(YTNodes.C4TabbedHeader);
    const filterred = {
        picture: data.metadata.avatar,
        banner: header?.banner,
        subscribers: header?.subscribers?.text,
        videos: header?.videos_count?.text,
        is_verified: header?.author.is_verified,
        is_membership: !header?.sponsor_button?.is_disabled,
    };
    res.send({ ...id.toJSON(), ...filterred });
});

export default router;
