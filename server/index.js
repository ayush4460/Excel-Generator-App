import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

import { ExcelModel } from './model/model.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server successfully connected at http://localhost:${PORT}`);
});

app.post('/api/create', async (req, res) => {
  try {
    const create = await ExcelModel.create(req.body);
    res.status(200).json({
      message: 'Create operation successfully performed',
      success: true,
      service: create
    });
  } catch (error) {
    console.error('Error in create API', error.message);
    res.status(500).json({
      message: 'Failed to create',
      success: false
    });
  }
});

mongoose
  .connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true })
  .then(() => {
    console.log('DB connected');
    app.get('/', (req, res) => {
      res.send('Hello World!');
    });
  })
  .catch((err) => {
    console.log('DB Error => ', err);
  });
