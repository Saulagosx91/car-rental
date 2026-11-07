import { ReservationService } from './reservation.service';
import Car from '@app/models/car.model';
import Reservation from '@app/models/reservation.model';
import { sequelize } from '@app/config/database';

jest.mock('../models/car.model', () => ({ __esModule: true, default: { findByPk: jest.fn() } }));
jest.mock('../models/reservation.model', () => ({ __esModule: true, default: { findAll: jest.fn(), findByPk: jest.fn(), create: jest.fn() } }));
jest.mock('../models/user.model', () => ({ __esModule: true, default: {} }));
jest.mock('../config/database', () => ({
  sequelize: {
    transaction: jest.fn(),
  },
}));

const mockTransaction = {
  LOCK: { UPDATE: 'UPDATE' },
  commit: jest.fn(),
  rollback: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
  (sequelize.transaction as jest.Mock).mockResolvedValue(mockTransaction);
});

describe('ReservationService.create', () => {
  it('rejects when return date is before start date', async () => {
    const service = new ReservationService();
    const today = new Date().toISOString().slice(0, 10);
    await expect(
      service.create({ start_date: today, return_date: '2020-01-01', carId: 1, userId: 1 })
    ).rejects.toThrow('Return date cannot be before start date');
  });

  it('rejects when car is already reserved', async () => {
    (Car.findByPk as jest.Mock).mockResolvedValue({ id: 1, price: 10, status: 'RESERVADO', update: jest.fn() });
    const service = new ReservationService();
    const today = new Date().toISOString().slice(0, 10);
    await expect(
      service.create({ start_date: today, return_date: today, carId: 1, userId: 1 })
    ).rejects.toThrow('Car is not available for reservation');
  });

  it('rejects when reservation exceeds 5 days', async () => {
    (Car.findByPk as jest.Mock).mockResolvedValue({ id: 1, price: 10, status: 'DISPONIBLE', update: jest.fn() });
    const service = new ReservationService();
    const start = new Date();
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    await expect(
      service.create({ start_date: start.toISOString(), return_date: end.toISOString(), carId: 1, userId: 1 })
    ).rejects.toThrow('Reservation cannot exceed 5 days');
  });

  it('rejects when dates are outside one-month window', async () => {
    (Car.findByPk as jest.Mock).mockResolvedValue({ id: 1, price: 10, status: 'DISPONIBLE', update: jest.fn() });
    const service = new ReservationService();
    const start = new Date();
    start.setDate(start.getDate() + 40);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);
    await expect(
      service.create({ start_date: start.toISOString(), return_date: end.toISOString(), carId: 1, userId: 1 })
    ).rejects.toThrow('Dates must be within one month from today');
  });
});
