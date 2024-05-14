import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";

export default async function isAdmin(serverId: string) {
    const { userId } = auth();

    try {
        const server = await db.query.servers.findFirst({
            where: (servers, { eq }) => eq(servers.id, serverId),
        });
        return userId === server?.ownerId;
    } catch (error) {
        return false;
    }
}

export function isAuthenticated() {
    const { userId } = auth();
    return userId;
}
