import { useState, useEffect, FormEvent } from 'react';
import pb from '../../lib/pocketbase';
import { useAuth } from '../../hooks/useAuth';
import { Message } from '../../lib/types';

export default function Chat() {
    const { user, logout } = useAuth();
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            const records = await pb.collection('messages').getFullList<Message>({
                expand: 'sender',
            });
            setMessages(records);
        };

        fetchMessages();

        pb.collection('messages').subscribe('*', () => {
            fetchMessages();
        });

        return () => {
            pb.collection('messages').unsubscribe('*');
        };
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await pb.collection('messages').create({
            content: newMessage,
            sender: user?.id,
        });
        setNewMessage('');
    };

    if (!user) return <div>Please log in to see the chat</div>;

    return (
        <>
            {/*<button onClick={logout}>Logout</button>*/}
            {/*<div>*/}
            {/*    {messages.map((msg) => (*/}
            {/*        <div key={msg.id}>*/}
            {/*            <strong>{msg.expand.sender.email}</strong>: {msg.content}*/}
            {/*        </div>*/}
            {/*    ))}*/}
            {/*</div>*/}
            {/*<form onSubmit={handleSubmit}>*/}
            {/*    <input*/}
            {/*        type="text"*/}
            {/*        value={newMessage}*/}
            {/*        onChange={(e) => setNewMessage(e.target.value)}*/}
            {/*        placeholder="Type a message"*/}
            {/*        required*/}
            {/*    />*/}
            {/*    <button type="submit">Send</button>*/}
            {/*</form>*/}
        </>
    );
}
