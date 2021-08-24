export const User = {
    name: 'User',
    path: 'Users',
    properties: {
        uid: 'string',
        name: 'string',
        email: 'string',
        password: 'string',
        uri: 'string?',
    }
};

export const Contact = {
    name: "Contact",
    path: 'Contacts',
    properties: {
        uid: 'string',
        id: { type: 'int', default: 0 },
        date: 'date',
        designation: "string",
        email: "string",
        fName: "string",
        image: "string",
        lName: "string",
        mobile: "string"
    }
};