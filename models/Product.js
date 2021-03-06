import { model, models, Schema } from "mongoose";

const productSchema = new Schema(
    {
        productName: String,
        brand: String,
        price: Number,
        image: String,
        category: String,
        subcategory: String,
        sizes: [String],
        colours: [String],
        likes: [String],
        likeCount: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

export default models.Product || model("Product", productSchema);
