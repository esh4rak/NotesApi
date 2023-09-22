const express = require("express");
const { getNote, createNote, deleteNote, updateNote } = require("../controllers/noteController");
const auth = require("../middlewares/auth");
const noteRouter = express.Router();


noteRouter.get("/getNotes", auth, getNote)


noteRouter.post("/createNote", auth, createNote)


noteRouter.delete("/deleteNote/:id", auth, deleteNote)


noteRouter.put("/updateNote/:id", auth, updateNote)


module.exports = noteRouter;