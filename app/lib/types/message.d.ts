export interface Message {
    id: string;
    content: string;
    sendAt: string;
    updatedAt?: string | null;
    channelId: string;
    status: 'sent' | 'sending' | 'error';
    clientId?: string;
    authorId: string;
}
