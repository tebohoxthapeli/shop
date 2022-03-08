export const initialState = {
    sortBy: "newest",
    maxPrice: 10000,
    brands: [],
};

export function reducer(state, { type, payload }) {
    switch (type) {
        case "CHANGE_SORT_BY":
            return { ...state, sortBy: payload };

        case "CHANGE_MAX_PRICE":
            return { ...state, maxPrice: payload };

        case "CHANGE_BRANDS": {
            let brands = state.brands;

            if (brands.includes(payload)) {
                brands = brands.filter((brand) => brand !== payload);
            } else {
                brands = [...brands, payload];
            }

            return { ...state, brands };
        }

        case "CLEAR_STATE":
            return {
                sortBy: "newest",
                maxPrice: 10000,
                brands: [],
            };
    }
}
