const noteModel = require("../models/note");



const createNote = async (req, res) => {

    //console.log(req.userid);

    const { title, description } = req.body;

    const newNote = new noteModel({
        userid: req.userid,
        title: title,
        description: description
    });

    try {
        await newNote.save();
        res.status(201).json(newNote);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" });
    }

}


const updateNote = async (req, res) => {

    const id = req.params.id;
    if (!id)
        res.status(404).json({ message: "ID Not Found" });

    const { title, description } = req.body;

    const newNote = {
        title: title,
        description: description,
        userid: req.userid
    }

    try {
        await noteModel.findByIdAndUpdate(id, newNote, { new: true });
        res.status(200).json(newNote);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" });
    }

}

const deleteNote = async (req, res) => {

    const id = req.params.id;
    if (!id)
        res.status(404).json({ message: "ID Not Found" });

    try {
        const note = await noteModel.findByIdAndRemove(id);
        res.status(202).json(note);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
}

const getNote = async (req, res) => {

    try {
        const notes = await noteModel.find({ userid: req.userid });
        res.status(200).json(notes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
}



module.exports = { createNote, updateNote, deleteNote, getNote };