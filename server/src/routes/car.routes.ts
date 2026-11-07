import { Router } from 'express';
import { CarController } from '@app/controllers/car.controller';
import { CreateCarDto } from '@app/dtos/car.dto';
import validateDto from '@app/middlewares/validateDto';
import { upload } from '@app/config/multer';
import { validateAdmin } from '@app/middlewares/checkAuthenticate';

const carRoutes = Router();
const carController = new CarController();

carRoutes
  .route('/')
  .get(carController.getAllCars)
  .post(upload.single('car_image'), carController.createCar);

carRoutes
  .route('/:id')
  .get(carController.getCarById)
  .put(carController.updateCar)
  .delete(carController.removeCar);

carRoutes.patch('/:id/available', validateAdmin, carController.setCarAvailable);

export default carRoutes;