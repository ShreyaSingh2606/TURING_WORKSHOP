const productDatabase = require("../database/productDatabase");

function delay() {
    return new Promise(resolve => {
        setTimeout(resolve, 1500);
    });
}

async function getAllProducts() {
    await delay();
    return await productDatabase.getAllProducts();
}

async function getProductById(id) {
    await delay();
    return await productDatabase.getProductById(id);
}

async function createProduct(product) {
    return await productDatabase.createProduct(product);
}

async function updateProduct(id, product) {
    return await productDatabase.updateProduct(id, product);
}

async function patchProduct(id, updates) {
    return await productDatabase.patchProduct(id, updates);
}

async function deleteProduct(id) {
    return await productDatabase.deleteProduct(id);
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
};