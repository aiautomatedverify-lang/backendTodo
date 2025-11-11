const Task = require('../models/Task');
const Joi = require('joi');

// validation schema
const taskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(''),
  dueDate: Joi.date().optional(),
  priority: Joi.string().valid('Low','Medium','High').optional(),
  status: Joi.string().valid('Pending','In Progress','Completed').optional()
});

// Create task
exports.createTask = async (req, res) => {
  const { error, value } = taskSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const task = new Task(value);
  await task.save();
  res.status(201).json({ message: 'Task created', task });
};

// Get all tasks (supports query filters)
exports.getTasks = async (req, res) => {
  const { status, priority, q } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (priority) filter.priority = priority;
  if (q) filter.$or = [{ title: new RegExp(q,'i') }, { description: new RegExp(q,'i') }];

  const tasks = await Task.find(filter).sort({ createdAt: -1 });
  res.json(tasks);
};

// Get task by id
exports.getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
};

// Update task (PUT)
exports.updateTask = async (req, res) => {
  const { error, value } = taskSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const task = await Task.findByIdAndUpdate(req.params.id, value, { new: true });
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json({ message: 'Task updated', task });
};

// Partial update (PATCH) e.g., status only
exports.patchTask = async (req, res) => {
  const updates = req.body;
  const task = await Task.findByIdAndUpdate(req.params.id, updates, { new: true });
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json({ message: 'Task patched', task });
};

// Delete
exports.deleteTask = async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json({ message: 'Task deleted' });
};
