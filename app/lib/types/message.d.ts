export interface Message {
    id: string;
    content: string;
    sendAt: string;
    updatedAt?: string | null;
    channelId: string;
    isSending?: boolean;
    clientId?: string;
    authorId: string;
}
