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

interface Props {
    children: React.ReactNode;
    server: Server;
    users: User[];
}

export default function PourparlerClient({ children, server, users }: Props) {
    const storeRef = useRef<AppStore | null>(null);

    const messages = server.channels.flatMap((channel) => channel.messages!);

    if (!storeRef.current) {
        storeRef.current = makeStore();

        const serializedMessages = messages.map((message: Message) =>
            serializeMessage(message),
        );

        // Remove messages from channels
        const serverWithoutMessages: Server = {
            ...server,
            channels: server.channels.map((channel) => {
                return { ...channel, messages: [] };
            }),
        };

        const channelsWithoutMessages: Channel[] = server.channels.map(
            (channel) => {
                return { ...channel, messages: [] };
            },
        );

        storeRef.current.dispatch(setMembers(users));
        storeRef.current.dispatch(setMessages(serializedMessages));
        storeRef.current.dispatch(setServers([serverWithoutMessages]));
        storeRef.current.dispatch(setChannels(channelsWithoutMessages));
    }

    return <Provider store={storeRef.current}>{children}</Provider>;
}
