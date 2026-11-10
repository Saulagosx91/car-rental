import { Router } from 'express';
import { CarController } from '@app/controllers/car.controller';
import { container } from 'tsyringe';
import { CreateCarDto } from '@app/dtos/car.dto';
import validateDto from '@app/middlewares/validateDto';
import { upload } from '@app/config/multer';
import { validateAdmin } from '@app/middlewares/checkAuthenticate';

const carRoutes = Router();
const carController = container.resolve(CarController);

carRoutes
  .route('/')
  .get(carController.getAllCars.bind(carController))
  .post(upload.single('car_image'), carController.createCar.bind(carController));

carRoutes
  .route('/:id')
  .get(carController.getCarById.bind(carController))
  .put(carController.updateCar.bind(carController))
  .delete(carController.removeCar.bind(carController));
carRoutes.patch('/:id/available', validateAdmin, carController.setCarAvailable.bind(carController));

export default carRoutes;