import type { AppState } from "@lib/types/app-state";
import type { User } from "@lib/types/user";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@stores/_store";
import type { Session } from "lucia";

export const appStateSlice = createSlice({
    name: "appState",
    initialState: { user: undefined, session: undefined } as AppState,
    reducers: {
        setAppState: (state, action: PayloadAction<AppState>) => {
            state.user = action.payload.user;
            state.session = action.payload.session;
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        setSession: (state, action: PayloadAction<Session>) => {
            state.session = action.payload;
        },
    },
});

export const { setUser, setSession, setAppState } = appStateSlice.actions;
export const appStateSelector = (state: RootState) => state.appState;
