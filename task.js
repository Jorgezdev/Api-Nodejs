import express from 'express';
import { config } from './config.js';
import Database from './database.js';

const router = express.Router();
router.use(express.json());

console.log(config);
const database = new Database(config);

router.get('/', async (_, res) => {
  try {
    const tasks = await database.readAll();
    console.log(`tasks: ${JSON.stringify(tasks)}`);
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const task = req.body;
    console.log(`task: ${JSON.stringify(task)}`);
    const rowsAffected = await database.create(task);
    res.status(201).json({ rowsAffected });
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    console.log(`taskId: ${taskId}`);
    const task = req.body;

    if (taskId && task) {
      delete task.id;
      console.log(`task: ${JSON.stringify(task)}`);
      const rowsAffected = await database.update(taskId, task);
      res.status(200).json({ rowsAffected });
    } else {
      res.status(404);
    }
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    console.log(`taskId: ${taskId}`);

    if (!taskId) {
      res.status(404);
    } else {
      const rowsAffected = await database.delete(taskId);
      res.status(204).json({ rowsAffected });
    }
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

export default router;
