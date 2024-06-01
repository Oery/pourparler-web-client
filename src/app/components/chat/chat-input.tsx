"use client";

import { useCallback, useEffect, useState } from "react";
import { useSocket } from "~/app/context/use-socket";
import ChatTypingIndicator from "./chat-typing-indicator";

export default function ChatInput({ channelId }: { channelId: string }) {
    const [message, setMessage] = useState("");
    const [wasTyping, setWasTyping] = useState(false);

    const socket = useSocket();

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setMessage(e.target.value);
        },
        [],
    );

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (!socket) return;
            socket.emit("message:send", {
                channelId,
                content: message,
                sendAt: new Date(),
            });
            setMessage("");
        },
        [message, socket, channelId],
    );

    useEffect(() => {
        if (!socket) return;
        const isTyping = message.length > 0;

        if (isTyping != wasTyping) {
            const event = isTyping ? "typing:start" : "typing:stop";
            socket.emit(event, { channel: channelId });
            setWasTyping(isTyping);
        }
    }, [message, socket, wasTyping, channelId]);

    return (
        <form
            className="relative shrink-0 grow-0 basis-auto pb-3"
            onSubmit={handleSubmit}
        >
            <ChatTypingIndicator channelId={channelId} />
            <input
                className="relative z-10 w-full rounded-lg border-none p-3 outline-none"
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={handleChange}
            />
        </form>
    );
}
