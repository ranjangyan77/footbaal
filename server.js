// server.js
const express = require('express');
const cors = require('cors');
const db = require('./config');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Root Route
app.get('/', (req, res) => {
  res.send('🟢 YPL API is running!');
});

// Get All Matches
app.get('/api/matches', (req, res) => {
  db.query(`
    SELECT m.id, t1.name AS teamA, t2.name AS teamB, m.match_datetime, m.score_a, m.score_b
    FROM matches m
    JOIN teams t1 ON m.team_a_id = t1.id
    JOIN teams t2 ON m.team_b_id = t2.id
    ORDER BY m.match_datetime
  `, (err, results) => {
    if (err) {
      console.error('Error fetching matches:', err);
      return res.status(500).json({ error: 'Failed to fetch matches' });
    }
    res.json(results);
  });
});

// Get Players with Teams
app.get('/api/players', (req, res) => {
  db.query(`
    SELECT players.name, teams.name AS team 
    FROM players 
    JOIN teams ON players.team_id = teams.id
  `, (err, results) => {
    if (err) {
      console.error('Error fetching players:', err);
      return res.status(500).json({ error: 'Failed to fetch players' });
    }
    res.json(results);
  });
});

// Get Upcoming Match (next match by time)
app.get('/api/upcoming', (req, res) => {
  db.query(`
    SELECT m.*, t1.name AS teamA, t2.name AS teamB
    FROM matches m
    JOIN teams t1 ON m.team_a_id = t1.id
    JOIN teams t2 ON m.team_b_id = t2.id
    WHERE m.match_datetime > NOW()
    ORDER BY m.match_datetime ASC
    LIMIT 1
  `, (err, results) => {
    if (err) {
      console.error('Error fetching upcoming match:', err);
      return res.status(500).json({ error: 'Failed to fetch upcoming match' });
    }
    res.json(results[0] || {}); // Return empty object if no match
  });
});

app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
