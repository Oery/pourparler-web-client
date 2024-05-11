"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import type { ServerWithChannels } from "~/app/_types/server";
import { makeStore, type AppStore } from "~/stores/_store";
import { setMessages } from "~/stores/messages";

interface Props {
    children: React.ReactNode;
    server: ServerWithChannels;
}

export default function PourparlerClient({ children, server }: Props) {
    const storeRef = useRef<AppStore | null>(null);

    const messages = server.channels.flatMap((channel) => channel.messages);

    if (!storeRef.current) {
        storeRef.current = makeStore();
        storeRef.current.dispatch(setMessages(messages));
    }

    return <Provider store={storeRef.current}>{children}</Provider>;
}
