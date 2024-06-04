import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "~/app/_types/user";
import type { RootState } from "./_store";

export const memberSlice = createSlice({
    name: "members",
    initialState: [] as User[],
    reducers: {
        setMembers: (_state, action: PayloadAction<User[]>) => action.payload,
        addMember: (state, action: PayloadAction<User>) => {
            state.push(action.payload);
            return state;
        },
        removeMember: (state, action: PayloadAction<string>) => {
            return state.filter((member) => member.id !== action.payload);
        },
    },
});

export const { addMember, removeMember, setMembers } = memberSlice.actions;
export const membersSelector = (state: RootState) => state.members;
