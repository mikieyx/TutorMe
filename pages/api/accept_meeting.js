import pool from '../../db';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { firstName, lastName, email, password } = req.body;

    try {
      const client = await pool.connect();
      console.log("line 9");
      const result = await client.query(
        // Update meeting with tutee and add meeting to both tutor and tutee meeting list.
        // The dashboards will display has_meeting where the ids match the current logged in user.
        // Could search for the id with email and then search meetings with the id.
        'UPDATE Meeting SET tutee_id = CURRENT ID WHERE meeting_id = MEETING ID; INSERT INTO has_meeting (meeting_id, tutor_id, tutee_id) VALUES (?, ?, ?) RETURNING *',
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
