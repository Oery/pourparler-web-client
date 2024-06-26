'use client';

import type { Message } from '@lib/types/message';
import { appStateSelector } from '@stores/app-state';
import {
    addMessage,
    editMessage,
    errorMessage,
    messagesSelector,
    removeMessage,
} from '@stores/messages';
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
            dispatch(addMessage(message));
        },
        [dispatch],
    );

    const handleMessageEdit = useCallback(
        (message: Message) => {
            dispatch(editMessage(message));
        },
        [dispatch],
    );

    const handleMessageDeletion = useCallback(
        (messageId: string) => dispatch(removeMessage(messageId)),
        [dispatch],
    );

    const handleMessageSendError = useCallback(
        (data: { error: string; clientId: string }) => {
            const { clientId } = data;
            console.log('Failed to send message', data);
            dispatch(errorMessage(clientId));
        },
        [dispatch],
    );

    useEffect(() => {
        if (!socket) return;
        socket.on('message:send', handleMessageReception);
        socket.on('message:send:error', handleMessageSendError);
        socket.on('message:delete', handleMessageDeletion);
        socket.on('message:edit', handleMessageEdit);

        return () => {
            socket.off('message:send');
            socket.off('message:send:error');
            socket.off('message:delete');
            socket.off('message:edit');
        };
    }, [
        socket,
        handleMessageReception,
        handleMessageDeletion,
        handleMessageEdit,
        handleMessageSendError,
    ]);

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
