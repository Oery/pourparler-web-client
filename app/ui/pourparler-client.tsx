'use client';

import type { AppState } from '@lib/types/app-state';
import type { Channel } from '@lib/types/channel';
import type { Message } from '@lib/types/message';
import type { Server } from '@lib/types/server';
import type { User } from '@lib/types/user';
import { makeStore, type AppStore } from '@stores/_store';
import { setAppState } from '@stores/app-state';
import { setChannels } from '@stores/channels';
import { setMembers } from '@stores/members';
import { setMessages } from '@stores/messages';
import { setServers } from '@stores/servers';
import { SocketProvider } from '@stores/use-socket';
import { useRef } from 'react';
import { Provider } from 'react-redux';

interface AppData {
    server: Server;
    channels: Channel[];
    users: User[];
    messages: Message[];
    appState: AppState;
}

interface Props {
    children: React.ReactNode;
    appData: AppData;
}

export default function PourparlerClient({ children, appData }: Props) {
    const storeRef = useRef<AppStore | null>(null);
    const { server, channels, users, messages, appState } = appData;

    if (!storeRef.current) {
        storeRef.current = makeStore();

        const channelsWithoutMessages: Channel[] = channels.map((channel) => {
            return { ...channel, messages: [] };
        });

        storeRef.current.dispatch(setAppState(appState));
        storeRef.current.dispatch(setMembers(users));
        storeRef.current.dispatch(setMessages(messages));
        storeRef.current.dispatch(setServers([server]));
        storeRef.current.dispatch(setChannels(channelsWithoutMessages));
    }

    return (
        <Provider store={storeRef.current}>
            <SocketProvider>{children}</SocketProvider>
        </Provider>
    );
}
