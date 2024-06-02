"use client";

import { useSession } from "@clerk/nextjs";
import { useSocket } from "~/app/context/use-socket";
import ChatInput from "./chat-input";
import ChatMessageContainer from "./chat-message-container";
import type {
    MessageWithAuthor,
    SerializedMessageWithAuthor as SMWA,
} from "~/app/_types/message";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, messagesSelector } from "~/stores/messages";
import { serializeMessage } from "~/app/lib/utils/serialize";
import { RootState } from "~/stores/_store";

interface Props {
    channelId: string;
}

export default function Chat({ channelId }: Props) {
    const socket = useSocket();
    const { session } = useSession();
    const messages = useSelector<RootState, SMWA[]>(messagesSelector);
    const dispatch = useDispatch();

    const channelMessages = messages.filter(
        (message) => message.channelId == channelId,
    );

    const handleMessageReception = useCallback(
        (message: MessageWithAuthor) => {
            const serializedMessage = serializeMessage(message);
            dispatch(addMessage(serializedMessage));
        },
        [dispatch],
    );

    useEffect(() => {
        if (!socket) return;
        socket.on("message:send", handleMessageReception);

        return () => {
            socket.off("message:send");
        };
    }, [handleMessageReception, socket]);

    useEffect(() => {
        if (!socket || !session) return;
        socket.emit("clerk:auth", {
            sessionId: session.id,
            userId: session.user.id,
        });
    }, [socket, session]);

    return (
        <div className="flex grow flex-col">
            <ChatMessageContainer messages={channelMessages} />
            <ChatInput channelId={channelId} />
        </div>
    );
}
