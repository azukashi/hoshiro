import { Request, Response } from 'express';

export const root = (req: Request, res: Response) => {
    res.send({ message: 'Hello, consider using /api as a root instead of this root path.' });
};
