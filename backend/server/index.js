/* para habilitar los cors */
const cors = require("cors");
// Importar express y se ejecuta para obtener un enrutador (app)
const express = require("express");
const app = express();

/* habilitar cors para permitir solicitudes desde el frontend (localhost:5173) */
/* app.use(cors({ origin: "http://localhost:5173" })); */

app.use(cors()); // se permite cors para todas las rutas

/* parsear el cuerpo de la consulta */
app.use(express.json());

const postsRoutes = require("../routes/postsRoutes");
app.use(postsRoutes);

/* Crea un servidor en el puerto 3000  http://localhost:3000 */
app.listen(3000, () => console.log("SERVIDOR ENCENDIDO en el puerto 3000"));
