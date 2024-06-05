import { db } from "~/server/db";
import PourparlerClient from "~/app/components/app/pourparler-client";
import { redirect } from "next/navigation";
import { validateRequest } from "../lib/auth";

interface Props {
    children: React.ReactNode;
    params: { server_id: string };
}

export default async function ServerLayout({ children, params }: Props) {
    const appState = await validateRequest();
    if (!appState.user) return redirect("/login");

    try {
        const server = await db.query.servers.findFirst({
            where: (servers, { eq }) => eq(servers.id, params.server_id),
            with: { categories: { columns: { createdAt: false } } },
        });

        const channels = await db.query.channels.findMany({
            where: (channels, { eq }) =>
                eq(channels.serverId, params.server_id),
        });

        const users = await db.query.users.findMany({
            columns: { createdAt: false },
        });

        const messages = await db.query.messages.findMany({
            columns: { createdAt: false, updatedAt: false },
        });

        if (!server) return <h1>Server not found</h1>;
        const appData = { server, channels, users, messages, appState };

        return (
            <PourparlerClient appData={appData}>{children}</PourparlerClient>
        );
    } catch (err) {
        console.error("Error fetching server", err);
        return <h1>Server not found</h1>;
    }
}
