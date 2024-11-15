const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/getUser', async (req, res) => {
    const { data } = await axios.get('https://randomuser.me/api/');
    res.json(data.results[0]);
});

app.post('/getSpecificUserDetails', async (req, res) => {
    const { fields } = req.body;
    const { data } = await axios.get('https://randomuser.me/api/');

    const user = data.results[0];
    const result = {};

    fields.forEach(field => result[field] = user[field])
    res.json(result);
})


app.listen(PORT, () => {
    console.log(`Server is running: http://localhost:${PORT}`)
})