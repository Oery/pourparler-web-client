import PourparlerClient from "~/app/components/app/pourparler-client";
import { redirect } from "next/navigation";
import { validateRequest } from "../lib/auth";
import {
    getChannels,
    getMessages,
    getServer,
    getUsers,
} from "~/server/db/getters";

interface Props {
    children: React.ReactNode;
    params: { server_id: string };
}

export default async function ServerLayout({ children, params }: Props) {
    const appState = await validateRequest();
    if (!appState.user) return redirect("/login");

    try {
        const [server, channels, users, messages] = await Promise.all([
            getServer(params.server_id),
            getChannels(params.server_id),
            getUsers(),
            getMessages(),
        ]);

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
