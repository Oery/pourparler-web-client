'use client';

import type { SerializedMessage } from '@lib/types/message';
import ChatMessage from '@ui/chat/chat-message';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

interface Props {
    messages: SerializedMessage[];
}

export default function ChatMessageContainer({ messages }: Props) {
    const lastMessageRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [messagesLength, setMessagesLength] = useState(messages.length);
    const [isBottom, setIsBottom] = useState(true);
    const path = usePathname();

    const scrollToBottom = (smooth = true) => {
        if (!lastMessageRef.current) return;

        containerRef.current?.scrollTo({
            top: containerRef.current.scrollHeight + 1000000,
            behavior: smooth ? 'smooth' : 'auto',
        });

        // Work around to scroll again after an image loads
        // Could be fixed by setting a heigh in the markdown img
        setTimeout(() => {
            containerRef.current?.scrollTo({
                top: containerRef.current.scrollHeight + 1000,
                behavior: smooth ? 'smooth' : 'auto',
            });
        }, 100);
    };

    const handleScroll = () => {
        if (!containerRef.current) return;
        const { scrollHeight, scrollTop, clientHeight } = containerRef.current;
        // +50 Makes it so the user doesn't have to be pixel perfect to anchor
        const newIsBottom = scrollTop + clientHeight + 50 >= scrollHeight;
        if (isBottom !== newIsBottom) setIsBottom(newIsBottom);
    };

    useEffect(() => {
        if (messages.length > messagesLength) {
            if (isBottom) scrollToBottom();
            setMessagesLength(messages.length);
        }
    }, [isBottom, messages, messagesLength]);

    useEffect(() => {
        scrollToBottom(false);
    }, [path]);

    return (
        <div
            className='scrollbar-hide relative flex grow basis-px flex-col overflow-y-scroll p-5 pb-7'
            onWheel={handleScroll}
            ref={containerRef}
        >
            <div className='flex flex-col gap-4'>
                {messages.map((message) => (
                    <ChatMessage
                        key={message.id ?? message.clientId}
                        message={message}
                    />
                ))}
                <div ref={lastMessageRef} />
            </div>
        </div>
    );
}
