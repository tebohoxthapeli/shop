import axios from "axios";

const BASE_URL = "http://localhost:3000/api/";
const TOKEN = "something here";

export const privateRequest = axios.create({
    baseURL: BASE_URL,
    header: { token: `Bearer ${TOKEN}` },
});
