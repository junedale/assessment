const express = require('express');
const cors = require('cors');
const app = express();

const processRouter = require('./routes/process');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));


app.use('/api/process', processRouter);

app.listen(3001, () => {
    console.log('Server is running on port 3001');
})