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

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
