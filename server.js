import express from 'express'
import { addProduct, deleteAll, getById, getProducts, update } from './repository.js'
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.json())

app.get("/products", async (req, res) => {
    const products = await getProducts();
    res.send(products)
})

app.get("/products/:id", async (req, res) => {
    const productId = req.params.id;
    const product = await getById(productId);
    
    if(product)
        res.send(product)
    else
        res.sendStatus(404)
    
})

app.post("/products", async (req, res) => {
    const product = req.body;
    await addProduct(product)
    res.send(product)
})

app.put("/products/:id", async (req, res) => {
    const productId = req.params.id;
    const product = req.body;
     await update(productId, product);
    res.send({})
})

app.delete("/products", async (req, res) => {
    await deleteAll();
    res.send({})
})

app.listen(port, () => {
    
  console.log(`Example app listening at http://localhost:${port}`)
})