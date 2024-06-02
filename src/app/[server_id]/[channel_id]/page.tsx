"use client";

import ChannelBar from "~/app/components/app/channel-bar";
import Chat from "~/app/components/chat/chat";
import { useSelector } from "react-redux";
import { serversSelector } from "~/stores/servers";
import type { Server } from "~/app/_types/server";
import { RootState } from "~/stores/_store";

interface Props {
    params: { channel_id: string; server_id: string };
}

export default function ChannelPage({ params }: Props) {
    const channel = useSelector<RootState, Server[]>(serversSelector)
        .find((server) => server.id === params.server_id)
        ?.channels.find((channel) => channel.id === params.channel_id);

    if (!channel) return <h1>Channel not found</h1>;

    return (
        <>
            <ChannelBar channel={channel} />
            <Chat channelId={channel.id} />
        </>
    );
}
