const express = require('express');

const app = express();

app.use('/', express.static('public'));
app.listen(8001, () => {
    console.log(`Development server running on http://localhost:8001`);
});
