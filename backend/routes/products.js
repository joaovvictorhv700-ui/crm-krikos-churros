const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.all('SELECT * FROM products', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.post('/', (req, res) => {
  const { category, name, size, price } = req.body;
  if (!category || !name || price == null)
    return res.status(400).json({ error: 'Dados incompletos' });
  db.run(
    'INSERT INTO products (category,name,size,price) VALUES (?,?,?,?)',
    [category, name, size || null, price],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

router.put('/:id', (req, res) => {
  const { price } = req.body;
  db.run('UPDATE products SET price = ? WHERE id = ?', [price, req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ changes: this.changes });
  });
});

module.exports = router;