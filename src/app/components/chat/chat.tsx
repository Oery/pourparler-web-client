"use client";

import { useSession } from "@clerk/nextjs";
import { useSocket } from "~/app/context/use-socket";
import ChatInput from "./chat-input";
import ChatMessageContainer from "./chat-message-container";
import type { Message, SerializedMessage } from "~/app/_types/message";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, messagesSelector, removeMessage } from "~/stores/messages";
import { serializeMessage } from "~/app/lib/utils/serialize";
import type { RootState } from "~/stores/_store";

interface Props {
    channelId: string;
}

export default function Chat({ channelId }: Props) {
    const socket = useSocket();
    const { session } = useSession();
    const messages = useSelector<RootState, SerializedMessage[]>(
        messagesSelector,
    );
    const dispatch = useDispatch();

    const channelMessages = messages.filter(
        (message) => message.channelId == channelId,
    );

    const handleMessageReception = useCallback(
        (message: Message) => {
            const serializedMessage = serializeMessage(message);
            dispatch(addMessage(serializedMessage));
        },
        [dispatch],
    );

    const handleMessageDeletion = useCallback(
        (messageId: string) => dispatch(removeMessage(messageId)),
        [dispatch],
    );

    useEffect(() => {
        if (!socket) return;
        socket.on("message:send", handleMessageReception);
        socket.on("message:delete", handleMessageDeletion);

        return () => {
            socket.off("message:send");
            socket.off("message:delete");
        };
    }, [socket, handleMessageReception, handleMessageDeletion]);

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
