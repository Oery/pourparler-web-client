import { deleteChannel } from "@lib/requests/channel";
import type { Channel } from "@lib/types/channel";
import { appStateSelector } from "@stores/app-state";
import { channelsSelector } from "@stores/channels";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@ui/shadcn/context-menu";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useSelector } from "react-redux";

interface Props {
    children: React.ReactNode;
    channel: Channel;
    isAdmin: boolean;
}

function ChannelContextMenu({ children, channel, isAdmin }: Props) {
    const router = useRouter();

    const { session } = useSelector(appStateSelector);
    const channels = useSelector(channelsSelector).filter(
        (channel) => channel.serverId === channel.serverId,
    );

    const handleDelete = useCallback(async () => {
        if (!session) return;
        const formData = new FormData();
        formData.append("serverId", channel.serverId);
        formData.append("channelId", channel.id);
        await deleteChannel(formData, session.id);

        // REDIRECT TO FIRST CHANNEL
        const firstChannel = channels[channels[0]?.id === channel.id ? 1 : 0];
        router.push(`/${firstChannel?.serverId}/${firstChannel?.id}`);
    }, [channel, router, channels, session]);

    return (
        <ContextMenu>
            <ContextMenuTrigger>{children}</ContextMenuTrigger>

            <ContextMenuContent>
                <ContextMenuItem>This is a context menu</ContextMenuItem>
                {isAdmin && (
                    <ContextMenuItem onClick={handleDelete}>
                        Delete Channel
                    </ContextMenuItem>
                )}
            </ContextMenuContent>
        </ContextMenu>
    );
}

export default ChannelContextMenu;
