const express = require('express');
const fs = require('fs');
const app = express();

// app.get('/', (req, res) => {
//     res.status(200).json({ message: 'Hello from the server!', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//     res.send('You can now post to this endpoint.')
// });

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

app.get('/api/v1/tours', (res, req) => {
    res.status(200).json({
        status: 'success',
        data: {
            tours
        }
    });
})

const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});