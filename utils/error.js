import { dbDisconnect } from "./database";

export function getError(err) {
    if (err.response && err.response.data && err.response.data.error) {
        return err.response.data.error;
    } else {
        return err.message;
    }
}

export async function onError(err, res) {
    await dbDisconnect();
    return res.status(500).json({ message: err.toString() });
}
