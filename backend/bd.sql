/* se crea la base de datos */
CREATE DATABASE likeme;
/* para conectarse a la base de datos */
\c likeme;
/* se crea la tabla */
CREATE TABLE posts (id SERIAL PRIMARY KEY, titulo VARCHAR(25), img VARCHAR(1000),descripcion VARCHAR(255), likes INT);