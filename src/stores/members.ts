import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "~/app/_types/user";

export const memberSlice = createSlice({
    name: "members",
    initialState: [] as User[],
    reducers: {
        addMember: (state, action: PayloadAction<User>) => {
            state.push(action.payload);
            return state;
        },
        removeMember: (state, action: PayloadAction<string>) => {
            return state.filter((member) => member.id !== action.payload);
        },
    },
});
