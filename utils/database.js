import { connections, disconnect, connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let connectionReadyState = 0;

async function dbConnect() {
    if (connectionReadyState !== 0) return;

    if (connections.length > 0) {
        connectionReadyState = connections[0].readyState;
        if (connectionReadyState === 1) return;
        await disconnect();
    }

    const db = await connect(process.env.MONGODB_CONNECTION_STRING);
    connectionReadyState = db.connections[0].readyState;

    if (connectionReadyState === 1) {
        console.log("Database connected succesfully.");
    }
}

async function dbDisconnect() {
    if (connectionReadyState !== 0) {
        if (process.env.NODE_ENV === "production") {
            await disconnect();
            connectionReadyState = 0;
        } else {
            console.log("Not disconnected");
        }
    }
}

function convertDocToObj(doc) {
    doc._id = doc._id.toString();
    return doc;
}

export { dbConnect, dbDisconnect, convertDocToObj };
