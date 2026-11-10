import { Router } from 'express';
import { ReservationController } from '@app/controllers/reservation.controller';
import { container } from 'tsyringe';
import validateDto from '@app/middlewares/validateDto';
import { CreateReservationDto } from '@app/dtos/reservation.dto';
import { validateAuth } from '@app/middlewares/checkAuthenticate';

const reservationRoutes = Router();
const reservationController = container.resolve(ReservationController);

reservationRoutes
  .route('/')
  .get(reservationController.find)
  .post(validateAuth, validateDto(CreateReservationDto), reservationController.create);

reservationRoutes.get('/user', validateAuth, reservationController.findUserReservations);

reservationRoutes
  .route('/:id')
  .get(reservationController.findOne);

export default reservationRoutes;