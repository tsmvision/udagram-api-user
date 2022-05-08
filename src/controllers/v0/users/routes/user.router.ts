import { Router, Request, Response } from 'express';
import { User } from '../models/User';
import { AuthRouter } from './auth.router';
import logger from '../../../../logger';

const router: Router = Router();

router.use('/auth', AuthRouter);

router.get('/', async (req: Request, res: Response) => {
    return res.send("users");
});

router.get('/:id', async (req: Request, res: Response) => {
    let { id } = req.params;
    logger.info(id);
    const item = await User.findByPk(id);
    
    logger.info(item);
    res.send(item);
});

export const UserRouter: Router = router;