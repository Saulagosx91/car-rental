import { Router } from 'express';
import { TransmissionController } from '@app/controllers/transmission.controller';
import { container } from 'tsyringe';

const transmissionRouter = Router();
const transmissionController = container.resolve(TransmissionController);

transmissionRouter
  .route('/')
  .get(transmissionController.getAllTransmissions.bind(transmissionController))
  .post(transmissionController.createTransmission.bind(transmissionController));

transmissionRouter
  .route('/:id')
  .get(transmissionController.getTransmissionById.bind(transmissionController))
  .put(transmissionController.updateTransmissiond.bind(transmissionController))
  .delete(transmissionController.deleteTransmissiond.bind(transmissionController));

export default transmissionRouter;
