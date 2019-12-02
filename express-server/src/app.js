import express from 'express';
import LocationRouter from './routes/locationRouter';
import http from 'http';
import LocationSocket from './sockets/locationsSocket';

const PORT = process.env.PORT || 3001;
const app = express();

app.listen(PORT, console.log(`Server started on port: ${PORT}`));
app.use(express.json({ limit: '1mb' }));

var server = http.Server(app);
var io = require('socket.io')(server);
server.listen(80);

app.set('locations-socket', io);

LocationSocket.start(io);

const locationRouter = new LocationRouter();
locationRouter.start();

app.use('/api/locations', locationRouter.routes);



export default app;
