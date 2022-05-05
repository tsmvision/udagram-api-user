import { Router, Request, Response } from 'express';
import { UserRouter } from './users/routes/user.router';

const router: Router = Router();

router.use('/users', UserRouter);

router.get('/', async (req: Request, res: Response) => {    
    res.send("users");
});

export const IndexRouter: Router = router;