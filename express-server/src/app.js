const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

app.listen(PORT, console.log(`Server started on port: ${PORT}`));
app.use(express.json({ limit: '1mb' }));

var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(80);

app.use('/api', (req, res, next) => {
    console.log('client called index');
    res.send('INDEX');
});

io.on('connect', () => {
    console.log('client connected');
});

io.on('connect', () => {
    console.log('client disconnected');
});

module.exports = app;