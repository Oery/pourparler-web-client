import { configureStore } from "@reduxjs/toolkit";
import { messageSlice } from "./messages";
import { memberSlice } from "./members";
import { serverSlice } from "./servers";
import { channelSlice } from "./channels";

export const makeStore = () =>
    configureStore({
        reducer: {
            messages: messageSlice.reducer,
            members: memberSlice.reducer,
            servers: serverSlice.reducer,
            channels: channelSlice.reducer,
        },
    });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
