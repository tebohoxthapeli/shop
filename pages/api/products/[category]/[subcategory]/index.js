import { getProducts } from "../../../../../utils/functions";

async function handler(req, res) {
    await getProducts(req, res);
}

export default handler;
