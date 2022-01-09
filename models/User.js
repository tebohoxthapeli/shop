import { model, models, Schema } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
        },
        password: {
            type: String,
            select: false,
        },
        email: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
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
