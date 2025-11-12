const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.all('SELECT * FROM orders ORDER BY created_at DESC LIMIT 100', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.post('/', (req, res) => {
  const { customer_id, items, total } = req.body;
  const itemsStr = JSON.stringify(items || []);
  db.run('INSERT INTO orders (customer_id,items,total) VALUES (?,?,?)', [customer_id || null, itemsStr, total || 0], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});

module.exports = router;