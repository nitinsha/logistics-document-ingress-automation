const express = require('express');
const cors = require('cors');
const healthRouter = require('./routes/health');
const ordersRouter = require('./routes/orders');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/health', healthRouter);
app.use('/orders', ordersRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
  });
});

module.exports = app;
