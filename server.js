const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

//APIS
const index = require('./backend/routes/index');
const todo = require('./backend/routes/todo');

const port = 3000;
const app = express();
const fallback = require('express-history-api-fallback');

//SOME CONFIG
app.set('views', path.join(__dirname, 'dist'));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//APIS
app.use('/', index);
app.use('/api', todo);
//FALLBACK
app.use(fallback(__dirname + '/dist/index.html'));

//RUN
app.listen(port, () => {
    console.log('SERVER RUNNING PORT ' + port);
});