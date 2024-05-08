"use client";

import { useCallback, useState } from "react";

export default function ChatInput() {
    const [message, setMessage] = useState("");

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === "Enter" && message) {
                e.preventDefault();
                setMessage("");
            }
        },
        [message],
    );

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setMessage(e.target.value);
        },
        [],
    );

    return (
        <form
            className="shrink-0 grow-0 basis-auto pb-3"
            onSubmit={(e) => e.preventDefault()}
        >
            <input
                className="w-full rounded-lg border-none p-3 outline-none"
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
        </form>
    );
}
