export interface Message {
    id: string;
    content: string;
    sendAt: Date;
    wasEdited?: boolean;
    channelId: string;
    isSending?: boolean;
    clientId?: string;
    authorId: string;
}

export interface MessageEdit {
    id: string;
    content: string;
    editAt: string;
}

export interface SerializedMessage extends Message {
    sendAt: string;
}
