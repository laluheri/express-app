const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
mongoose.connect('mongodb://user_latihan:123456@localhost:27017/latihan?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    stock: Number,
    status: { type: Boolean, default: true }
})

//membuet model
const Product = mongoose.model('Product', productSchema)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', async () => {
    const products = await Product.findOne({
        _id:'60fab31feca9d2d119d74964'
    })
    console.log(products);
    console.log("Server database connect!");
})

