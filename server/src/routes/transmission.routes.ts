import { Router } from 'express';
import { TransmissionController } from '@app/controllers/transmission.controller';
import { container } from 'tsyringe';

const transmissionRouter = Router();
const transmissionController = container.resolve(TransmissionController);

transmissionRouter
  .route('/')
  .get(transmissionController.getAllTransmissions)
  .post(transmissionController.createTransmission);

transmissionRouter
  .route('/:id')
  .get(transmissionController.getTransmissionById)
  .put(transmissionController.updateTransmissiond)
  .delete(transmissionController.deleteTransmissiond);

export default transmissionRouter;
