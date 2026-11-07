import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import { sequelize } from '@app/config/database';
import User from './user.model';
import Car from './car.model';

class Reservation extends Model<
  InferAttributes<Reservation>,
  InferCreationAttributes<Reservation>
> {
  declare id?: number;
  declare start_date: Date;
  declare return_date: Date;
  declare status: 'SOLICITED' | 'CANCELLED' | 'COMPLETED';
  declare total: number;
  declare userId: number;
  declare carId: number;
}

Reservation.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    return_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('SOLICITED', 'CANCELLED', 'COMPLETED'),
      defaultValue: 'SOLICITED',
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    carId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Reservation',
    tableName: 'reservation',
  }
);

User.hasMany(Reservation, { foreignKey: 'userId' });
Reservation.belongsTo(User, { foreignKey: 'userId' });

Reservation.belongsTo(Car, { foreignKey: 'carId' });
Car.hasMany(Reservation, { foreignKey: 'carId' });

export default Reservation;
