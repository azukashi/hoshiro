import { Request, Response } from 'express';
import { name, version } from '../../package.json';

export const apiRoute = (req: Request, res: Response) => {
    res.send({ _APPNAME: name, message: 'Hello!', version: version });
};
