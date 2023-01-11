const socket = io();

const input = document.querySelector('#idProucto');
const input2 = document.querySelector('#nombreProducto');

document.querySelector('#send').addEventListener('click', (event) => {
    event.preventDefault()
  
    socket.emit('nuevo_producto', {
        idProucto: input.value,
        nombreProducto: input2.value
    });
})

socket.on('productos_agregados', (data) => {
    const productos = data.map(prod => {
      return `ID Producto: ${prod.idProucto} --> Nombre: ${prod.nombreProducto}`
    }).join('<br>')
    document.querySelector('p').innerHTML = productos;
})