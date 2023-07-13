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

app.post('/api/list', async (req, res) => {
  try {
    let {
      skip,
      per_page,
      sorton,
      sortdir,
      match,
    } = req.body;

    let query = [
      {
        $facet: {
          stage1: [
            {
              $group: {
                _id: null,
                count: {
                  $sum: 1
                }
              }
            }
          ],
          stage2: [
            {
              $skip: skip
            },
            {
              $limit: per_page
            }
          ]
        }
      },
      {
        $unwind: {
          path: '$stage1'
        }
      },
      {
        $project: {
          count: '$stage1.count',
          data: '$stage2'
        }
      }
    ];

    if (match) {
      query = [
        {
          $match: {
            $or: [
              {
                'Name': { $regex: match, "$options": "i" },
                'Email': { $regex: match, "$options": "i" },
                'Phone': { $regex: match, "$options": "i" },
                'Gender': { $regex: match, "$options": "i" },
                'Message': { $regex: match, "$options": "i" },
              }
            ]
          }
        }
      ].concat(query);
    }

    if (sorton && sortdir) {
      let sort = {};
      sort[sorton] = sortdir == 'desc' ? -1 : 1;
      query = [
        {
          $sort: sort
        }
      ].concat(query);
    } else {
      let sort = {};
      sort['createdAt'] = -1;
      query = [
        {
          $sort: sort
        }
      ].concat(query);
    }

    const list = await ExcelModel.aggregate(query);
    res.json(list);
  } catch (error) {
    console.error('Error in list API', error.message);
    res.status(500).json({
      message: 'Failed to fetch list',
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
