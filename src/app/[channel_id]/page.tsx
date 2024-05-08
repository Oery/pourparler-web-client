import { db } from "~/server/db";
import ChannelBar from "./_components/channel-bar";

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

    return (
        <main>
            <ChannelBar channel={channel} />
            <h1>Channel {params.channel_id}</h1>
            <h1>Channel {channel.name}</h1>
        </main>
    );
}
