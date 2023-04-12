const fs = require("fs");
// const express = require("express");

class ProductManager {
  constructor () {
      this.products = [];
    this.lastId = 0;
    this.path = "./db/listProduct.json";
  }

 
  //Metodo que agrega un producto 
  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Error: Todos los campos son Requeridos");
      return;
    }

    const existingProduct = this.products.find(product => product.code === code);
    if (existingProduct) {
      console.log(`Error: Producto con el codigo ${code} ya existe`);
      return;
    }

    const id = ++this.lastId;

    const product = { id, title, description, price, thumbnail, code, stock };
    this.products.push(product);
    console.log(`Se agrego producto con el ID: ${id}`);

    fs.writeFile(this.path, JSON.stringify(this.products), (err) => {
      if (err) throw err;
      console.log("Archivo guardado con Exito");
    })
  }

//Metodo que muestra todos los productos.
  getProducts() {
    try {
      const data = fs.readFileSync(this.path);
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }
  //Metodo que muestra el producto en base el ID. 
  getProductById = async (productId) => {
    const data = await fs.promises.readFile(this.path, "utf-8");
    const productsById = JSON.parse(data);
    const product = productsById.find((product) => product.id === productId);
    if (product) {
      console.log(product)
      return product;
    } else {
      console.log("Error: producto no encontrado");
    }
  };

  //Metodo que actualiza el objeto, sin eliminar el ID.  
  updateProduct = async (productId, field, updateData) => {
    const data = await fs.promises.readFile(this.path, "utf-8");
    const products = JSON.parse(data);

    const index = products.findIndex((product) => product.id === productId);
    if (index === -1) {
      console.log("Error: producto no encontrado");
      return;
    }

    products[index][field] = updateData;

    fs.writeFile(this.path, JSON.stringify(products), (err) => {
      if (err) throw err;
      console.log("Producto actualizado con éxito desde updateProduct");
    });
  };

  //Recibe un ID y debe eliminar el producto
  deleteProduct = async (deleteById) => {
    const data = await fs.promises.readFile(this.path, "utf-8");
    const products = JSON.parse(data);

    const deleteItemFilter = products.filter(
      (product) => product.id !== deleteById
    );

    if (deleteItemFilter.length === products.length) {
      console.log(`Error: No se encontró producto con ID ${deleteById}`);
      return;
    }

    fs.writeFile(this.path, JSON.stringify(deleteItemFilter), (err) => {
      if (err) throw err;
      console.log("Producto borrado con éxito desde deleteProduct");
    });
  };

  async getData() {
    const data = await fs.promises.readFile(this.path, "utf-8");
    return data;
  }

  async getAll() {
    const data = await this.getData();
    return JSON.parse(data);
  }
}
module.exports = ProductManager;

//funciones ejecutadas con Console.log

// const producto = new ProductManager();

//Array vacio
// console.log(producto.getProducts());


// Agrega el producto a la instancia
// producto.addProduct('productodeprueba', 'estoesUnaPrueba', 200, 'SinImagen', 'dasd123', 23)
// producto.addProduct('productodeprueba1', 'estoesUnaPrueba1', 350, 'SinImagen', 'cod:123', 24)

//Muestra por consola el producto cargado
// console.log(producto.getProducts());

//Se agrega nuevamente un producto con el mismo codigo.
// producto.addProduct('productodeprueba','estoesUnaPrueba',200,'SinImagen','dasd123',25)

//Busqueda por ID, en caso de que no exista, informa que el valor no esta.
// console.log(producto.getProductById(2));

//Actualiza objeto por ID
// producto.updateProduct(1, 'description', 'Agrego actualizacion');

//Eliminar producto en base el ID.
// producto.deleteProduct(2);
// console.log(producto.getProducts());
