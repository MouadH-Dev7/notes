const mongoose = require('mongoose');

// تعريف المخطط مع استخدام خاصية timestamps
const noteSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdDate: { type: Date, required: true },
    updatedDate: { type: Date, required: true }
});

module.exports = mongoose.model('Note', noteSchema);
