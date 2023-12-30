import { authenticateJWT } from '../../middleware/auth';
import { Request } from 'express-jwt';
import { Response } from 'express';

export const protectedRoute = [
    authenticateJWT(),
    (req: Request, res: Response) => {
        res.json({ message: 'Protected route - Authentication successful', user: req.auth });
    },
];
