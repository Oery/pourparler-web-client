import type {
    Channel,
    ChannelDelete,
    VoiceChannelEvent,
} from '@lib/types/channel';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@stores/_store';

export const channelSlice = createSlice({
    name: 'channels',
    initialState: [] as Channel[],
    reducers: {
        setChannels: (_state, action: PayloadAction<Channel[]>) => {
            return action.payload;
        },
        addChannel: (state, action: PayloadAction<Channel>) => {
            if (state.find((channel) => channel.id === action.payload.id)) {
                return state;
            }

            state.push(action.payload);
            return state;
        },
        removeChannel: (state, action: PayloadAction<ChannelDelete>) => {
            return state.filter(
                (channel) => channel.id !== action.payload.channelId,
            );
        },
        userJoinedVoiceChannel: (
            state,
            action: PayloadAction<VoiceChannelEvent>,
        ) => {
            state.map((channel) => {
                if (channel.id === action.payload.channelId) {
                    channel.users?.push(action.payload.userId);
                }
                return channel;
            });
        },
        userLeftVoiceChannel: (
            state,
            action: PayloadAction<VoiceChannelEvent>,
        ) => {
            state.map((channel) => {
                if (channel.id === action.payload.channelId) {
                    channel.users = channel.users?.filter(
                        (user) => user !== action.payload.userId,
                    );
                }
                return channel;
            });
        },
    },
});

export const {
    setChannels,
    addChannel,
    removeChannel,
    userJoinedVoiceChannel,
    userLeftVoiceChannel,
} = channelSlice.actions;

export const channelsSelector = (state: RootState) => state.channels;
