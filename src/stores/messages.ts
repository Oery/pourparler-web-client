import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
    MessageEdit,
    SerializedMessageWithAuthor as SMWA,
} from "~/app/_types/message";
import type { RootState } from "./_store";

export const messageSlice = createSlice({
    name: "messages",
    initialState: [] as SMWA[],
    reducers: {
        setMessages: (_state, action: PayloadAction<SMWA[]>) => {
            return action.payload;
        },
        addMessage: (state, action: PayloadAction<SMWA>) => {
            state.push(action.payload);
            return state;
        },
        removeMessage: (state, action: PayloadAction<number>) => {
            return state.filter((message) => message.id !== action.payload);
        },
        editMessage: (state, action: PayloadAction<MessageEdit>) => {
            const message = state.find(
                (message) => message.id === action.payload.id,
            );

            if (!message) return;

            message.content = action.payload.content;
            message.wasEdited = true;

            return state.map((message) =>
                message.id === action.payload.id ? message : message,
            );
        },
    },
});

export const { setMessages, addMessage, removeMessage, editMessage } =
    messageSlice.actions;

export const messagesSelector = (state: RootState) => state.messages;
