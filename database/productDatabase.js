const fs = require("fs/promises");
const path = require("path");

const filepath = path.join(__dirname, "..", "db.json");

async function readData() {
    const products = await fs.readFile(filepath, "utf-8");
    return JSON.parse(products);
}

async function writeData(products) {
    await fs.writeFile(filepath, JSON.stringify(products, null, 2));
}

async function getAllProducts() {
    return await readData();
}

async function getProductById(id) {
    const products = await readData();
    return products.find(product => product.id === id);
}

async function createProduct(product) {
    const products = await readData();

    const newId = products.length === 0
        ? 1
        : Math.max(...products.map(product => product.id)) + 1;

    const newProduct = {
        ...product,
        id: newId
    };

    products.push(newProduct);

    await writeData(products);

    return newProduct;
}

async function updateProduct(id, product) {
    const products = await readData();

    const index = products.findIndex(product => product.id === id);

    if (index === -1) {
        return null;
    }

    products[index] = {
        ...product,
        id: id
    };

    await writeData(products);

    return products[index];
}

async function patchProduct(id, updates) {
    const products = await readData();

    const index = products.findIndex(product => product.id === id);

    if (index === -1) {
        return null;
    }

    products[index] = {
        ...products[index],
        ...updates,
        id: id
    };

    await writeData(products);

    return products[index];
}

async function deleteProduct(id) {
    const products = await readData();

    const index = products.findIndex(product => product.id === id);

    if (index === -1) {
        return null;
    }

    const deletedProduct = products[index];

    products.splice(index, 1);

    await writeData(products);

    return deletedProduct;
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
};