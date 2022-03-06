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

    // hasCheckedProductPageLikes: Cookies.get("hasCheckedProductPageLikes")
    //     ? JSON.parse(Cookies.get("hasCheckedProductPageLikes"))
    //     : false,

    hasCheckedProductComponentLikes: Cookies.get("hasCheckedProductComponentLikes") ? true : false,

    // hasCheckedProductComponentLikes: Cookies.get("hasCheckedProductComponentLikes")
    //     ? JSON.parse(Cookies.get("hasCheckedProductComponentLikes"))
    //     : false,
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

        case "BAG_UPDATE":
            return { ...state, bag: payload };

        case "USER_LOGIN":
            return { ...state, user: payload };

        case "ADD_PRODUCT_TO_LIKED": {
            const likedProducts = state.likedProducts.add(payload);
            convertToArrayAndSetCookie(likedProducts);

            return { ...state, likedProducts };
        }

        case "REMOVE_PRODUCT_FROM_LIKED": {
            const { likedProducts } = state;

            likedProducts.delete(payload);
            convertToArrayAndSetCookie(likedProducts);

            return { ...state, likedProducts };
        }

        case "SET_CHECKED_PRODUCT_PAGE_LIKES": {
            Cookies.set("hasCheckedProductPageLikes", true);
            return { ...state, hasCheckedProductPageLikes: true };
        }

        case "SET_CHECKED_PRODUCT_COMPONENT_LIKES": {
            Cookies.set("hasCheckedProductComponentLikes", true);
            return { ...state, hasCheckedProductComponentLikes: true };
        }

        default:
            return state;
    }
}
