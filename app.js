const express = require('express');
const taskRoutes = require('./routes/tasks');
const app = express();
const port = 3000;

app.use(express.json());
app.use('/tasks', taskRoutes);
app.use(express.urlencoded({ extended: true }));

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});


module.exports = app;