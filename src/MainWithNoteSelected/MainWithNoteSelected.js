import React from 'react'
import './MainWithNoteSelected.css'
import Note from '../Note/Note'
import ApiContext from '../ApiContext'

class MainWithNoteSelected extends React.Component {
    static defaultProps = {
        match: {
            params:{
                noteId: ""
            }
        }
    }
    static contextType = ApiContext;
    render() {
        const noteId = this.props.match.params.noteId;
        const selectedNote = this.context.notes.find(note => note.id === Number(noteId)) || {}
        return (
            <div className="main__container">
                <div className="main__notelist">
                    <Note key={selectedNote.id} note={selectedNote} />
                    <p> {selectedNote.content} </p>
                </div>
            </div>  
        )
    }
}

export default MainWithNoteSelected;