const mongoose = require('mongoose');
const Note = require('./schemas/note');

class Database {
    constructor() {
        this.url = process.env.MONGO_DB || "mongodb+srv://mouadhdev:mouadh123@cluster0.edpmfza.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // تأكد من تشغيل MongoDB على هذا الرابط
    }

    connect() {
        mongoose
            .connect(this.url)
            .then(() => {
                console.log("Connected to db");
            })
            .catch((err) => {
                console.log("Error received when adding note:", err);
            });
    }

    addNote(note) {
        return new Promise((resolve, reject) => {
            note["createdDate"] = new Date();
            note["updatedDate"] = new Date();
            let newNote = new Note(note);
            newNote
                .save()
                .then((doc) => {
                    resolve(doc);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    getNotes() {
        return new Promise((resolve, reject) => {
            Note.find({})
                .then((data) => {
                    resolve(data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    getNoteById(noteId) {
        return new Promise((resolve, reject) => {
            Note.findById(noteId)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    updateNote(note) {
        return new Promise((resolve, reject) => {
            note["updatedDate"] = new Date();
            Note.findByIdAndUpdate(note["_id"], note)
                .then(data => {
                    resolve({ _id: data.id });
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    deleteNote(noteId) {
        return new Promise((resolve, reject) => {
            Note.findByIdAndDelete(noteId)
                .then((data) => {
                    console.log("deleted document:", data);
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    getNotesByTitle(noteTitle) {
        return new Promise((resolve, reject) => {
            // this is equivalent to /${noteTitle}/i, i is a modifier to make the search case-insensitive
            const query = { title: { $regex: new RegExp(noteTitle, 'i') } };
            Note.find(query)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

}

module.exports = Database;
