import type { Server, ServerEdit } from "@lib/types/server";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@stores/_store";

export const serverSlice = createSlice({
    name: "servers",
    initialState: [] as Server[],
    reducers: {
        setServers: (_state, action: PayloadAction<Server[]>) => action.payload,
        addServer: (state, action: PayloadAction<Server>) =>
            void state.push(action.payload),
        removeServer: (state, action: PayloadAction<string>) =>
            void state.filter((server) => server.id !== action.payload),
        editServer: (state, action: PayloadAction<ServerEdit>) => {
            state.map((server) => {
                if (server.id === action.payload.id) {
                    server = { ...server, ...action.payload };
                }
                return server;
            });
        },
    },
});

export const { setServers, addServer, removeServer, editServer } =
    serverSlice.actions;

export const serversSelector = (state: RootState) => state.servers;
