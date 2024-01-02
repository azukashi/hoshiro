import { generateToken } from '../../functions/generateToken';
import { authenticateJWT } from '../../middleware/auth';
import User from '../../models/auth/User';
import { Request } from 'express-jwt';
import { Response } from 'express';
import bcrypt from 'bcryptjs';

export const changeUsername = [
    authenticateJWT(),
    async (req: Request, res: Response) => {
        const { newUsername, password } = req.body;
        if (!newUsername && !password) return res.status(422).json({ message: 'Username or password is missing!' });

        const user = await User.findOne({ username: req.auth?.username });
        if (!user) return res.status(422).json({ message: 'User is not exist!' });
        if (newUsername === user.username)
            return res.status(422).json({ message: 'New username cannot be same as the old one' });

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return res.status(401).json({ message: "Old password doesn't match!" });

        const newToken = generateToken(newUsername);
        user.username = newUsername;
        user.token = newToken;
        user.save();

        res.send({ message: 'Username successfully changed!', token: newToken });
    },
];
