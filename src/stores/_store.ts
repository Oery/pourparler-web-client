import { configureStore } from "@reduxjs/toolkit";
import { messageSlice } from "./messages";

export const store = configureStore({
    reducer: {
        messages: messageSlice.reducer,
    },
});
