import { db } from "@lib/db";

export default async function isAdmin(userId: string, serverId: string) {
    try {
        const server = await db.query.servers.findFirst({
            where: (servers, { eq }) => eq(servers.id, serverId),
        });
        if (!server) return false;
        return userId === server.ownerId;
    } catch (error) {
        return false;
    }
}
