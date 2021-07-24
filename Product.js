const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'field nama harus diisi'],
        minlength: 3,
        maxlength: 50,
    },
    price: {
        type: Number,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    stock: Number,
    status: { type: Boolean, default: true }
},{
    versionKey:false
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product