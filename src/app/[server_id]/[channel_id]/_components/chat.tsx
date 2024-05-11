"use client";

import { useSession } from "@clerk/nextjs";
import { useSocket } from "../_hooks/use-socket";
import ChatInput from "./chat-input";
import ChatMessageContainer from "./chat-message-container";
import type { ChannelWithMessages } from "~/app/_types/channel";
import type { MessageWithAuthor } from "~/app/_types/message";
import { useCallback, useEffect, useState } from "react";

interface Props {
    channel: ChannelWithMessages;
}

export default function Chat({ channel }: Props) {
    const [messages, setMessages] = useState<MessageWithAuthor[]>(
        channel.messages,
    );
    const socket = useSocket();
    const { session } = useSession();

    const handleMessageReception = useCallback((message: MessageWithAuthor) => {
        setMessages((prev) => [...prev, message]);
    }, []);

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
            <ChatMessageContainer messages={messages} />
            <ChatInput channelId={channelId} />
        </div>
    );
}
