const pool = require("../config/config");

/* obtener todos los posts con try catch */
/* localhost:3000/posts  con GET */
const obtenerPosts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM posts ORDER BY id ASC");  // que se orden por id
    res.json(result.rows);
  } catch (error) {
    res.status(500).send("Error al obtener los posts");
  }
};

/* se ocupa en agregarPosts */
const insertPost = async (titulo, img, descripcion, likes) => {
  const consulta =
    "INSERT INTO posts values (DEFAULT, $1, $2, $3, $4) RETURNING *";
  const values = [titulo, img, descripcion, likes];
  try {
    const result = await pool.query(consulta, values);
    console.log("Post agregado", result.rowCount);
    return result;
  } catch (error) {
    console.error("Error al insertar el post:", error.message);
    throw error;
  }
};

/* agregar nuevo post con try catch con POST */
const agregarPosts = async (req, res) => {
  const { titulo, img, descripcion, likes } = req.body;
  try {
    const result = await insertPost(titulo, img, descripcion, likes);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).send("Error al agregar el post");
  }
};

/* eliminar post con DELETE REQUERIMIENTO 2 */
/* por ejemplo en thunder client http://localhost:3000/posts/3 */
const eliminarPost = async (req, res) => {
  const { id } = req.params;
  try {
    const consulta = "DELETE FROM posts WHERE id = $1";
    const values = [id];
    await pool.query(consulta, values);
    res.send("Post eliminado con exito"); //mensaje se muestra en thunder
  } catch (error) {
    res.status(500).send("Error al eliminar el post");
  }
};

/* para modificar con PUT REQUERIMIENTO 1 */
/* por ejemplo localhost:3000/posts/28 */
/* {
  "titulo": "Owen Wilson"
} */
const modificarPost = async (req, res) => {
  const { id } = req.params; // obtener el id del post a modificar
  const { titulo, img, descripcion, likes } = req.body; // obtener los valores del body
  try {
    // obtener los valores actuales del post
    const { rows } = await pool.query("SELECT * FROM posts WHERE id = $1", [
      id,
    ]);
    const postActual = rows[0];

    if (!postActual) {
      return res.status(404).send("Post no encontrado");
    }
    //Actualizar solo los campos que fueron enviados (los no enviados quedan igual)
    const nuevoTitulo = titulo || postActual.titulo;
    const nuevaImg = img || postActual.img;
    const nuevaDescripcion = descripcion || postActual.descripcion;
    const nuevosLikes = likes !== undefined ? likes : postActual.likes;

    /* consulta sql para actualizar el post */
    const consulta = `
    UPDATE posts
    SET titulo = $1,
      img = $2,
      descripcion = $3,
      likes = $4
    WHERE id = $5
    `;

    const values = [nuevoTitulo, nuevaImg, nuevaDescripcion, nuevosLikes, id];
    await pool.query(consulta, values);
    res.send("Post modificado con exito");
  } catch (error) {
    res.status(500).send("Error al modificar post");
  }
};

/* dar me gusta a un post */
/* ejemplo localhost:3000/posts/like/28 */
const likePost = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'UPDATE posts SET likes = COALESCE(likes, 0) + 1 WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    res.json({ message: 'Like agregado', post: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar like al post' });
  }
};

module.exports = {
  obtenerPosts,
  agregarPosts,
  eliminarPost,
  modificarPost,
  likePost,
};
