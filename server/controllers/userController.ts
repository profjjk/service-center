import { Request, Response } from 'express';
import User, { IUser } from '../models/user';

export default {
    create: async (req: Request, res: Response): Promise<void> => {
        try {
            const data: IUser = await User.create(req.body);
            res.status(201).json(data);
        } catch(err) { res.status(422).json({ msg: err }) }
    },

    findAll: async (req: Request, res: Response): Promise<void> => {
        try {
            const data: IUser[] = await User.find().select('-password').sort({ createdAt: 1 });
            res.status(200).json(data);
        } catch(err) { res.status(422).json({ msg: err }) }
    },

    findOne: async (req: Request, res: Response): Promise<void> => {
        try {
            const data: IUser | null = await User.findOne({ username: req.params.username }).select('-password');
            res.status(200).json(data);
        } catch(err) { res.status(422).json({ msg: err }) }
    },

    findById: async (req: Request, res: Response): Promise<void> => {
        try {
            const data: IUser | null = await User.findById({ _id: req.params.id }).select('-password');
            res.status(200).json(data);
        } catch(err) { res.status(422).json({ msg: err }) }
    },

    update: async (req: Request, res: Response): Promise<void> => {
        try {
            const data: IUser | null = await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
            res.status(200).json(data);
        } catch(err) { res.status(422).json({ msg: err }) }
    },

    delete: async (req: Request, res: Response): Promise<void> => {
        try {
            await User.deleteOne({ _id: req.params.id });
            res.end();
        } catch(err) { res.status(422).json({ msg: err }) }
    }
}
