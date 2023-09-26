import React from 'react';

const Messages = () => {
    const messages = [
        { id: 1, text: 'Hello, how can I help you?' },
        { id: 2, text: 'Please send me more information.' },
    ];

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Messages</h1>
            <ul>
                {messages.map((message) => (
                    <li key={message.id} className="mb-2">
                        {message.text}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Messages;
