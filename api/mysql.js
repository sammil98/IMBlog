const connection = require('../db');

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const { title, content, image, author } = req.body;

      const query = 'INSERT INTO posts (title, content, image, author) VALUES (?, ?, ?, ?)';
      const values = [title, content, image, author];

      connection.query(query, values, (err, results) => {
        if (err) {
          console.error('Error inserting post:', err);
          res.status(500).json({ message: 'Failed to insert post', error: err });
          return;
        }
        res.status(201).json({ id: results.insertId, title, content, image, author });
      });
    } else if (req.method === 'GET') {
      const query = 'SELECT * FROM posts ORDER BY timestamp DESC';

      connection.query(query, (err, results) => {
        if (err) {
          console.error('Error fetching posts:', err);
          res.status(500).json({ message: 'Failed to fetch posts', error: err });
          return;
        }
        res.status(200).json(results);
      });
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Handler error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
}