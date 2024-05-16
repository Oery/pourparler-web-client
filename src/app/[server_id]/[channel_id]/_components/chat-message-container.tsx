"use client";

import { useEffect, useRef, useState } from "react";
import ChatMessage from "./chat-message";
import type { SerializedMessageWithAuthor } from "~/app/_types/message";

interface Props {
    messages: SerializedMessageWithAuthor[];
}

export default function ChatMessageContainer({ messages }: Props) {
    const lastMessageRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        const updateHeight = () => {
            const container = containerRef.current;
            if (!container) return;

            const messageContainer = container.children[1];
            if (!messageContainer) return;

            setHeight(messageContainer.clientHeight);
        };

        updateHeight();
        window.addEventListener("resize", updateHeight);

        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });

        return () => {
            window.removeEventListener("resize", updateHeight);
        };
    }, [messages]);

    return (
        <div className="scrollbar-hide relative flex grow basis-px flex-col overflow-y-scroll p-5 pb-7">
            <div
                style={{
                    minHeight: `calc(100% - ${height}px)`,
                }}
            />
            <div className="flex flex-col gap-4" ref={containerRef}>
                {/* This is a hack to make the last message scroll into view */}
                {messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                ))}
            </div>
            <div ref={lastMessageRef} />
            {/* This is a hack to make the last message scroll into view */}
        </div>
    );
}
