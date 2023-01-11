
const socket = io();

//socket.on('mensaje', (data) => { console.log(data) }) //Recibo mensaje del servidor
  
//socket.emit('mensaje1', 'Mensaje del cliente') //envio mensaje del cliente 


socket.on('productos_agregados', (data) => {
  const productos = data.map(prod => {
    return `ID Producto: ${prod.idProucto} --> Nombre: ${prod.nombreProducto}`
  }).join('<br>')
  document.querySelector('p').innerHTML = productos;
})