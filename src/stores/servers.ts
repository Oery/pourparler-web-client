import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./_store";
import type { Server, ServerEdit } from "~/app/_types/server";
import type { Channel, ChannelDelete } from "~/app/_types/channel";

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
        addChannel: (state, action: PayloadAction<Channel>) => {
            console.log("Adding channel", action.payload);
            state.map((server) => {
                if (
                    server.id !== action.payload.serverId &&
                    server.channels.find(
                        (channel) => channel.id === action.payload.id,
                    )
                )
                    return server;
                server.channels.push(action.payload);
                return server;
            });
        },
        removeChannel: (state, action: PayloadAction<ChannelDelete>) => {
            console.log("Removing channel", action.payload);

            state.map((server) => {
                server.channels = server.channels.filter(
                    (channel) => channel.id !== action.payload.channelId,
                );
                return server;
            });
        },
    },
});

export const {
    setServers,
    addServer,
    removeServer,
    editServer,
    addChannel,
    removeChannel,
} = serverSlice.actions;

export const serversSelector = (state: RootState) => state.servers;
