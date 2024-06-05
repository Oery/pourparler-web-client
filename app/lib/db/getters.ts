import { db } from "@lib/db";

export async function getServer(serverId: string) {
    return await db.query.servers.findFirst({
        where: (servers, { eq }) => eq(servers.id, serverId),
        with: { categories: { columns: { createdAt: false } } },
    });
}

export async function getChannels(serverId: string) {
    return await db.query.channels.findMany({
        where: (channels, { eq }) => eq(channels.serverId, serverId),
    });
}

export async function getUsers() {
    return await db.query.users.findMany({
        columns: { createdAt: false },
    });
}

export async function getMessages() {
    return await db.query.messages.findMany({
        columns: { createdAt: false, updatedAt: false },
    });
}
