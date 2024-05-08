"use client";

import ChatMessage from "./chat-message";
import { type MessageWithAuthor } from "./definitions";

interface Props {
    messages: MessageWithAuthor[];
}

export default function ChatMessageContainer({ messages }: Props) {
    return (
        <div className="scrollbar-hide flex grow basis-px flex-col gap-4 overflow-y-scroll p-5">
            {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
            ))}
        </div>
    );
}
