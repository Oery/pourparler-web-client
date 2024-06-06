import type { Message } from '@lib/types/message';
import { formatMessage } from '@lib/utils/message';
import { appStateSelector } from '@stores/app-state';
import { membersSelector } from '@stores/members';
import ChatMessageEditor from '@ui/chat/chat-message-editor';
import MessageContextMenu from '@ui/context-menus/message.cm';
import { useState, useMemo, useCallback } from 'react';
import Markdown from 'react-markdown';
import { useSelector } from 'react-redux';

interface Props {
    message: Message;
}

export default function ChatMessage({ message }: Props) {
    const [isEditing, setIsEditing] = useState(false);
    const { user } = useSelector(appStateSelector);

    const handleDoubleClick = useCallback(() => {
        console.log('double click');
        console.log(message.authorId, user?.id);
        if (message.authorId === user?.id) setIsEditing(true);
    }, [message, user]);

    const author = useSelector(membersSelector).find(
        (user) => user.id === message.authorId,
    );

    const dateString = useMemo(() => {
        return new Date(message.sendAt).toLocaleTimeString();
    }, [message.sendAt]);

    return (
        <MessageContextMenu message={message}>
            <div className='flex flex-row gap-4 first:mt-auto'>
                <aside>
                    <img
                        className='h-10 min-w-10 rounded-full'
                        src={author?.avatarUrl}
                        alt={author?.displayName}
                        width={40}
                        height={40}
                    />
                </aside>
                <div
                    className={`w-full ${message.isSending ? 'opacity-50' : ''}`}
                >
                    <div className='flex flex-row items-center gap-1 font-semibold text-red-600'>
                        {author?.displayName ?? 'Unknown User'}
                        <span className='align-baseline text-xs font-normal leading-5 text-gray-400'>
                            {dateString}
                        </span>
                    </div>
                    {isEditing ? (
                        <ChatMessageEditor
                            message={message}
                            setIsEditing={setIsEditing}
                        />
                    ) : (
                        <div
                            className='text-base text-stone-600'
                            style={{ wordBreak: 'break-word' }}
                            onDoubleClick={handleDoubleClick}
                        >
                            <Markdown
                                className={'markdown whitespace-pre-wrap'}
                            >
                                {formatMessage(message.content)}
                            </Markdown>
                            {message.updatedAt &&
                                message.updatedAt !== message.sendAt && (
                                    <span className='text-xs text-stone-500 dark:text-stone-400'>
                                        Edited at{' '}
                                        {new Date(
                                            message.updatedAt,
                                        ).toLocaleTimeString()}
                                    </span>
                                )}
                        </div>
                    )}
                </div>
            </div>
        </MessageContextMenu>
    );
}
