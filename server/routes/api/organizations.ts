import { Router } from 'express';
import { Request, Response } from 'express';
import organizationController from '../../controllers/organizationController';

const router = Router();

router.route('/')
    .get(async (req: Request, res: Response) => {
        try {
            const organizations = await organizationController.findAll(null, null);
            res.status(200).json(organizations);
        } catch (error) {
            res.status(422).json({ msg: error.message });
        }
    })
    .post(async (req: Request, res: Response) => {
        try {
            const newOrganization = await organizationController.create(req.body, null);
            res.status(201).json(newOrganization);
        } catch (error) {
            res.status(422).json({ msg: error.message });
        }
    });

export default router;
