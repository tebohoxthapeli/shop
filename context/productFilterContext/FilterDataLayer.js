import { createContext, useContext, useReducer } from "react";
import { initialState, reducer } from "./reducer";

const FilterContext = createContext();

export function FilterContextProvider({ children }) {
    return (
        <FilterContext.Provider value={useReducer(reducer, initialState)}>
            {children}
        </FilterContext.Provider>
    );
}

export function useFilterContextValue() {
    return useContext(FilterContext);
}
