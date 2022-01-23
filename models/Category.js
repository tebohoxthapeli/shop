import { model, models, Schema } from "mongoose";

const categorySchema = new Schema({
    name: String,
    subcategories: [String],
});

export default models.Category || model("Category", categorySchema);
