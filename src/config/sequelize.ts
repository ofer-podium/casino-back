import 'dotenv/config';
import { Sequelize } from 'sequelize';

const db_name = process.env.DB_NAME!;
const db_user = process.env.DB_USER!;
const db_password = process.env.DB_PASSWORD!;
const db_host = process.env.DB_HOST!;

console.log(db_name,'DB NAME');
console.log(db_user,'DB USER');
console.log(db_password,'DB PASSWORD');
console.log(db_host,'DB HOST');


const sequelizeConnection = new Sequelize(db_name, db_user, db_password, {
    host:db_host,
    dialect: 'mysql',
    logging: false,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

export default sequelizeConnection;