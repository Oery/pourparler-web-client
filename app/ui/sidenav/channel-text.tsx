import { type Channel } from '@lib/types/channel';
import ChannelContextMenu from '@ui/context-menus/channel-cm';
import HashIcon from '@ui/icons/icon-hash';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
    channel: Channel;
    isAdmin: boolean;
}

export default function TextChannel({ channel, isAdmin }: Props) {
    const pathname = usePathname();
    const isActive = pathname.endsWith(`/${channel.id}`);

    const styles =
        'flex cursor-pointer items-center gap-3 truncate rounded-md px-4 py-1 text-base font-light transition-all hover:translate-x-2 hover:bg-stone-200';

    return (
        <Link href={`./${channel.id}`} className='flex justify-between'>
            <ChannelContextMenu channel={channel} isAdmin={isAdmin}>
                <div className={`${isActive && 'bg-stone-200'} ${styles}`}>
                    <HashIcon className='inline-block h-4 min-h-4 w-4 min-w-4' />
                    {channel.name}
                </div>
            </ChannelContextMenu>
        </Link>
    );
}
