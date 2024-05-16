import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { db } from "~/server/db";
import { isWhitelisted } from "~/server/whitelist/whitelist";

export default async function HomePage() {
    const { userId } = auth();

    if (!userId) return <div>User is not logged in</div>;
    const whitelist = isWhitelisted(userId);

    const servers = await db.query.servers.findMany();

    return (
        <>
            <div>User is logged in: {userId}</div>
            <div>Is Whitelisted: {whitelist.toString()}</div>

            <div>
                {servers.map((server) => (
                    <Link href={`/${server.id}`} key={server.id}>
                        {server.name}
                    </Link>
                ))}
            </div>
        </>
    );
}
