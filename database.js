import { Sequelize } from 'sequelize';
// process.env.DATABASE_URL será inyectado dinámicamente por la infraestructura de Render
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgresql://pelicula_dd8e_user:ni6HG3t2V7kCPGouCc9KXgwqkbmcLMs8@dpg-d8brd1jtqb8s73a63gh0-a.oregon-postgres.render.com/pelicula_dd8e ', {
dialect: 'postgres',
logging: false,
dialectOptions: {
ssl: {
require: true,
rejectUnauthorized: false // Permite la conexión con los certificados dinámicos de Render
}
}
});
export default sequelize;