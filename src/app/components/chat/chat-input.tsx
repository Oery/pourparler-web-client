"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSocket } from "~/app/context/use-socket";
import ChatTypingIndicator from "./chat-typing-indicator";
import { useDispatch } from "react-redux";
import { addMessage } from "~/stores/messages";
import { serializeMessage } from "~/app/lib/utils/serialize";
import { useUser } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid";
import { removeUselessNewlines } from "~/app/lib/utils/message";

export default function ChatInput({ channelId }: { channelId: string }) {
    const [message, setMessage] = useState("");
    const [wasTyping, setWasTyping] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const socket = useSocket();
    const { user } = useUser();
    const dispatch = useDispatch();

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setMessage(e.target.value);
        },
        [],
    );

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (!(e.key === "Enter" && !e.shiftKey)) return;
            e.preventDefault();
            if (!socket || !user || !message) return;

            const sendAt = new Date();
            const clientId = uuidv4();

            const content = removeUselessNewlines(message);
            if (!content) return;

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
                content,
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
        [message, socket, channelId, dispatch, user],
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

    // Expand TextArea to fit new lines
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto"; // Reset height to calculate properly
            const borderHeight = 24; // Calculate border/padding
            textarea.style.height = `${textarea.scrollHeight - borderHeight}px`; // Set correct height including borders
        }
    }, [message]);

    return (
        <form className="relative shrink-0 grow-0 basis-auto pb-1.5">
            <ChatTypingIndicator channelId={channelId} />
            <textarea
                ref={textareaRef}
                value={message}
                placeholder="Type a message..."
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                className="relative z-10 h-12 w-full resize-none rounded-lg border-none p-3 outline-none"
            />
        </form>
    );
}
