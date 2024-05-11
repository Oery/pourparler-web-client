"use client";

import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../_hooks/use-socket";

function getTypingString(usersTyping: string[]) {
    switch (usersTyping.length) {
        case 1:
            return `${usersTyping[0]} is typing...`;
        case 2:
            return `${usersTyping[0]} and ${usersTyping[1]} are typing...`;
        default:
            return "";
    }
}
export default function ChatInput({ channelId }: { channelId: number }) {
    const [message, setMessage] = useState("");
    const [usersTyping, setUsersTyping] = useState<string[]>([]);
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
            if (!socket) {
                console.log("no socket");
                return;
            }
            socket.emit("message:send", {
                channel: channelId,
                content: message,
                sendAt: new Date(),
            });
            setMessage("");
        },
        [message, socket, channelId],
    );

    const handleUserStartTyping = useCallback(
        ({ username }: { username: string }) => {
            if (usersTyping.includes(username)) return;
            setUsersTyping((prev) => [...prev, username]);
        },
        [usersTyping],
    );

    const handleUserStopTyping = useCallback(
        ({ username }: { username: string }) => {
            setUsersTyping((prev) => prev.filter((user) => user !== username));
        },
        [],
    );

    useEffect(() => {
        const newTypingString = getTypingString(usersTyping);
        if (newTypingString.length > 0) {
            setTypingString(newTypingString);
        }
    }, [usersTyping]);

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
                channel: 1,
            });
            setWasTyping(true);
        } else if (!isTyping && wasTyping) {
            socket.emit("typing:stop", {
                channel: 1,
            });
            setWasTyping(false);
        }
    }, [message, socket, wasTyping]);

    return (
        <form
            className="relative shrink-0 grow-0 basis-auto pb-3"
            onSubmit={handleSubmit}
        >
            <div
                className={`absolute bottom-14 z-0 w-full transition-transform ${usersTyping.length > 0 ? "translate-y-0" : "translate-y-10"}`}
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
