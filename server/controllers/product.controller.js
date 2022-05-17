const Product = require("../models/Product.model");//import the model so tha thte controller knows how to talk to the databas to query the database

module.exports.sayHello = (req, res) => {
    res.json({ msg: "Hello ProductAPI test" });
}


//find all products
module.exports.findAllProducts = (req, res) => {
    console.log('-----finding all products-----')
    Product.find()
        .then(allProducts => {
            res.json({ results: allProducts });
        })
        .catch(err => {
            res.json({ msg: "Something went wrong", error: err })
        })
}


//create a product
module.exports.createProduct = (req, res) => {
    console.log("-----creating a product-----")
    //req.body represents form information
    Product.create(req.body)
        .then(newProduct => {
            res.json({ results: newProduct })
        })
        .catch(err => {
            res.json({ msg: "Something went wrong", error: err })
        })
}


//find one product
module.exports.findOneProduct = (req, res) => {
    console.log('-----finding one Product-----');
    console.log('req.params.id: ', req.params.id);
    Product.find({ _id: req.params.id })
        .then(oneProduct => {
            res.json({ results: oneProduct })
        })
        .catch(err => {
            res.json({ msg: "Something went wrong", error: err })
        })
}


//update a Product
module.exports.updateProduct = (req, res) => {
    console.log("-----updating a product-----")
    Product.findOneAndUpdate(
        { _id: req.params.id }, //specify which product to update
        req.body, //specify the form information to update the product with 
        { new: true, runValidators: true }  //make sure we have new content and validate it
    )
        .then(updatedProduct => {
            res.json({ results: updatedProduct });
        })
        .catch(err => {
            res.json({ msg: "Something went wrong", error: err })
        })
}

//delete product
module.exports.deleteProduct = (req, res) => {
    console.log('-----deleting one product-----');
    Product.deleteOne({ _id: req.params.id })
        .then(deletedProduct => {
            res.json({ results: deletedProduct });
        })
        .catch(err => {
            res.json({ msg: "Something went wrong", error: err })
        })
}
