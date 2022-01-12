import { getProducts } from "../../../../utils/functions";

async function handler(req, res) {
    if (req.method !== "GET") return res.status(405).json({ error: "GET method expected." });
    await getProducts(req, res);
}

export default handler;
