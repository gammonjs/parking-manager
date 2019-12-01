import express from 'express';
import routes from './routes/index';
import http from 'http';
import SocketIO from 'socket.io';

const PORT = process.env.PORT || 3001;
const app = express();

app.listen(PORT, console.log(`Server started on port: ${PORT}`));
app.use(express.json({ limit: '1mb' }));

var server = http.Server(app);
var io = SocketIO(server);
server.listen(80);

app.use('/api', routes);

io.on('connect', () => {
    console.log('client connected');
});

io.on('connect', () => {
    console.log('client disconnected');
});

export default app;
