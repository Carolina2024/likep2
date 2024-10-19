const express = require("express");
const {
  obtenerPosts,
  agregarPosts,
  modificarPost,
  eliminarPost,
  likePost,
} = require("../controllers/postsControllers");

const router = express.Router();

router.get("/posts", obtenerPosts);

router.post("/posts", agregarPosts);

router.put("/posts/:id", modificarPost);

router.delete("/posts/:id", eliminarPost);

router.put("/posts/like/:id", likePost);

module.exports = router;
