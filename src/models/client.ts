import { Optional, Model, DataTypes } from 'sequelize';
import db from '../database/connection';

interface ClientAttributes {
    id: string;
    cedula: string;
    firstName: string;
    lastName: string;
    addres: string;
    phone: string;
    status: number;
}

interface ClientCreationAttributes extends Optional<ClientAttributes, 'id' > {}

export interface ClientInstance extends Model<ClientAttributes, ClientCreationAttributes>, ClientAttributes {
    createdAt?: Date;
    updatedAt?: Date;

}

const Client = db.define<ClientInstance>('Client', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    cedula: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    addres: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    status: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
        allowNull: false
    }
});


export default Client;