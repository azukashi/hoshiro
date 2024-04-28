import { check } from '../controllers/check';
import express, { Router } from 'express';

const router: Router = express.Router();

router.get('/check', check);

export default router;
