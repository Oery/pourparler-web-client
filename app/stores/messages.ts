import type { MessageEdit, SerializedMessage } from '@lib/types/message';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@stores/_store';

export const messageSlice = createSlice({
    name: 'messages',
    initialState: [] as SerializedMessage[],
    reducers: {
        setMessages: (_state, action: PayloadAction<SerializedMessage[]>) => {
            return action.payload;
        },
        addMessage: (state, action: PayloadAction<SerializedMessage>) => {
            const message = state.find(
                (message) => message.clientId === action.payload.clientId,
            );

            if (message) {
                return state.map((message) =>
                    message.clientId === action.payload.clientId
                        ? action.payload
                        : message,
                );
            }

            state.push(action.payload);
            return state;
        },
        removeMessage: (state, action: PayloadAction<string>) => {
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
        purgeMessages: (state, action: PayloadAction<string>) => {
            return state.filter(
                (message) => message.channelId !== action.payload,
            );
        },
    },
});

export const {
    setMessages,
    addMessage,
    removeMessage,
    editMessage,
    purgeMessages,
} = messageSlice.actions;

export const messagesSelector = (state: RootState) => state.messages;
