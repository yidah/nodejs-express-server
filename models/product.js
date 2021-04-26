const products =[];
module.exports = class Product {
    constructor(t){
        this.title = t;
    }

    save(){
        products.push(this);
    }

    //It is not call on a single instance of a product because it should fetch all products
    //so static makes sure that we can call this method directly on the class itself and not on an instance
    static fetchAll(){
        return products;
    }

}