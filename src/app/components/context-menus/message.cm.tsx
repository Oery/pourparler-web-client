import { useCallback } from "react";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "../ui/context-menu";
import { useSession } from "@clerk/nextjs";
import { serversSelector } from "~/stores/servers";
import { deleteMessage } from "~/app/actions/message";
import { useSelector } from "react-redux";
import type { SerializedMessageWithAuthor } from "~/app/_types/message";

interface Props {
    children: React.ReactNode;
    message: SerializedMessageWithAuthor;
}

function MessageContextMenu({ children, message }: Props) {
    const { session } = useSession();
    const isAuthor = session?.user.id === message.author.id;

    const server = useSelector(serversSelector).find((server) =>
        server.channels.find((channel) => channel.id === message.channelId),
    )!;
    const isAdmin = server.ownerId === session?.user.id;

    const handleDelete = useCallback(async () => {
        if (!session) return;
        const formData = new FormData();
        formData.append("messageId", message.id);
        await deleteMessage(formData, session.id);
    }, [message, session]);

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
