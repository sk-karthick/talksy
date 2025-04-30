export default interface Message {
    id: string;
    conversation_id: string;
    sender_id: string;
    receiver_id: string;
    content: string;
    message_type: string;
    status: string;
    typing_status: 'typing' | 'paused' | 'stopped';
    createdAt: Date;
    updatedAt: Date;
}