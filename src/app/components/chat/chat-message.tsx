/* eslint-disable @next/next/no-img-element */
import type { SerializedMessageWithAuthor } from "~/app/_types/message";
import MessageContextMenu from "../context-menus/message.cm";
import Markdown from "react-markdown";

interface Props {
    message: SerializedMessageWithAuthor;
}

export default function ChatMessage({ message }: Props) {
    let media = null;

    //  TODO: Turn this into a custom markdown component
    // if (message.content.startsWith("https://c.tenor.com/")) {
    //     media = (
    //         <img
    //             src={message.content}
    //             className="mt-2 aspect-auto h-56 rounded-lg"
    //         />
    //     );
    // }

    return (
        <MessageContextMenu message={message}>
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
                <div className={message.isSending ? "opacity-50" : ""}>
                    <div className="flex flex-row items-center gap-1 font-semibold text-red-600">
                        {message.author.name}
                        <span className="align-baseline text-xs font-normal leading-5 text-gray-400">
                            {new Date(message.sendAt).toLocaleTimeString()}
                        </span>
                    </div>
                    <div
                        className="text-base text-stone-600"
                        style={{ wordBreak: "break-word" }}
                    >
                        <Markdown className={"markdown"}>
                            {message.content}
                        </Markdown>
                    </div>
                </div>
            </div>
        </MessageContextMenu>
    );
}
