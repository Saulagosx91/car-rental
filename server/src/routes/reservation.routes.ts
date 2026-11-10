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
  .get(reservationController.find.bind(reservationController))
  .post(validateAuth, validateDto(CreateReservationDto), reservationController.create.bind(reservationController));

reservationRoutes.get('/user', validateAuth, reservationController.findUserReservations.bind(reservationController));

reservationRoutes
  .route('/:id')
  .get(reservationController.findOne.bind(reservationController));

export default reservationRoutes;