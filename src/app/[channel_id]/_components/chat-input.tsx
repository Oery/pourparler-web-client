"use client";

import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../_hooks/use-socket";

export default function ChatInput() {
    const [message, setMessage] = useState("");

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
                channel: 1,
                content: message,
                sendAt: new Date(),
            });
            setMessage("");
        },
        [message, socket],
    );

    return (
        <form
            className="shrink-0 grow-0 basis-auto pb-3"
            onSubmit={handleSubmit}
        >
            <input
                className="w-full rounded-lg border-none p-3 outline-none"
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={handleChange}
            />
        </form>
    );
}
