import 'reflect-metadata';
import Reservation from "@app/models/reservation.model";
import { NotFoundException, BadRequestException } from "@app/common/exceptions/httpException";
import { IService } from "./IService";
import { CreateReservationDto } from "@app/dtos/reservation.dto";
import User from "@app/models/user.model";
import Car from "@app/models/car.model";
import { sequelize } from "@app/config/database";
import { injectable } from 'tsyringe';

const MAX_DAYS = 5;
const TIMEZONE = 'America/Managua';

function todayInManagua(): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: TIMEZONE });
}

function addMonths(dateStr: string, months: number): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1 + months, d));
  return date.toISOString().slice(0, 10);
}

function diffDaysInclusive(start: string, end: string): number {
  const s = new Date(start + 'T00:00:00Z').getTime();
  const e = new Date(end + 'T00:00:00Z').getTime();
  return Math.round((e - s) / 86400000) + 1;
}

@injectable()
export class ReservationService implements IService<Reservation> {
  async find() {
    const reservations = await Reservation.findAll({
      include: [User, Car]
    });
    if (reservations.length === 0) throw new NotFoundException('No reservations found');

    return reservations;
  }

  async findOne(id: number) {
    const reservation = await Reservation.findByPk(id, {
      include: [User, Car]
    });
    if (reservation) return reservation;

    throw new NotFoundException(`Reservation with id ${id} not found`);
  }

  async create(reservationData: CreateReservationDto) {
    const { start_date, return_date, carId, userId } = reservationData;
    if (!userId) throw new BadRequestException('User not authenticated');

    const startDate = start_date.slice(0, 10);
    const returnDate = return_date.slice(0, 10);
    const today = todayInManagua();
    const windowEnd = addMonths(today, 1);

    if (startDate < today) throw new BadRequestException('Start date cannot be before today');
    if (returnDate < startDate) throw new BadRequestException('Return date cannot be before start date');
    if (startDate > windowEnd || returnDate > windowEnd) {
      throw new BadRequestException('Dates must be within one month from today');
    }

    const days = diffDaysInclusive(startDate, returnDate);
    if (days > MAX_DAYS) throw new BadRequestException('Reservation cannot exceed 5 days');

    const transaction = await sequelize.transaction();
    try {
      const car = await Car.findByPk(carId, { transaction, lock: transaction.LOCK.UPDATE });
      if (!car) throw new NotFoundException(`Car with id ${carId} not found`);
      if (car.status !== 'DISPONIBLE') {
        throw new BadRequestException('Car is not available for reservation');
      }

      const total = car.price * days;
      const newReservation = await Reservation.create(
        { start_date: new Date(startDate), return_date: new Date(returnDate), total, userId, carId, status: 'SOLICITED' },
        { transaction }
      );

      await car.update({ status: 'RESERVADO' }, { transaction });
      await transaction.commit();
      return newReservation;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async update(id: number, reservationData: Partial<Reservation>) {
    const reservation = await Reservation.findByPk(id);

    if (!reservation) throw new NotFoundException(`Reservation with id ${id} not found`);

    const updatedReservation = await reservation.update(reservationData);
    return updatedReservation;
  }

  async remove(id: number) {
    const reservation = await Reservation.findByPk(id);
    if (!reservation) throw new NotFoundException(`Reservation with id ${id} not found`);

    await reservation.update({ status: 'CANCELLED' });
    return true;
  }

  async findUserReservations(id: number) {
    const reservations = await Reservation.findAll({
      where: {
        userId: id,
        status: 'SOLICITED'
      },
      include: [Car]
    });
    if (reservations.length === 0) throw new NotFoundException(`No reservations found for user with id ${id}`);

    return reservations;
  }
}
