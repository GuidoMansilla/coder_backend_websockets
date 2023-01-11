import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
  res.render('home', {  
    title: 'Proyecto con Websocket'
  })
});

router.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', {
    title: 'Crear Productos'
  })
});


export default router;