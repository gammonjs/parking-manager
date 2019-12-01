import express from 'express';
import routes from './routes/index';
import http from 'http';
import SocketIO from 'socket.io';
import LocationSocket from './sockets/locationsSocket';

const PORT = process.env.PORT || 3001;
const app = express();

app.listen(PORT, console.log(`Server started on port: ${PORT}`));
app.use(express.json({ limit: '1mb' }));

var server = http.Server(app);
var io = SocketIO(server);
server.listen(80);

const locationSocket = new LocationSocket(io);
locationSocket.start();

app.use('/api', routes);



export default app;
