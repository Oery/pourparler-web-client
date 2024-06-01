import HashIcon from "./icon-hash";
import MicIcon from "./icon-mic";

import { type Channel } from "~/app/_types/channel";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ChannelContextMenu from "~/app/components/context-menus/channel-cm";
import { useSelector } from "react-redux";
import { serversSelector } from "~/stores/servers";
import { useAuth } from "@clerk/nextjs";
import type { Server } from "~/app/_types/server";

interface Props {
    channel: Channel;
}

export default function ChannelComponent({ channel }: Props) {
    const pathname = usePathname();
    const isActive = pathname === `/${channel.id}`;
    const { userId } = useAuth();

    const serverOwner = useSelector<string, Server[]>(serversSelector).find(
        (server) => server.id === channel.serverId,
    )?.ownerId;

    const isAdmin = userId === serverOwner;

    return (
        <Link href={`./${channel.id}`} className="flex justify-between">
            <ChannelContextMenu channel={channel} isAdmin={isAdmin}>
                <div
                    className={`${isActive && "bg-stone-200"} flex cursor-pointer items-center gap-3 truncate rounded-md px-4 py-1 text-base font-light transition-all hover:translate-x-2 hover:bg-stone-200`}
                >
                    {channel.type === "voice" ? (
                        <MicIcon className="inline-block h-4 min-h-4 w-4 min-w-4" />
                    ) : (
                        <HashIcon className="inline-block h-4 min-h-4 w-4 min-w-4" />
                    )}
                    {channel.name}
                </div>
            </ChannelContextMenu>
        </Link>
    );
}
