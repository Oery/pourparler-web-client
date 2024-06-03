"use client";

import { useCallback, useEffect, useState } from "react";
import { useSocket } from "~/app/context/use-socket";
import ChatTypingIndicator from "./chat-typing-indicator";
import { useDispatch } from "react-redux";
import { addMessage } from "~/stores/messages";
import { serializeMessage } from "~/app/lib/utils/serialize";
import { useUser } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid";

export default function ChatInput({ channelId }: { channelId: string }) {
    const [message, setMessage] = useState("");
    const [wasTyping, setWasTyping] = useState(false);

    const socket = useSocket();
    const { user } = useUser();
    const dispatch = useDispatch();

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setMessage(e.target.value);
        },
        [],
    );

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (!socket || !user || !message) return;

            const sendAt = new Date();
            const clientId = uuidv4();

            let content = message;

            if (message.startsWith("http")) {
                const formats = ["png", "jpg", "jpeg", "gif", "webp"];
                const ext = message.split(".").pop() ?? "";
                if (formats.includes(ext)) content = `![](${message})`;
            }

            socket.emit("message:send", {
                channelId,
                sendAt,
                clientId,
                content,
            });

            const serializedMessage = serializeMessage({
                id: "",
                clientId,
                isSending: true,
                content: message,
                sendAt,
                channelId,
                author: {
                    id: user.id,
                    name: user.firstName ?? "",
                    avatarUrl: user.imageUrl,
                },
            });

            dispatch(addMessage(serializedMessage));

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
