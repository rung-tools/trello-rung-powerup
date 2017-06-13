const express = require('express');
const cors = require('cors');
const { port } = requir('config');

const app = express();

app.use(cors({ origin: 'https://trello.com' }));

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Power-Up running on port ${port}...`);
});
