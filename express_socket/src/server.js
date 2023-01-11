import express from 'express';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.routes.js'
import { Server } from 'socket.io';
import __dirname from './dirname.js';

const app = express();
const httpServer = app.listen(3000, () => console.log(`Server corriendo en puerto ${3000}`))

const io = new Server(httpServer);

// Configuracion handlebars
app.engine('hbs', handlebars.engine({
  extname: 'hbs',
  defaultLayout: 'main'
}))

app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`))

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Routers
app.use('/', viewsRouter);

const productos = [];

io.on("connection", (socket) => {
  console.log('NUEVA CONEXION');

  /*
  socket.emit('mensaje', 'Mensaje del servidor') //envio al cliente mensaje del servidor

  socket.on('mensaje1', (data) => { console.log(data) }) //recibo mensaje del cliente
  */
  socket.emit('productos_agregados', productos)

  socket.on('nuevo_producto', (data) => {
    const producto = {
      idProucto: data.idProucto,
      nombreProducto: data.nombreProducto
    }
    productos.push(producto);
    io.emit('productos_agregados', productos)
  })




})

/*
const mensajes = [];


io.on("connection", (socket) => {
  console.log('Se ha conectado un nuevo cliente');

  socket.emit('mensajes_chat', mensajes)

  socket.on('input', (data) => {
    io.emit('mensaje', data);
  })

  socket.on('mensaje_chat', (data) => {
    const mensaje = {
      socketid: data.nombre,
      mensaje: data.mensaje
    }
    mensajes.push(mensaje);
    io.emit('mensajes_chat', mensajes)
  })

  socket.on('eliminar_producto', (data) => {

  })
})
*/