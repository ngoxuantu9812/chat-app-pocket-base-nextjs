'use client'
const Messages = ({messages} : any) => {
    if (!messages || !messages.length) {
        return  null;
    }
    return messages?.map((msg : any) => (
        <p key={msg?.id}>
            <strong>{msg?.expand?.sender?.email}</strong>: {msg?.content}
        </p>
    ))
}

export default Messages