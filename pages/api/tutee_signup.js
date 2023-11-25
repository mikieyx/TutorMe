import pool from '../../db';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { firstName, lastName, email, password } = req.body;

    try {
      const client = await pool.connect();
      console.log("line 9");
      const result = await client.query(
        'INSERT INTO Tutee (firstName, lastName, email, password) VALUES ($1, $2, $3) RETURNING *',
        [firstName, lastName, email, password]
      );
      console.log("line 14");
      client.release();
      console.log("line 16");
      res.status(200).json({ success: true, user: result.rows[0] });
    } catch (e) {
      console.log('Error executing query', e);
      res.status(500).json({ success: false, error: 'Internal Server Error', details: e });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
