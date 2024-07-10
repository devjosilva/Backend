const express = require('express')
const app = express()
const port = 8090

const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})



