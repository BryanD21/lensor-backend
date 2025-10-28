const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const cors = require('cors');

// Habilitar CORS para todos los orígenes
server.use(cors({
  origin: true,
  credentials: true
}));

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Middleware personalizado para logs
server.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Ruta de salud
server.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

server.use(router);

const PORT = process.env.PORT || 3000;

server.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ LENSOR JSON Server ejecutándose en puerto ${PORT}`);
  console.log(`📊 Endpoints disponibles:`);
  console.log(`   GET/POST http://localhost:${PORT}/entregas`);
  console.log(`   GET/PUT/DELETE http://localhost:${PORT}/entregas/:id`);
  console.log(`   GET/PUT http://localhost:${PORT}/preferencias`);
  console.log(`   HEALTH http://localhost:${PORT}/health`);
});