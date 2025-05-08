import Message from '@/types/MessageTypes';
import UserTypes from '@/types/UserTypes';
import { RefObject, useEffect } from 'react'


interface UseAutoScrollProps {
    chatContainerRef: RefObject<HTMLDivElement | null>;
    messages: Message[] | null;
    selectedUser: UserTypes | null;
}

const UseAutoScroll = ({ chatContainerRef, messages, selectedUser }: UseAutoScrollProps): void => {
    useEffect(() => {
        const container = chatContainerRef?.current;
        if (!container) return;

        requestAnimationFrame(() => {
            container.scrollTo({
                top: container.scrollHeight,
                behavior: 'smooth',
            });
        });
    }, [messages, selectedUser, chatContainerRef]);
}

export default UseAutoScroll