import { useCallback, useEffect, useState } from "react";
import { useSocket } from "~/app/context/use-socket";
import TypingDots from "./chat-typing-dots";

function getTypingString(usersTyping: TypingUser[]) {
    switch (usersTyping.length) {
        case 0:
            return "";
        case 1:
            return `${usersTyping[0]?.name} is typing`;
        case 2:
            return `${usersTyping[0]?.name} and ${usersTyping[1]?.name} are typing`;
        default:
            return "Multiple users are typing";
    }
}

interface TypingUser {
    name: string;
    channel: string;
}

interface Props {
    channelId: string;
}

export default function ChatTypingIndicator({ channelId }: Props) {
    const [usersTyping, setUsersTyping] = useState<TypingUser[]>([]);
    const [typingString, setTypingString] = useState("");

    const socket = useSocket();

    const handleUserStartTyping = useCallback(
        (user: TypingUser) => {
            if (usersTyping.includes(user)) return;
            setUsersTyping((prev) => [...prev, user]);
        },
        [usersTyping],
    );

    const handleUserStopTyping = (user: TypingUser) => {
        setUsersTyping((prev) => prev.filter((u) => u.name !== user.name));
    };

    useEffect(() => {
        if (!socket) return;

        socket.on("typing:start", handleUserStartTyping);
        socket.on("typing:stop", handleUserStopTyping);

        return () => {
            socket?.off("typing:start");
            socket?.off("typing:stop");
        };
    }, [handleUserStartTyping, socket]);

    useEffect(() => {
        const filteredUsers = usersTyping.filter((u) => u.channel == channelId);
        const newTypingString = getTypingString(filteredUsers);
        if (newTypingString.length > 0) setTypingString(newTypingString);
    }, [channelId, usersTyping]);

    return (
        <div
            className={`absolute bottom-14 z-0 w-full transition-transform ${usersTyping.filter((u) => u.channel == channelId).length > 0 ? "translate-y-0" : "translate-y-10"}`}
        >
            <p className="h-7 w-full rounded-md bg-stone-200 px-2 text-sm text-stone-600">
                {typingString}
                <TypingDots />
            </p>
        </div>
    );
}
