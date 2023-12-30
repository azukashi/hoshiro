import { Request, Response } from 'express';
import User from '../../models/auth/User';
import bcrypt from 'bcryptjs';

export const loginRoute = async (req: Request, res: Response) => {
    const { username, password }: any = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            res.json({ message: 'Login successful', token: user.token });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
