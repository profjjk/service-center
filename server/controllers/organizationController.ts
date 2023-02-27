import { Request, Response } from 'express';
import Organization, { IOrganization } from '../models/organization';

export default {
    create: async (req: Request, res: Response): Promise<void> => {
        try {
            const data: IOrganization = await Organization.create(req.body);
            res.status(201).json(data);
        } catch(err) { res.status(422).json({ msg: err }) }
    },

    findAll: async (req: Request, res: Response): Promise<void> => {
        try {
            const data: IOrganization[] = await Organization.find().sort({ updatedAt: 1 });
            res.status(200).json(data);
        } catch(err) { res.status(422).json({ msg: err }) }
    }
}