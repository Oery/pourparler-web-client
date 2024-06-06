import { Button } from '@/ui/shadcn/button';
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
        <main className='flex flex-col items-center justify-between h-screen'>
            <div className='mt-40'>
                <h1 className='text-3xl font-semibold mb-8'>
                    Bienvenue {user.displayName}
                </h1>
                <img
                    src={user.avatarUrl}
                    alt='User Avatar'
                    height={224}
                    className='rounded-full w-56'
                />
                <div className='mt-8'>
                    {servers.map((server) => (
                        <Button key={server.id} variant='outline'>
                            <Link href={`/${server.id}`} key={server.id}>
                                Accéder à {server.name}
                            </Link>
                        </Button>
                    ))}
                </div>
            </div>

            <div className='absolute bottom-8 text-sm'>
                <h1 className='text-xl font-semibold'>Debug</h1>
                <div>User ID: {user.id}</div>
                <div>Discord ID: {user.discordId}</div>
                <div>Username: {user.username}</div>
                <div>Display Name: {user.displayName}</div>
            </div>
        </main>
    );
}
