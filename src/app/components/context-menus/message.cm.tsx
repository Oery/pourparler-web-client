import { useCallback } from "react";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "../ui/context-menu";
import { serversSelector } from "~/stores/servers";
import { deleteMessage } from "~/app/actions/message";
import { useSelector } from "react-redux";
import type { SerializedMessage } from "~/app/_types/message";
import { channelsSelector } from "~/stores/channels";
import { appStateSelector } from "~/stores/app-state";

interface Props {
    children: React.ReactNode;
    message: SerializedMessage;
}

function MessageContextMenu({ children, message }: Props) {
    const { user, session } = useSelector(appStateSelector);
    const isAuthor = user?.id === message.authorId;

    const handleDelete = useCallback(async () => {
        if (!session) return;
        const formData = new FormData();
        formData.append("messageId", message.id);
        await deleteMessage(formData, session.id);
    }, [message, session]);

    const channel = useSelector(channelsSelector).find(
        (channel) => channel.id === message.channelId,
    );
    const server = useSelector(serversSelector).find(
        (server) => server.id === channel?.serverId,
    );

    const isAdmin = server?.ownerId === session?.userId;

    return (
        <ContextMenu>
            <ContextMenuTrigger>{children}</ContextMenuTrigger>

            <ContextMenuContent>
                <ContextMenuItem>This is the message menu</ContextMenuItem>
                {(isAdmin || isAuthor) && (
                    <ContextMenuItem onClick={handleDelete}>
                        Delete Message
                    </ContextMenuItem>
                )}
            </ContextMenuContent>
        </ContextMenu>
    );
}

export default MessageContextMenu;
