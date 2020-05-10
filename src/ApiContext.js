import React from 'react';

const ApiContext = React.createContext({
    notes: [],
    folders: [],
    deleteNote: () => {},
    createFolder: () => {},
    createNote: () => {},
})

export default ApiContext;