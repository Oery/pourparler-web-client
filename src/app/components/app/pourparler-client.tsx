"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import type { MessageWithAuthor } from "~/app/_types/message";
import type { Server } from "~/app/_types/server";
import { makeStore, type AppStore } from "~/stores/_store";
import { setMessages } from "~/stores/messages";
import { setServers } from "~/stores/servers";
import { serializeMessage } from "~/app/lib/utils/serialize";

interface Props {
    children: React.ReactNode;
    server: Server;
}

export default function PourparlerClient({ children, server }: Props) {
    const storeRef = useRef<AppStore | null>(null);

    const messages = server.channels.flatMap((channel) => channel.messages!);

    if (!storeRef.current) {
        storeRef.current = makeStore();

        const serializedMessages = messages.map((message) =>
            serializeMessage(message as MessageWithAuthor),
        );

        // Remove messages from channels
        const serverWithoutMessages: Server = {
            ...server,
            channels: server.channels.map((channel) => {
                return { ...channel, messages: [] };
            }),
        };

        storeRef.current.dispatch(setMessages(serializedMessages));
        storeRef.current.dispatch(setServers([serverWithoutMessages]));
    }

    return <Provider store={storeRef.current}>{children}</Provider>;
}
