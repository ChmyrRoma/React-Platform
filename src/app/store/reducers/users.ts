import { createSlice } from "@reduxjs/toolkit";

import { IUser } from "@/app/types";

export interface IUsersReducer {
    users: IUser[];
    isLoading: boolean;
}

const initialState = {
    users: [],
    isLoading: true,
} as unknown as IUsersReducer;

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getUsers: (state, action) => {
            state.users = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

export const usersSliceActions = usersSlice.actions;
