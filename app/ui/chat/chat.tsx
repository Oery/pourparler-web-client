'use client';

import type { Message } from '@lib/types/message';
import { serializeMessage } from '@lib/utils/message';
import { appStateSelector } from '@stores/app-state';
import { addMessage, messagesSelector, removeMessage } from '@stores/messages';
import { useSocket } from '@stores/use-socket';
import ChatInput from '@ui/chat/chat-input';
import ChatMessageContainer from '@ui/chat/chat-message-container';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
    channelId: string;
}

export default function Chat({ channelId }: Props) {
    const socket = useSocket();
    const messages = useSelector(messagesSelector);
    const { session } = useSelector(appStateSelector);
    const dispatch = useDispatch();

    const channelMessages = messages.filter(
        (message) => message.channelId == channelId,
    );

    const handleMessageReception = useCallback(
        (message: Message) => {
            const serializedMessage = serializeMessage(message);
            dispatch(addMessage(serializedMessage));
        },
        [dispatch],
    );

    const handleMessageDeletion = useCallback(
        (messageId: string) => dispatch(removeMessage(messageId)),
        [dispatch],
    );

    useEffect(() => {
        if (!socket) return;
        socket.on('message:send', handleMessageReception);
        socket.on('message:delete', handleMessageDeletion);

        return () => {
            socket.off('message:send');
            socket.off('message:delete');
        };
    }, [socket, handleMessageReception, handleMessageDeletion]);

    useEffect(() => {
        if (!socket || !session) return;
        socket.emit('user:auth', {
            sessionId: session.id,
            userId: session.userId,
        });
    }, [socket, session]);

    return (
        <div className='flex grow flex-col'>
            <ChatMessageContainer messages={channelMessages} />
            <ChatInput channelId={channelId} />
        </div>
    );
}
