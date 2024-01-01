const router = require("express").Router();
const {
  createNote,
  updateNote,
  getNote,
  deleteNote,
  getAllNotes,
} = require("../controllers/noteController");
const { isAuthenticatedUser } = require("../middlewares/auth");
router.route("/create").post(isAuthenticatedUser, createNote);
router.route("/update").put(isAuthenticatedUser, updateNote);
router
  .route("/note/:id")
  .get(isAuthenticatedUser, getNote)
  .delete(isAuthenticatedUser, deleteNote);
router.route("/notes/all").get(isAuthenticatedUser, getAllNotes);
module.exports = router;
