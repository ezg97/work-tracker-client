import React from 'react'
import './MainWithNoteSelected.css'
import Note from '../Note/Note'
import ApiContext from '../ApiContext'

class MainWithNoteSelected extends React.Component {
    static defaultProps = {
        match: {
            params:{
                noteId: "",
                folderId: ""
            }
        }
    }
    static contextType = ApiContext;
    render() {
        const noteId = this.props.match.params.noteId;
        const folderId = this.props.match.params.folderId;
        const selectedNote = this.context.notes.find(note => {
            if (note.id === Number(noteId) && note.folderid === Number(folderId)) {
                return note;
            }
        }) || {};
        if(selectedNote.folderid === 2) {
            console.log('testing testing: ',selectedNote)
            return (
                <div className="main__container">
                    <div className="main__notelist">
                        {/* This component and main both call "Note" component
                            passing the sorting results to the Note is important to know what to display
                            Since no sorting is needed here, pass the "pass" variable initialized to "true"
                            to avoid any "sorting" criteria */}
                        <Note key={selectedNote.id} note={ {...selectedNote, pass: true}} />
                        <h3>Notes: <br/> {selectedNote.content} </h3>
                    </div>
                </div>  
            )
        }
        else if(selectedNote.folderid === 1) {
            return (
                <div className="main__container">
                    <div className="main__notelist">
                        <Note key={selectedNote.id} note={selectedNote} />
                        <h3>Quantity: <br/>{selectedNote.quantity} </h3>
                        <h3>Size: <br/> {selectedNote.size} </h3>
                    </div>
                </div>  
            )
        }
        else{
            return (<div></div>)
        }
    
    }
}

export default MainWithNoteSelected;