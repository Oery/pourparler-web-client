"use client";

import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../_hooks/use-socket";

function getTypingString(usersTyping: TypingUser[]) {
    switch (usersTyping.length) {
        case 1:
            return `${usersTyping[0]?.name} is typing...`;
        case 2:
            return `${usersTyping[0]?.name} and ${usersTyping[1]?.name} are typing...`;
        default:
            return "";
    }
}

interface TypingUser {
    name: string;
    channel: string;
}

export default function ChatInput({ channelId }: { channelId: string }) {
    const [message, setMessage] = useState("");
    const [usersTyping, setUsersTyping] = useState<TypingUser[]>([]);
    const [wasTyping, setWasTyping] = useState(false);
    const [typingString, setTypingString] = useState("");

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

    const handleUserStartTyping = useCallback(
        (user: TypingUser) => {
            if (usersTyping.includes(user)) return;
            setUsersTyping((prev) => [...prev, user]);
        },
        [usersTyping],
    );

    const handleUserStopTyping = useCallback((user: TypingUser) => {
        setUsersTyping((prev) => prev.filter((u) => u.name !== user.name));
    }, []);

    useEffect(() => {
        const newTypingString = getTypingString(
            usersTyping.filter((u) => u.channel == channelId),
        );
        if (newTypingString.length > 0) {
            setTypingString(newTypingString);
        }
    }, [channelId, usersTyping]);

    useEffect(() => {
        if (!socket) return;

        socket.on("typing:start", handleUserStartTyping);
        socket.on("typing:stop", handleUserStopTyping);

        return () => {
            socket?.off("typing:start");
            socket?.off("typing:stop");
        };
    }, [handleUserStartTyping, handleUserStopTyping, socket]);

    useEffect(() => {
        if (!socket) return;
        const isTyping = message.length > 0;

        if (isTyping && !wasTyping) {
            socket.emit("typing:start", {
                channel: channelId,
            });
            setWasTyping(true);
        } else if (!isTyping && wasTyping) {
            socket.emit("typing:stop", {
                channel: channelId,
            });
            setWasTyping(false);
        }
    }, [message, socket, wasTyping, channelId]);

    return (
        <form
            className="relative shrink-0 grow-0 basis-auto pb-3"
            onSubmit={handleSubmit}
        >
            <div
                className={`absolute bottom-14 z-0 w-full transition-transform ${usersTyping.filter((u) => u.channel == channelId).length > 0 ? "translate-y-0" : "translate-y-10"}`}
            >
                <p className="h-7 w-full rounded-md bg-stone-200 px-2 text-sm text-stone-600">
                    {typingString}
                </p>
            </div>
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
