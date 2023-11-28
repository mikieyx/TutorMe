import pool from '../../db';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { meeting_id, time, location, tutor_id, tutee_id } = req.body;

    try {
      const client = await pool.connect();
      console.log("line 9");
      const result = await client.query(
        'INSERT INTO Meeting (meeting_id, time, location, tutor_id, tutee_id) VALUES ($1, $2, $3, $4, null) RETURNING *',
        [meeting_id, time, location, tutor_id, tutee_id]
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
