import jwt, { Secret } from 'jsonwebtoken';

export const generateToken = (username: string): string => {
    const secretKey = process.env.SECRET_SESSION as Secret;
    return jwt.sign({ username }, secretKey, { expiresIn: '60d' });
};
