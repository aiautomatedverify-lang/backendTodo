const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  dueDate: { type: Date },
  priority: { type: String, enum: ['Low','Medium','High'], default: 'Medium' },
  status: { type: String, enum: ['Pending','In Progress','Completed'], default: 'Pending' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // optional for auth
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
