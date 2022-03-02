import Cookies from "js-cookie";

export const initialState = {
    user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
    bag: Cookies.get("bag") ? JSON.parse(Cookies.get("bag")) : null,
};

export function reducer(state, { type, payload }) {
    switch (type) {
        case "BAG_UPDATE":
            return { ...state, bag: payload };

        case "USER_LOGIN":
            return { ...state, user: payload };

        case "USER_LOGOUT":
            return { ...state, user: null, bag: null };

        default:
            return state;
    }
}
