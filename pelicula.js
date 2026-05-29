import { DataTypes } from 'sequelize';
import sequelize from '../database.js';
const pelicula = sequelize.define('pelicula', {
id: {
type: DataTypes.INTEGER,
primaryKey: true,
autoIncrement: true
},
Titulo: {
type: DataTypes.INTEGER(50),
},
Año: {
type: DataTypes.DATE,
allowNull: false
},
Duracion: {
type: DataTypes.INTEGER,
allowNull: false
},
Genero: {
type: DataTypes.STRING(20),
allowNull: false
},
Sinopsis: {
type: DataTypes.STRING(200),
allowNull: false
},
Calificacion: {
type: DataTypes.DECIMAL(10, 2),
allowNull: false
}
}, {
tableName: 'peliculas',
timestamps: false
});
export default pelicula;