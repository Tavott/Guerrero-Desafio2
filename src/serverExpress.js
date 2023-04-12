const express = require('express');
const ProductManager = require ("./app");
const app = express();
const productManager = new ProductManager(); // creamos una instancia de la clase ProductManager


const PORT=8080;


//Rutna principal
app.get('/',(req, res) => {
    res.send('Hola Express Server')
});


//Ruta a todos los productos y filtro de limit
app.get('/products', (req, res) => {
  const limit = req.query.limit;

  if (limit) {
    const products = productManager.getProducts().slice(0, limit);
    res.json(products);
  } else {
    const products = productManager.getProducts();
    res.json(products);
  }
});

//ruta productos ID

app.get('/products/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid);
    const product = await productManager.getProductById(productId);
    // console.log(product);
    if (product) {
      
      console.log("devuelve Producto")
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  });


const server = app.listen(PORT, () => {
    console.log(`>>>> Server started at http://localhost:${PORT}`)
})

server.on('error', (error) => console.log(error));

