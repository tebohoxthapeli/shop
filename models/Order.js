import { model, models, Schema } from "mongoose";

const orderSchema = new Schema(
    {
        cart: {
            type: Schema.Types.ObjectId,
            ref: "Cart",
        },
        subtotal: Number,
        address: {
            type: Object,
        },
        status: {
            type: String,
            default: "Pending",
        },
    },
    {
        timestamps: true,
    }
);

export default models.Order || model("Order", orderSchema);
