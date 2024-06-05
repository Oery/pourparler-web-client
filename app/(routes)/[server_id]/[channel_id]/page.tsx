"use client";

import { channelsSelector } from "@stores/channels";
import ChannelBar from "@ui/channel/channel-bar";
import Chat from "@ui/chat/chat";
import { useSelector } from "react-redux";

interface Props {
    params: { channel_id: string; server_id: string };
}

export default function ChannelPage({ params }: Props) {
    const channel = useSelector(channelsSelector).find(
        (channel) => channel.id === params.channel_id,
    );

    if (!channel) return <h1>Channel not found</h1>;

    return (
        <>
            <ChannelBar channel={channel} />
            <Chat channelId={channel.id} />
        </>
    );
}
