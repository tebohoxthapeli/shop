import { model, models, Schema } from "mongoose";

const bagSchema = new Schema(
    {
        user: String,
        products: [
            {
                _id: String,
                productName: String,
                brand: String,
                size: String,
                colour: String,
                price: Number,
                image: String,
                quantity: {
                    type: Number,
                    default: 1,
                },
            },
        ],
    },

    {
        timestamps: true,
    }
);

export default models.Bag || model("Bag", bagSchema);
