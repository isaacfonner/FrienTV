const express = require('express');
const path = require('path');
const { router: api } = require('./src/api.js')

const app = express();
const port = 3000;

const html = path.join(__dirname, 'public_html');

app.use(express.static(html));


app.use('/api', api);

app.use((req, res) => {
    res.status(404).sendFile(path.join(html, '/pages/404.html'));
});

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
