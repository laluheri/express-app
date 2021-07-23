const express = require('express')
const path = require('path')
const app = express()
const port = 3000

const routers = require('./routers')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(routers)


app.listen(port, () => console.log(`Server running at http://localhost:${port}`))
