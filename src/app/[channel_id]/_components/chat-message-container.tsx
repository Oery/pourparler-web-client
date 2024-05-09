"use client";

import { useEffect, useRef } from "react";
import ChatMessage from "./chat-message";
import { type MessageWithAuthor } from "./definitions";

interface Props {
    messages: MessageWithAuthor[];
}

export default function ChatMessageContainer({ messages }: Props) {
    const lastMessageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="scrollbar-hide flex grow basis-px flex-col overflow-y-scroll p-5 pb-7">
            <div className="flex flex-col gap-4">
                <div className="h-screen" />{" "}
                {/* This is a hack to make the last message scroll into view */}
                {messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                ))}
            </div>
            <div ref={lastMessageRef} />{" "}
            {/* This is a hack to make the last message scroll into view */}
        </div>
    );
}
