export const initialState = {
    user: null,
    bag: {},
};

export function reducer(state, { type, payload }) {
    switch (type) {
        case "BAG_UPDATE":
            return { ...state, bag: payload };

        case "USER_LOGIN":
            return { ...state, user: payload };

        default:
            return state;
    }
}
