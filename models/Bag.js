import { model, models, Schema } from "mongoose";

const bagSchema = new Schema(
    {
        user: String,
        ordered: {
            type: Boolean,
            default: false,
        },
        products: [
            {
                _id: String, //*
                productName: String,
                brand: String,
                size: String, //*
                colour: String, //*
                image: String,
                price: Number, //*
                total: Number,
                quantity: { //*
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
