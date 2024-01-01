import { generateToken } from '../../functions/generateToken';
import { Request, Response } from 'express';
import User from '../../models/auth/User';
import bcrypt from 'bcryptjs';

export const registerRoute = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username && !password)
        return res.status(401).json({ message: 'Username & password is required to register!' });

    try {
        // Check if the username already exist
        const data = await User.findOne({ username: username });
        if (data) return res.status(422).json({ message: 'Username already exist!' });

        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with a generated token
        const newUser = new User({
            username: username,
            password: hashedPassword,
            token: generateToken(username),
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully', token: newUser.token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
