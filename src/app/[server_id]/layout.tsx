import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { db } from "~/server/db";
import PourparlerClient from "./_components/pourparler-client";
import { auth } from "@clerk/nextjs/server";

interface Props {
    children: React.ReactNode;
}

export default async function ServerLayout({ children }: Props) {
    auth().protect();

    const server = await db.query.servers.findFirst({
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
    });

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
