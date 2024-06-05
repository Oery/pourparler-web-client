"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import type { Message } from "~/app/_types/message";
import type { Server } from "~/app/_types/server";
import type { User } from "~/app/_types/user";
import type { Channel } from "~/app/_types/channel";
import { makeStore, type AppStore } from "~/stores/_store";
import { setMessages } from "~/stores/messages";
import { setServers } from "~/stores/servers";
import { serializeMessage } from "~/app/lib/utils/serialize";
import { setChannels } from "~/stores/channels";
import { setMembers } from "~/stores/members";
import type { AppState } from "~/app/_types/app-state";
import { setAppState } from "~/stores/app-state";

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

        const serializedMessages = messages.map((message: Message) =>
            serializeMessage(message),
        );

        const channelsWithoutMessages: Channel[] = channels.map((channel) => {
            return { ...channel, messages: [] };
        });

        storeRef.current.dispatch(setAppState(appState));
        storeRef.current.dispatch(setMembers(users));
        storeRef.current.dispatch(setMessages(serializedMessages));
        storeRef.current.dispatch(setServers([server]));
        storeRef.current.dispatch(setChannels(channelsWithoutMessages));
    }

    return <Provider store={storeRef.current}>{children}</Provider>;
}
