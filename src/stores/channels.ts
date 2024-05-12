import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Channel } from "~/app/_types/channel";

export const channelSlice = createSlice({
    name: "channels",
    initialState: [] as Channel[],
    reducers: {
        addChannel: (state, action: PayloadAction<Channel>) => {
            state.push(action.payload);
            return state;
        },
        removeChannel: (state, action: PayloadAction<number>) => {
            return state.filter((channel) => channel.id !== action.payload);
        },
    },
});
