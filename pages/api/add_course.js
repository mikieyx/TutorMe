import pool from '../../db';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { tutor_id, course_name } = req.body;

    try {
      const client = await pool.connect();
      console.log("line 9");
      const result = await client.query(
        'INSERT INTO Teaches (tutor_id, course_name) VALUES (CURRENT ID, $1) RETURNING *',
        [tutor_id, course_name]
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
