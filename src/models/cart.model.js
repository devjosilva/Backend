import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const cartCollection = "Cart"
const productCollection = "Product"


// Cart Item Schema
const cartItemSchema = new mongoose.Schema({
    product: { type: String, ref: productCollection, required: true },
    quantity: { type: Number, required: true }
});

// Cart Schema
const cartSchema = new mongoose.Schema({
    products: { type: [cartItemSchema], required: true }
});

// Cart Model
const Cart = mongoose.model(cartCollection, cartSchema);

export default Cart;
