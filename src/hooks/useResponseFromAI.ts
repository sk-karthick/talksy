import UserTypes from '@/types/UserTypes';
import useMessageSend from './useMessageSend';

const useResponseFromAI = (selectedUser: UserTypes | null, currentUser: UserTypes | null) => {

    const sendMessage = useMessageSend(currentUser, selectedUser);

    const fetchResponseFromAI = async (message: string) => {
        const getResponse = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: 'user',
                        content: message,
                    },
                ],
            }),
        })
        if (!getResponse.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await getResponse.json();
        sendMessage(data.choices[0].message.content)
    }

    return fetchResponseFromAI
}

export default useResponseFromAI