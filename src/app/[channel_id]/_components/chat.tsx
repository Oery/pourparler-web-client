import { db } from "~/server/db";
import ChatInput from "./chat-input";
import ChatMessageContainer from "./chat-message-container";
import { type MessageWithAuthor, type Channel } from "./definitions";

interface Props {
    channel: Channel;
}

export default async function Chat({ channel }: Props) {
    const messages: MessageWithAuthor[] = await db.query.messages.findMany({
        where: (messages, { eq }) => eq(messages.channelId, channel.id),
        with: {
            author: true,
        },
    });

    return (
        <div className="flex grow flex-col">
            <ChatMessageContainer messages={messages} />
            <ChatInput />
        </div>
    );
}
