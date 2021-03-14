/*Express Avanzado 2*/

const { Producto } = require("./producto");
const express = require('express');
const app = express();
const router = express.Router();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api',router);

let listaProductos = [];

//Listar todos los productos
router.get('/productos/listar', (req, res) => {
    //Hay productos?
    if(listaProductos.length > 0){
        res.json({
            productos: listaProductos
        });
    }else{
        res.json({
            error:'no hay productos cargados'
        });
    }
});

//Listar un unico producto por ID
router.get('/productos/listar/:id', (req, res) => {
    if(req.params.id < 0 || req.params.id > listaProductos.length - 1){
        res.json({
            error: 'producto no encontrado'
        });
    }else{
        res.json({
            producto: listaProductos[req.params.id]
        })
    }
});

router.post('/productos/guardarProducto', (req,res) => {
    res.sendFile(__dirname + "/public/index.html");
});

//Almacenar un nuevo producto. Retornar el producto creado
router.post('/productos/guardar', (req, res) => {        
    let producto = new Producto(req.body.title, req.body.price, req.body.thumbnail);
    producto.id = listaProductos.length;
    listaProductos.push(producto);
    res.json(producto);    
});

//Actualizar producto
router.put('/productos/actualizar/:id', (req,res) => {
    let producto = req.body;
    producto.id = listaProductos[req.params.id].id;
    listaProductos[req.params.id] = producto;
    res.json(producto);
});

//Borrar producto
router.delete('/productos/borrar/:id', (req, res) => {
    let productosRemovidos = listaProductos.splice(req.params.id,1);
    res.json(productosRemovidos[0]);
});

//Iniciar servidor
app.listen(port, () => {
    console.log("Servidor iniciado en el puerto " + port);
});