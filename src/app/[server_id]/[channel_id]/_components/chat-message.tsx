/* eslint-disable @next/next/no-img-element */

interface Props {
    message: SerializedMessageWithAuthor;
}

export default function ChatMessage({ message }: Props) {
    return (
        <div className="flex flex-row gap-4 first:mt-auto">
            <aside>
                <img
                    className="h-10 min-w-10 rounded-full"
                    src={message.author.avatarUrl}
                    alt={message.author.name}
                    width={40}
                    height={40}
                />
            </aside>
            <div>
                <div className="flex flex-row items-center gap-1 font-semibold text-red-600">
                    {message.author.name}
                    <span className="align-baseline text-xs font-normal leading-5 text-gray-400">
                        {new Date(message.sendAt).toLocaleTimeString()}
                    </span>
                </div>
                <div className="overflow-hidden text-base text-stone-600">
                    {message.content}
                </div>
            </div>
        </div>
    );
}
