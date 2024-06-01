import { useCallback } from "react";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "../ui/context-menu";
import { deleteChannel } from "~/app/lib/actions/channels";
import type { Channel } from "~/app/_types/channel";

interface Props {
    children: React.ReactNode;
    channel: Channel;
    isAdmin: boolean;
}

function ChannelContextMenu({ children, channel, isAdmin }: Props) {
    const handleDelete = useCallback(async () => {
        const formData = new FormData();
        formData.append("serverId", channel.serverId);
        formData.append("channelId", channel.id);
        await deleteChannel(formData);
    }, [channel]);

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
