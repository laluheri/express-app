const express = require('express')
const { ObjectId } = require('mongodb')
const multer = require('multer')
const routers = express.Router()
const client = require('./connection')

routers.get('/products', async (req, res) => {
    if (client.connect()) {
        const db = client.db('latihan')
        const products = await db.collection('products').find().toArray()

        if (products.length > 0) {
            res.send({
                status: 'success',
                message: 'list products',
                data: products
            })
        } else {
            res.send({
                status: 'success',
                message: 'list products tidak ditemukan',
            })
        }
    }
})

//single product
routers.get('/product/:id', async (req, res) => {
    const db = client.db('latihan')
    //kode untuk menampilkan single produk
    const product = await db.collection('products').findOne({ _id: ObjectId(req.params.id) })

    res.send({
        status: 'success', lllkkkkk,


        status: 'success',
        message: 'single products',
        data: product
    })
})

//Edit data product


//Add data product


routers.post('/product', multer().none(), async (req, res) => {

    if (client.connect) {
        const { name, price, stock, status } = req.body
        const db = client.db('latihan')
        const result = await db.collection('products').insertOne({
            name: name,
            price: price,
            stock: stock,
            status: status
        })

        if (result.acknowledged) {
            res.send({
                status: 'success',
                message: 'tambah product success',
                data: result
            })
        } else {
            res.send({
                status: 'warning',
                message: 'tambah product gagal',
            })
        }
    } else {
        res.send({
            status: 'error',
            message: 'Koneksi database gagal',
        })
    }

})

//delete product
routers.delete('/product/:id', async (req, res) => {
    const db = client.db('latihan')
    const result = await db.collection('products').deleteOne(
        {_id: ObjectId(req.params.id)}
    )
    res.send({
        status:'success',
        message:'delete product success'
    })
})

module.exports = routers