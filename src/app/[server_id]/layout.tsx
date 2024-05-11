import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { db } from "~/server/db";
import PourparlerClient from "./_components/pourparler-client";

interface Props {
    children: React.ReactNode;
}

export default async function ServerLayout({ children }: Props) {
    const server = await db.query.servers.findFirst({
        with: {
            channels: {
                with: {
                    messages: {
                        with: {
                            author: true,
                        },
                    },
                },
            },
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
