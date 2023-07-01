import { Sequelize } from 'sequelize';


const db = new Sequelize('picasso', 'root', 'sNUV+834', {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false
});

export default db;