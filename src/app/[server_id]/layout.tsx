import { auth } from "@clerk/nextjs/server";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { db } from "~/server/db";
import PourparlerClient from "~/app/components/app/pourparler-client";
import type { Server } from "../_types/server";

interface Props {
    children: React.ReactNode;
    params: { server_id: string };
}

export default async function ServerLayout({ children, params }: Props) {
    auth().protect();
    let server: Server | undefined = undefined;

    try {
        server = await db.query.servers.findFirst({
            columns: { createdAt: false },
            with: {
                channels: {
                    columns: { createdAt: false },
                    with: {
                        messages: {
                            columns: { createdAt: false, updatedAt: false },
                            with: { author: { columns: { createdAt: false } } },
                        },
                    },
                },
                categories: { columns: { createdAt: false } },
            },
            where: (servers, { eq }) => eq(servers.id, params.server_id),
        });
    } catch (err) {
        console.error("Error fetching server", err);
        return <h1>Server not found</h1>;
    }

    if (!server) return <h1>Server not found</h1>;

    return (
        <>
            <SignedOut>
                <h1>You are not logged in</h1>
                <p>Please log in to continue</p>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <PourparlerClient server={server}>{children}</PourparlerClient>
            </SignedIn>
        </>
    );
}
