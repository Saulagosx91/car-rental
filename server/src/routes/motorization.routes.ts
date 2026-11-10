import { Router } from 'express';
import { MotorizationController } from '@app/controllers/motorization.controller';
import { container } from 'tsyringe';

const motorizationRouter = Router();
const motorizationController = container.resolve(MotorizationController);

motorizationRouter
  .route('/')
  .get(motorizationController.getAllMotorizations)
  .post(motorizationController.createMotorization);

motorizationRouter
  .route('/:id')
  .get(motorizationController.getMotorizationById)
  .put(motorizationController.updateMotorization);

export default motorizationRouter;
