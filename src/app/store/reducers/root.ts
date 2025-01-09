import { AnyAction, combineReducers } from "@reduxjs/toolkit";

import { IUsersReducer, usersSlice } from "./users";
import { filtersSlice, IFiltersReducer } from "./filters";

export interface StoreState {
    users: IUsersReducer;
    filters: IFiltersReducer;
}

export const combinedReducers = combineReducers({
    [usersSlice.name]: usersSlice.reducer,
    [filtersSlice.name]: filtersSlice.reducer,
});

export type Store = ReturnType<typeof combinedReducers>;

const rootReducer = (state: Store, action: AnyAction) => combinedReducers(state, action);

export default rootReducer;
