const express = require('express');
const bodyParser = require('body-parser');
const { passport, generateToken } = require('./auth');
const { enqueueRequest } = require('./queue');
const { startWorker } = require('./worker');
const pool = require('./db');

const app = express();
app.use(bodyParser.json());
app.use(passport.initialize());

// Routes
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const query = {
            text: 'SELECT * FROM users WHERE username = $1 AND password = $2',
            values: [username, password]
        };
        const result = await pool.query(query);
        if (result.rows.length > 0) {
            const user = { id: result.rows[0].id, username: result.rows[0].username };
            const token = generateToken(user);
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Authentication failed' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/enqueue', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { requestData } = req.body;
    const clientId = req.user.id; // Assuming client id is user id
    await enqueueRequest(clientId, requestData);
    res.json({ message: 'Request enqueued successfully' });
});

// Start worker for each client
const clients = ['client1', 'client2']; // Example client IDs
clients.forEach(clientId => startWorker(clientId));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
