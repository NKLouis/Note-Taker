const db = require("../db/db.json");
const fs = require("fs");
const uuid = require("uuid")


module.exports = function (app) {
    // displays all the notes
    app.get("/api/notes", function (req, res) {
        fs.readFile("./db/db.json", "utf8", (err, data) => {
            console.log(data);
            if (err) throw err;
            res.json(JSON.parse(data));
        });
    });
    // creates a new note
    app.post("/api/notes", function (req, res) {
        let noteId = uuid.v4()
        let newNote = {
            id: noteId,
            title: req.body.title,
            text: req.body.text
        };
        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) throw err

            const allNotes = JSON.parse(data);
            allNotes.push(newNote);

            fs.writeFile("./db/db.json", JSON.stringify(allNotes), err => {
                if (err) throw err
                res.json(db)
                console.log("success!!")
            })
        })
    });
    // deletes notes
    app.delete("/api/notes/:id", function (req, res) {
        let noteId = req.params.id
        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) throw err
            const allNotes = JSON.parse(data);
            const updateNote = allNotes.filter(note => note.id != noteId)
            console.log(updateNote);

            fs.writeFile("./db/db.json", JSON.stringify(updateNote), err => {
                if (err) throw err
                res.json(updateNote)
                console.log("Deleted!!")
            });
        });
    });
};   