"use client";

import { useSocket } from "../_hooks/use-socket";
import ChatInput from "./chat-input";
import ChatMessageContainer from "./chat-message-container";
import type { MessageWithAuthor, ChannelWithMessages } from "./definitions";
import { useCallback, useEffect, useState } from "react";

interface Props {
    channel: ChannelWithMessages;
}

export default function Chat({ channel }: Props) {
    const [messages, setMessages] = useState<MessageWithAuthor[]>(
        channel.messages,
    );
    const socket = useSocket();

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

    return (
        <div className="flex grow flex-col">
            <ChatMessageContainer messages={messages} />
            <ChatInput />
        </div>
    );
}
