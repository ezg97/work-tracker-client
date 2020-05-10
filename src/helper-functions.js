const getNotesForFolder = (notes=[], folderId) => (
    (!folderId) ? notes : notes.filter(note => note.folderId === folderId)
)