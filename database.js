import { Sequelize } from 'sequelize';
import 'dotenv/config'; // Activa la lectura del archivo .env

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false 
    }
  }
});

export default sequelize;
