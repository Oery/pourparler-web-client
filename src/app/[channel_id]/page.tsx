import { db } from "~/server/db";
import ChannelBar from "./_components/channel-bar";
import Chat from "./_components/chat";

export const dynamic = "force-dynamic";

interface Props {
    params: { channel_id: number };
}

export default async function ChannelPage({ params }: Props) {
    if (isNaN(params.channel_id)) {
        return <h1>Invalid channel id</h1>;
    }

    const channel = await db.query.channels.findFirst({
        where: (channels, { eq }) => eq(channels.id, params.channel_id),
    });

    if (!channel) {
        return <h1>Channel not found</h1>;
    }

    const chatMessages = await db.query.messages.findMany({
        where: (messages, { eq }) => eq(messages.channelId, params.channel_id),
        with: {
            author: true,
        },
    });

    const channelWithMessages = {
        ...channel,
        messages: chatMessages,
    };

    return (
        <>
            <ChannelBar channel={channel} />
            <Chat channel={channelWithMessages} />
        </>
    );
}
