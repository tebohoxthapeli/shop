import Cookies from "js-cookie";

function getLikedProductsOrCreateNew() {
    const inCookies = Cookies.get("likedProducts");
    if (!inCookies) return new Set();
    return new Set(JSON.parse(inCookies));
}

function convertToArrayAndSetCookie(set) {
    const setToArray = Array.from(set);
    Cookies.set("likedProducts", JSON.stringify(setToArray));
}

export const initialState = {
    user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
    bag: Cookies.get("bag") ? JSON.parse(Cookies.get("bag")) : null,
    likedProducts: getLikedProductsOrCreateNew(),
    hasCheckedProductPageLikes: Cookies.get("hasCheckedProductPageLikes") ? true : false,
    hasCheckedProductComponentLikes: Cookies.get("hasCheckedProductComponentLikes") ? true : false,
};

export function reducer(state, { type, payload }) {
    switch (type) {
        case "USER_LOGOUT": {
            Cookies.remove("user");
            Cookies.remove("bag");
            Cookies.remove("hasCheckedProductPageLikes");
            Cookies.remove("hasCheckedProductComponentLikes");
            Cookies.remove("likedProducts");

            return {
                ...state,
                user: null,
                bag: null,
                likedProducts: new Set(),
                hasCheckedProductPageLikes: false,
                hasCheckedProductComponentLikes: false,
            };
        }

        case "BAG_UPDATE": {
            Cookies.set("bag", JSON.stringify(payload));
            return { ...state, bag: payload };
        }

        case "USER_LOGIN": {
            Cookies.set("user", JSON.stringify(payload));
            return { ...state, user: payload };
        }

        case "ADD_PRODUCT_TO_LIKED": {
            // .add will return the SAME set with a modified value (because added new item)
            const modifiedCurrentSet = state.likedProducts.add(payload);

            // create a new set to assign to state so that a rerender occurs
            const newSet = new Set(modifiedCurrentSet);

            convertToArrayAndSetCookie(newSet);

            return { ...state, likedProducts: newSet };
        }

        case "REMOVE_PRODUCT_FROM_LIKED": {
            const currentSet = state.likedProducts;
            currentSet.delete(payload);
            const newSet = new Set(currentSet);

            convertToArrayAndSetCookie(newSet);

            return { ...state, likedProducts: newSet };
        }

        case "SET_CHECKED_PRODUCT_PAGE_LIKES": {
            Cookies.set("hasCheckedProductPageLikes", JSON.stringify(true));
            return { ...state, hasCheckedProductPageLikes: true };
        }

        case "SET_CHECKED_PRODUCT_COMPONENT_LIKES": {
            Cookies.set("hasCheckedProductComponentLikes", JSON.stringify(true));
            return { ...state, hasCheckedProductComponentLikes: true };
        }

        default:
            return state;
    }
}
