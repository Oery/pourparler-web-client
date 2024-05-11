import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MessageEdit, MessageWithAuthor } from "~/app/_types/message";

export const messageSlice = createSlice({
    name: "messages",
    initialState: [] as MessageWithAuthor[],
    reducers: {
        setMessages: (state, action: PayloadAction<MessageWithAuthor[]>) => {
            state = action.payload;
        },
        addMessage: (state, action: PayloadAction<MessageWithAuthor>) => {
            state.push(action.payload);
        },
        removeMessage: (state, action: PayloadAction<number>) => {
            state = state.filter((message) => message.id !== action.payload);
        },
        editMessage: (state, action: PayloadAction<MessageEdit>) => {
            const message = state.find(
                (message) => message.id === action.payload.id,
            );

            if (!message) return;

            message.content = action.payload.content;
            message.editAt = action.payload.editAt;
            message.wasEdited = true;

            state = state.map((message) =>
                message.id === action.payload.id ? message : message,
            );
        },
    },
});

export const { setMessages, addMessage, removeMessage, editMessage } =
    messageSlice.actions;

