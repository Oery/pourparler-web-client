import { db } from '@lib/db';
import { isWhitelisted } from '@lib/utils/whitelist';
import { validateRequest } from '@services/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function HomePage() {
    const { user } = await validateRequest();

    if (!user) return redirect('/login');
    if (!isWhitelisted(user.discordId)) return redirect('/whitelist');

    const servers = await db.query.servers.findMany();

    return (
        <>
            <div>User is logged in: {user.id}</div>
            <div>Discord ID: {user.discordId}</div>
            <div>Username: {user.username}</div>
            <div>Display Name: {user.displayName}</div>
            <img src={user.avatarUrl} alt='Avatar' />

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
