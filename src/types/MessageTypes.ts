export default interface Message {
    created_at: string | number | Date;
    id: string;
    conversation_id: string;
    sender_id: string;
    receiver_id: string;
    content: string;
    message_type: string;
    status: string;
    typing_status: 'typing' | 'paused' | 'stopped';
    updated_at: string | number | Date;
}