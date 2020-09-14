import React from 'react';

const ApiContext = React.createContext({
    notes: [],
    folders: [],
    deleteNote: () => {},
    createFolder: () => {},
    createNote: () => {},
    editNote: () => {},
})

export default ApiContext;