import { NextFunction, Response, Request } from 'express';

export const authErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send({ message: 'Unauthorized access' });
    } else {
        next(err);
    }
};
