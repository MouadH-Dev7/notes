const express = require('express');
const cors = require('cors');
const Database = require('./Database');
const bodyParser = require('body-parser');
const app = express();

const db = new Database();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

// مسار لإضافة ملاحظة جديدة
app.post('/notes', (req, res) => {
    db.addNote(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send(error);
        })
});

// مسار لجلب جميع الملاحظات
app.get('/notes', (req, res) => {
    const { title } = req.query;
    if (title) {
        db.getNotesByTitle(title)
            .then(data => {
                res.send(data);
            })
            .catch(error => {
                res.status(500).send(error);
            });

    } else {
        db.getNotes()
            .then(data => {
                res.send(data);
            })
            .catch(error => {
                res.status(500).send(error);
            })
    }
});

app.get('/notes/:id', (req, res) => {
    const { id } = req.params;
    db.getNoteById(id)
        .then(data => {
            if (!data) {
                res.status(404).send(`Note with id ${id} doesn't exist`);
            } else {
                res.send(data);
            }
        })
        .catch(error => {
            res.status(500).send(error);
        })
});

app.put('/notes', (req, res) => {
    db.updateNote(req.body)
        .then(data => {
            if (!data) {
                res.status(404).send(`Note doesn't exist`);
            } else {
                res.send(data);
            }
        })
        .catch(error => {
            res.status(500).send(error);
        });
});

app.delete('/notes/:id', (req, res) => {
    const { id } = req.params;
    db.deleteNote(id)
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send(error);
        })
});




// تشغيل الخادم والاستماع على المنفذ المحدد
app.listen(port, () => {
    console.log(`الخادم يعمل على المنفذ ${port}`);
    db.connect();
});
