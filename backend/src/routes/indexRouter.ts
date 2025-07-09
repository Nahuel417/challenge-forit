import { Router } from 'express';
import taskRouter from './taskRouter';
const indexRouter = Router();

indexRouter.use('/api', taskRouter);

export default indexRouter;
