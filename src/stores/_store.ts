import { configureStore } from "@reduxjs/toolkit";
import { messageSlice } from "./messages";
import { channelSlice } from "./channels";
import { memberSlice } from "./members";

export const makeStore = () =>
    configureStore({
        reducer: {
            messages: messageSlice.reducer,
            channels: channelSlice.reducer,
            members: memberSlice.reducer,
        },
    });

