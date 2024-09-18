import jsonServer from 'json-server';
import express from 'express';
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use((req, res, next) => {
  setTimeout(next, 500);
});
server.use(router);

const app = express();
app.use(server);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
