import express from 'express';
import http from 'http';
import LocationSocket from './sockets/locationsSocket';
import LocationRouter from './routes/locationRouter';
import SpaceRouter from './routes/spaceRouter';

const PORT = process.env.PORT || 3001;
const app = express();

app.listen(PORT, console.log(`Server started on port: ${PORT}`));
app.use(express.json({ limit: '1mb' }));

var server = http.Server(app);
server.listen(80);

var io = require('socket.io')(server);
app.set('locations-socket', io);
LocationSocket.start(io);

const locationRouter = new LocationRouter();
const spaceRouter = new SpaceRouter();

locationRouter.start();
spaceRouter.start();

app.use('/api/locations', [
    locationRouter.routes,
    spaceRouter.routes
]);

export default app;
