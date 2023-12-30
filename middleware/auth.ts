import { expressjwt } from 'express-jwt';
import { Secret } from 'jsonwebtoken';

export const authenticateJWT = () => {
    return expressjwt({ secret: process.env.SECRET_SESSION as Secret, algorithms: ['HS256'] });
};
