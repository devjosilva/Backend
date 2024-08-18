import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';


const productCollection = "Product";

const productSchema = new mongoose.Schema({
    /*id: { type: String, required: true, unique: true, max: 100 },*/
    title: { type: String, required: true, max: 200 },
    description: { type: String, required: true, max: 255 },
    code: { type: String, required: true, unique: true, max: 100 },
    price: { type: Number, required: true },
    status: { type: Boolean, default: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true, max: 100 },
    thumbnails: { type: [String], required: false }
});

productSchema.plugin(mongoosePaginate);

const Product = mongoose.model(productCollection, productSchema);

export default Product;
