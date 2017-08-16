const express = require('express');

const app = express();

app.use('/', express.static('public'));
app.listen(8002, () => {
    console.log(`Development server running on http://localhost:8002`);
});
