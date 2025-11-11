const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/taskController');

// CRUD
router.post('/', ctrl.createTask);          // Create
router.get('/', ctrl.getTasks);            // Read all (with query filters)
router.get('/:id', ctrl.getTaskById);      // Read one
router.put('/:id', ctrl.updateTask);       // Update (replace)
router.patch('/:id', ctrl.patchTask);      // Partial update (status etc.)
router.delete('/:id', ctrl.deleteTask);    // Delete

module.exports = router;
