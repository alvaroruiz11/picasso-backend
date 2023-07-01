import { DataTypes, Model, Optional } from 'sequelize';
import db from '../database/connection';

interface UserAttributes {
    id: string;
    name: string;
    email: string;
    password: string;
    status: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' > {}

export interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}


const User = db.define<UserInstance>('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
        allowNull: false,
    }
});


export default User;