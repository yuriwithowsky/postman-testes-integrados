import express from 'express'
import { add, deleteAll, getById, getAll, update } from './repository.js'
import { body, validationResult } from 'express-validator'
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.json())

app.get("/products", async (req, res) => {
    const products = await getAll();
    res.send(products)
})

app.get("/products/:id", async (req, res) => {
    const productId = req.params.id;
    const product = await getById(productId);
    
    if(product)
        return res.send(product)

    return res.sendStatus(404)
})

app.post("/products", body("name").notEmpty(), body("price").isInt({ min: 1 }), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const product = req.body;
    await add(product)
    res.status(201).send(product)
})

app.put("/products/:id", async (req, res) => {
    const productId = req.params.id;
    const product = req.body;
    const newProduct = await update(productId, product);

    if(newProduct)
        res.send(newProduct)
    else
        res.sendStatus(404)
})

app.delete("/products", async (req, res) => {
    await deleteAll();
    res.send({})
})

app.listen(port, () => {
    
  console.log(`Example app listening at http://localhost:${port}`)
})