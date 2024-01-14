// @ts-nocheck
import express, { Router } from 'express';
import { authenticateJWT } from '../middleware/auth';
import { Request } from 'express-jwt';
import { Response } from 'express';
import { useYTData } from '../functions/useYTData';
import { root } from './info/root';
import { registerRoute } from './auth/register';
import { loginRoute } from './auth/login';
import { protectedRoute } from './protected/test';
import { regions } from '../constants/regions';
import { changePassword } from './auth/changePassword';
import { changeUsername } from './auth/changeUsername';
import { notFound } from './info/notfound';

const router: Router = express.Router();

router.get('/', root);
router.post('/auth/register', registerRoute);
router.post('/auth/login', loginRoute);
router.patch('/auth/password', changePassword);
router.patch('/auth/username', changeUsername);
router.get('/protected', protectedRoute);

regions.forEach((region) => {
    // Public routes
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
        let data = await region.db.findOne(params);
        if (!data) return res.status(404).send({ error: 'Queried handle not found!' });
        const filterred = await useYTData(req.params.handle as string);
        res.send({ ...data.toJSON(), ...filterred });
    });

    // Protected routes
    router.post(`/${region.code}`, [
        authenticateJWT(),
        async (req: Request, res: Response) => {
            let { name, personality, birthdate, group, status, handle } = req.body;
            let contributors = req.auth;
            if (!name) return res.status(422).json({ message: 'Name is required!' });
            if (!personality) personality = '-';
            if (!birthdate) birthdate = '-';
            if (!group) group = '-';
            if (!status) return res.status(422).json({ message: 'Status is required!' });
            if (!handle) return res.status(422).json({ message: 'YouTube handle is required!' });
            const data = new region.db({
                name: name,
                personality: personality,
                birthdate: birthdate,
                group: group,
                status: status,
                handle: handle,
                contributors: [contributors],
            });
            await data.save();
            res.send(data);
        },
    ]);
    router.patch(`/${region.code}/:handle`, [
        authenticateJWT(),
        async (req: Request, res: Response) => {
            let { name, personality, birthdate, group, status, handle } = req.body;
            let params = { handle: req.params.handle };
            let contributors = req.auth;

            try {
                const data = await region.db.findOne(params);

                if (name) data.name = name;
                if (personality) data.personality = personality;
                if (birthdate) data.birthdate = birthdate;
                if (group) data.group = group;
                if (status) data.status = status;
                if (handle) data.handle = handle;
                if (!data.contributors.find(({ username }) => username === contributors?.username))
                    data.contributors.push(contributors);

                await data.save();
                res.send(data);
            } catch (err) {
                res.status(404).json({ message: 'Handle does not exist!' });
            }
        },
    ]);
});

// NEVER PLACE THIS UPSIDE
router.get('*', notFound);

export default router;
