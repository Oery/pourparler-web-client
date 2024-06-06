import type { Message } from '@lib/types/message';
import { useSocket } from '@stores/use-socket';
import { useState } from 'react';

interface Props {
    message: Message;
    setIsEditing: (isEditing: boolean) => void;
}

export default function ChatMessageEditor({ message, setIsEditing }: Props) {
    const [editedMessage, setEditedMessage] = useState(message.content);
    const socket = useSocket();

    const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (!(e.key === 'Enter' && !e.shiftKey)) return;
        if (!(e.key === 'Enter') || !socket) return;
        e.preventDefault();
        setIsEditing(false);

        if (!editedMessage || editedMessage === message.content) return;

        socket?.emit('message:edit', {
            id: message.id,
            content: editedMessage,
        });
    };

    return (
        <textarea
            autoFocus
            className='w-full mt-2 outline-none rounded-lg border-none p-2 resize-none bg-stone-100'
            value={editedMessage}
            onChange={(e) => setEditedMessage(e.target.value)}
            onKeyDown={handleEnter}
            onBlur={() => setIsEditing(false)}
        />
    );
}
