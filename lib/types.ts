export interface BaseRecord {
    id: string;
    created: string;
    updated: string;
}

export interface User extends BaseRecord {
    email: string;
}

export interface Message extends BaseRecord {
    content: string;
    sender: string;
    expand: {
        sender: User;
    };
}
