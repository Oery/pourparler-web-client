import HashIcon from "./icon-hash";

import { type Channel } from "~/app/_types/channel";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ChannelContextMenu from "~/app/components/context-menus/channel-cm";

interface Props {
    channel: Channel;
    isAdmin: boolean;
}

export default function TextChannel({ channel, isAdmin }: Props) {
    const pathname = usePathname();
    const isActive = pathname === `/${channel.id}`;

    const styles =
        "flex cursor-pointer items-center gap-3 truncate rounded-md px-4 py-1 text-base font-light transition-all hover:translate-x-2 hover:bg-stone-200";

    return (
        <Link href={`./${channel.id}`} className="flex justify-between">
            <ChannelContextMenu channel={channel} isAdmin={isAdmin}>
                <div className={`${isActive && "bg-stone-200"} ${styles}`}>
                    <HashIcon className="inline-block h-4 min-h-4 w-4 min-w-4" />
                    {channel.name}
                </div>
            </ChannelContextMenu>
        </Link>
    );
}