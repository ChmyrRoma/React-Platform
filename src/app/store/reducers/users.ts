import { createSlice } from '@reduxjs/toolkit';

export interface IUsersReducer {
    users: object[];
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
