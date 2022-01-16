import { model, models, Schema } from "mongoose";

const orderSchema = new Schema(
    {
        subtotal: Number,
        status: {
            type: String,
            default: "Pending",
        },
        address: {
            type: Object,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        bag: {
            type: Schema.Types.ObjectId,
            ref: "Bag",
        },
    },
    {
        timestamps: true,
    }
);

export default models.Order || model("Order", orderSchema);
