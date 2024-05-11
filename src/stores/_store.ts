import { configureStore } from "@reduxjs/toolkit";
import { messageSlice } from "./messages";
import { channelSlice } from "./channels";

export const store = configureStore({
    reducer: {
        messages: messageSlice.reducer,
        channels: channelSlice.reducer,
    },
});
