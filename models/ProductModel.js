const products = []; // Base de données fictive pour l'instant

class Product {
    constructor(id, name, price, quantity) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
}

module.exports = { products, Product };
