import { verifyToken, verifyIsAdmin } from "../../../../../utils/auth";
import { deleteProducts } from "../../../../../utils/functions";

async function handler(req, res) {
    await deleteProducts(req, res);
}

export default verifyToken(verifyIsAdmin(handler));
