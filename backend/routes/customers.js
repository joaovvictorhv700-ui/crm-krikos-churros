const express = require('express');
const router = express.Router();
const db = require('../db');
const parse = require('csv-parse');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');

router.get('/', (req, res) => {
  db.all('SELECT * FROM customers', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.post('/', (req, res) => {
  const { name, phone, neighborhood } = req.body;
  db.run('INSERT INTO customers (name,phone,neighborhood) VALUES (?,?,?)', [name, phone, neighborhood], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});

router.post('/import', upload.single('file'), (req, res) => {
  const path = req.file.path;
  const content = fs.readFileSync(path);
  parse(content, { columns: true, trim: true }, (err, records) => {
    if (err) return res.status(400).json({ error: err.message });
    const stmt = db.prepare('INSERT INTO customers (name,phone,neighborhood) VALUES (?,?,?)');
    for (const r of records) stmt.run(r.name || '', r.phone || '', r.neighborhood || '');
    stmt.finalize();
    fs.unlinkSync(path);
    res.json({ imported: records.length });
  });
});

module.exports = router;