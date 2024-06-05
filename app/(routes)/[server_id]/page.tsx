import { db } from '@lib/db';
import { redirect } from 'next/navigation';

interface Props {
    params: { server_id: string };
}

export default async function ServerPage({ params }: Props) {
    const server = await db.query.servers.findFirst({
        where: (servers, { eq }) => eq(servers.id, params.server_id),
        with: { channels: true },
    });

    if (!server?.channels[0]) return <h1>No Channels</h1>;
    redirect(`/${server.id}/${server.channels[0].id}`);
}
