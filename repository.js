import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));

const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)


const init = async () => {
    db.data ||= { products: [] }

    await db.write()
}

await init();

const addProduct = async (product) => {
    db.data.products.push(product)
    await db.write()
}

const update = async (productId, product) => {
    const oldProduct = await getById(productId);
    Object.assign(oldProduct, product)
    await db.write()
}

const getProducts = async () => {
    await db.read()
    const { products } = db.data;
    return products
}
const getById = async (productId) => {
    await db.read()
    const product = db.data.products.find(p => p.id === productId);
    return product
}

const deleteAll = async () => {
    db.data.products = [];
    await db.write()
}

export { addProduct, getProducts, getById, deleteAll, update }
