import { model, models, Schema } from "mongoose";

const userSchema = new Schema(
    {
        name: String,
        email: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            select: false,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export default models.User || model("User", userSchema);
