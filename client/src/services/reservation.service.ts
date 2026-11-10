import api from '../lib/api';
import { ReservationAPIResponse } from '../types';

const reservationApi = api('reservation');

export class ReservationService {
  async create(reservationData) {
    console.log('Creating reservation with data:', reservationData);
    const response = await reservationApi.post('', reservationData);
    return response.status === 201;
  }

  async find() {
    const { data } = await reservationApi.get('');
    const validationResult = ReservationAPIResponse.safeParse(data);
    if (!validationResult.success) {
      console.error('Validation error:', validationResult.error);
      throw new Error('Invalid reservation data received from API');
    }
    return validationResult.data;
  }

  async findUserReservations() {
    const { data } = await reservationApi.get('/user');
    const validationResult = ReservationAPIResponse.safeParse(data);
    if (!validationResult.success) {
      console.error('Validation error:', validationResult.error);
      throw new Error('Invalid reservation data received from API');
    }
    return validationResult.data;
  }
}