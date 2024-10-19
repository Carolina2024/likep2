/* DESAFIO 4 MÓDULO NODE */
/* en archivo bd.sql se encuentra la base de datos y la tabla ocupada en la consola */

/* La clase Pool nos permite soportar multiconexiones y un mejor rendimiento en las consultas */
const { Pool } = require("pg");

/* Crear una instancia de la clase Pool usando un objeto de configuración con las credenciales. */
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "sql7777",
  database: "likeme",
  allowExitOnIdle: true, // Esta propiedad le indicará a PostgreSQL que cierre la conexión luego de cada consulta
});

/* exportar */
module.exports = pool;
