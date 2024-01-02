import { authenticateJWT } from '../../middleware/auth';
import User from '../../models/auth/User';
import { Request } from 'express-jwt';
import { Response } from 'express';
import bcrypt from 'bcryptjs';

export const changePassword = [
    authenticateJWT(),
    async (req: Request, res: Response) => {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword && !newPassword)
            return res.status(422).json({ message: 'Old password or new password missing!' });

        const user = await User.findOne({ username: req.auth?.username });
        if (!user) return res.status(422).json({ message: 'User is not exist!' });

        const passwordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!passwordMatch) return res.status(401).json({ message: "Old password doesn't match!" });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.save();

        res.send({ message: 'Password successfully changed!' });
    },
];
