const express = require('express')

const { ObjectId } = require('mongodb')

const multer = require('multer')

const routers = express.Router()


require('./connection')
const Product = require('./Product')

routers.get('/products', async (req, res) => {

    const products = await Product.find()
    if (products.length > 0) {
        res.send({
            status: 'success',
            message: 'list products ditemukan',
            data: products
        })
    } else {
        res.send({
            status: 'success',
            message: 'list products tidak ditemukan',
        })
    }
})

//single product
routers.get('/product/:id', async (req, res) => {

    //kode untuk menampilkan single produk
    const product = await Product.findById(req.params.id)

    res.send({
        status: 'success',
        status: 'success',
        message: 'single products',
        data: product
    })
})

//Add data product
routers.post('/product', multer().none(), async (req, res) => {

    const { name, price, stock, status } = req.body
    try {
        const product = await Product.create({
            name: name,
            price: price,
            stock: stock,
            status: status
        })
        if (product) {
            res.send({
                status: 'success',
                message: 'tambah product success',
                data: product
            })
        } else {
            res.send({
                status: 'warning',
                message: 'tambah product gagal',
            })
        }
    } catch (error) {
        res.send({
            status: 'error',
            message: error.message,
        })

    }


})

//update product
routers.put('/product/:id', multer().none(), async (req, res) => {
    const { name, price, stock, status } = req.body
    const result = await Product.updateOne(
        { _id: ObjectId(req.params.id) },
        {
            $set: {
                name: name,
                price: price,
                stock: stock,
                status: status
            }
        },
        { runValidators: true }
    )
    if (result.ok == 1) {
        res.send({
            status: 'success',
            message: 'update product success'
        })
    } else {
        res.send({
            status: 'warning',
            message: 'update product gagal'
        })
    }
})

//delete product
routers.delete('/product/:id', async (req, res) => {

    const result = await Product.deleteOne(
        { _id: ObjectId(req.params.id) }
    )

    if (result.deletedCount == 1) {
        res.send({
            status: 'success',
            message: 'delete product success'
        })
    }

})

module.exports = routers