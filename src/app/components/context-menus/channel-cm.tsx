import { useCallback } from "react";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "../ui/context-menu";
import { deleteChannel } from "~/app/actions/channel";
import type { Channel } from "~/app/_types/channel";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { channelsSelector } from "~/stores/channels";
import { appStateSelector } from "~/stores/app-state";

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
