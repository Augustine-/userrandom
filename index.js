const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/getUser', async (req, res) => {
    try {
        const response = await axios.get('https://randomuser.me/api/');
        res.json(response.data.results[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user details' });
    }
});

app.post('/getSpecificUserDetails', async (req, res) => {
    const fields = req.body.fields;
    if (!Array.isArray(fields)) {
        return res.status(400).json({ error: "'Fields' should be an array." })
    }

    try {
        const response = await axios.get('https://randomuser.me/api/');
        const rawUser = response.data.results[0];

        const filteredUser = fields.reduce((result, field) => {
            if (rawUser[field] !== undefined) {
                result[field] = rawUser[field]
            }

            return result;
        }, {});

        res.json(filteredUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user details.' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running: http://localhost:${PORT}`)
})