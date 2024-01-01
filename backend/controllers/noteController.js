const Note = require("../schema/NoteModel");
const validator = require("validator");

exports.createNote = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Check : If all values are provided
    if (!title || !description) {
      return await res
        .status(400)
        .send({ success: false, message: "Please fill in all the details" });
    }

    // Check  : Is title or description length == 0

    if (validator.isEmpty(title) || validator.isEmpty(description)) {
      return await res
        .status(400)
        .send({ success: false, message: "Please fill in all the details." });
    }

    // Check  : Is title length in the range of 5-30 characters
    if (!validator.isLength(title, { max: 30, min: 5 })) {
      return await res.status(400).send({
        success: false,
        message: "Title length must be in the range of 5-30 characters.",
      });
    }
    // Check  : Is description length in the range of 5-100 characters
    if (!validator.isLength(description, { max: 100, min: 5 })) {
      return await res.status(400).send({
        success: false,
        message: "Description length must be in the range of 5-100 characters.",
      });
    }

    const note = await Note.create({
      title,
      description,
      owner: req.user.id,
    });

    return await res.status(201).send({
      success: true,
      message: "Note created successfully",
      note,
    });
  } catch (err) {
    return await res.status(400).send({ success: false, message: err.stack });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { id, title, description } = req.body;

    // Check : If all fields are given
    if (!id || !title || !description) {
      return await res.status(401).send({
        success: false,
        message: "Please fill in all the details.",
      });
    }
    // Check : If length of any field == 0
    if (validator.isEmpty(title) || validator.isEmpty(description)) {
      return await res
        .status(400)
        .send({ success: false, message: "Please fill in all the details." });
    }

    // Check : If length of title is in range of 5-30 characters
    if (!validator.isLength(title, { max: 30, min: 5 })) {
      return await res.status(400).send({
        success: false,
        message: "Title length must be in the range of 5-30 characters.",
      });
    }
    // Check : If description of title is in range of 5-100 characters
    if (!validator.isLength(description, { max: 100, min: 5 })) {
      return await res.status(400).send({
        success: false,
        message: "Description length must be in the range of 5-100 characters.",
      });
    }

    const note = await Note.findOne({ _id: id });
    if (!note) {
      return await res.status(401).send({
        success: false,
        message: "Note doesn't exists.",
      });
    }

    // Check  : Does the user who created this request actually owns this note ?
    if (note.owner != req.user.id) {
      return await res.status(401).send({
        success: false,
        message: "You do not own this note.",
      });
    }
    note.title = title;
    note.description = description;
    note.updatedAt = Date.now;
    await note.save();
    return await res.status(401).send({
      success: true,
      message: "Note updated successfully.",
    });
  } catch (err) {
    return await res.status(400).send({ success: false, message: err.stack });
  }
};

exports.getNote = async (req, res) => {
  try {
    const id = await req.params.id;
    console.log(id);
    // Check : Are we provided with an id ?
    if (!id) {
      return await res.status(400).send({
        success: false,
        message: "Please specify the note id",
      });
    }

    const note = await Note.findOne({ _id: id });
    // Check : Does the requested note exists ?
    if (!note) {
      return await res.status(400).send({
        success: false,
        message: "This note does not exists.",
      });
    }

    // Check  : Does the user who created this request actually owns this note
    if (note.owner != req.user.id) {
      return await res.status(401).send({
        success: false,
        message: "You do not own this note.",
      });
    }

    return await res.status(200).send({
      success: true,
      note,
    });
  } catch (err) {
    return await res.status(400).send({ success: false, message: err.stack });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const id = await req.params.id;

    // Check  : Are we provided with an id ?
    if (!id) {
      return await res.status(400).send({
        success: false,
        message: "Please enter an id",
      });
    }

    const note = await Note.findOne({ _id: id });
    // Is there a note with the provided id
    if (!note) {
      return await res.status(400).send({
        success: false,
        message: "A note with this id does not exists.",
      });
    }

    // Check  : Does the user who created this request actually owns this note
    if (note.owner != req.user.id) {
      return await res.status(400).send({
        success: false,
        message: "You do not own this note.",
      });
    }

    await Note.deleteOne({ _id: id });
    return await res.status(200).send({
      success: true,
      message: "Note deleted successfully.",
    });
  } catch (err) {
    return await res.status(400).send({ success: false, message: err.stack });
  }
};

exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      owner: req.user.id,
    });

    return await res.status(200).send({
      success: true,
      notes,
    });
  } catch (err) {
    return await res.status(400).send({ success: false, message: err.stack });
  }
};
