const express = require('express');
const app = express();
const PORT = 3000;
const data = require('./data.json'); // Assuming your data is in a file named data.json

app.use(express.static('public'));

app.get('/search', (req, res) => {
    const query = req.query.query.toLowerCase();
    const results = data.filter(item => 
        item.name.toLowerCase().includes(query)
    );
    res.json(results);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});