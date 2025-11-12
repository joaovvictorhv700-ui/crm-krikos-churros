const express = require('express');
const cors = require('cors');
const fs = require('fs');
const db = require('./db');
const initSql = fs.readFileSync(__dirname + '/migrations/init.sql', 'utf8');

const app = express();
app.use(cors());
app.use(express.json());

db.exec(initSql, (err) => {
  if (err) console.error('Erro init DB', err);
});

const productsRouter = require('./routes/products');
const customersRouter = require('./routes/customers');
const ordersRouter = require('./routes/orders');

app.use('/api/products', productsRouter);
app.use('/api/customers', customersRouter);
app.use('/api/orders', ordersRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend rodando na porta ${PORT}`));