"use client";

import ChatInput from "./chat-input";
import ChatMessageContainer from "./chat-message-container";
import type { MessageWithAuthor, ChannelWithMessages } from "./definitions";

interface Props {
    channel: ChannelWithMessages;
}

export default function Chat({ channel }: Props) {
    const [messages, setMessages] = useState<MessageWithAuthor[]>(
        channel.messages,
    );

    return (
        <div className="flex grow flex-col">
            <ChatMessageContainer messages={messages} />
            <ChatInput />
        </div>
    );
}
