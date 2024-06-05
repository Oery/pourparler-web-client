import { configureStore } from '@reduxjs/toolkit';
import { appStateSlice } from '@stores/app-state';
import { channelSlice } from '@stores/channels';
import { memberSlice } from '@stores/members';
import { messageSlice } from '@stores/messages';
import { serverSlice } from '@stores/servers';

export const makeStore = () =>
    configureStore({
        reducer: {
            messages: messageSlice.reducer,
            members: memberSlice.reducer,
            servers: serverSlice.reducer,
            channels: channelSlice.reducer,
            appState: appStateSlice.reducer,
        },
    });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
