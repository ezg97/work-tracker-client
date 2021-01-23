import React from 'react'
import { Link } from 'react-router-dom';
import './MainWithNoteSelected.css'
import Note from '../Note/Note'
import ApiContext from '../ApiContext'
import config from '../config'

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

     deleteNoteRequest = (event, note, callback) => {
        event.preventDefault();
        const noteId = note.id;
        console.log(noteId);
        const url = config.API_ENDPOINT + `/api/notes/${noteId}`;
        fetch(url, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'folderid': `${note.folderid}`
            }
        })
            .then(res => {
                if (!res) {
                    res.json().then(error => {
                        throw error
                    })
                }
                // return res.json()
            })
            .then(() => {
                callback(note.folderid)
            })
            .catch(error => console.log(error))
    }


    render() {
        const noteId = this.props.match.params.noteId;
        const folderId = this.props.match.params.folderId;
        let notes = [];
        if (Number(folderId) === 1) {
            notes = this.context.inventory;
        }
        else if (Number(folderId) === 2) {
            notes = this.context.transactions;
        }
        else if (Number(folderId) === 3) {
            notes = this.context.profiles;
        }

        const selectedNote = notes.find(note => {
            if (note.id === Number(noteId) && note.folderid === Number(folderId)) {
                console.log('the NOTE: ',note);
                return note;
            }
        }) || {};

        if(selectedNote.folderid === 3) {
            return (
                <div className="main__container">
                    <div className="main__wholeNote">
                        <Note key={selectedNote.id} note={ {...selectedNote, pass: true} } />
                        <table>
                            <tr>
                                <th>Email</th>
                                <th>Phone Number</th>
                            </tr>
                            <tr>
                                <td>{selectedNote.email}</td>
                                <td>{selectedNote.phone}</td>
                            </tr>
                        </table>
                    </div>
                    <div className={`button-modify`}>
                                <Link to={{
                                    pathname:'/editProfile',
                                    state: { note: selectedNote }
                                }}> <button className='note_button'>Edit</button>
                                </Link>
                                
                                {/* <button className="note_button" onClick={(event) => editNoteRequest(event, props.note, context.editNote)}>Edit</button> */}
                                <button className="note_button" onClick={(event) => this.deleteNoteRequest(event, selectedNote, this.context.deleteNote)}>Delete</button>
                    </div>
                </div>  
            )
        }
        else if(selectedNote.folderid === 2) {
            console.log('testing testing: ',selectedNote)
            return (
                <div className="main__container">
                    <div className="main__wholeNote">
                        {/* This component and main both call "Note" component
                            passing the sorting results to the Note is important to know what to display
                            Since no sorting is needed here, pass the "pass" variable initialized to "true"
                            to avoid any "sorting" criteria */}
                        <Note key={selectedNote.id} note={ {...selectedNote, pass: true}} />
                        <table>
                            <tr>
                                <th>Notes</th>
                            </tr>
                            <tr>
                                <td>{selectedNote.content}</td>
                            </tr>
                        </table>
                    </div>
                    <div className={`button-modify`}>
                                <Link to={{
                                    pathname:'/editPurchase',
                                    state: { note: selectedNote }
                                }}> <button className='note_button'>Edit</button>
                                </Link>
                                
                                {/* <button className="note_button" onClick={(event) => editNoteRequest(event, props.note, context.editNote)}>Edit</button> */}
                                <button className="note_button" onClick={(event) => this.deleteNoteRequest(event, selectedNote, this.context.deleteNote)}>Delete</button>
                    </div>
                </div>  
            )
        }
        else if(selectedNote.folderid === 1) {
            return (
                <div className="main__container">
                    <div className="main__wholeNote">
                        <Note key={selectedNote.id} note={{...selectedNote, pass: true}} />
                        <table>
                            <tr>
                                <th>Quantity</th>
                                <th>Size</th>
                            </tr>
                            <tr>
                                <td>{selectedNote.quantity}</td>
                                <td>{selectedNote.size}</td>
                            </tr>
                        </table>
                    </div>
                    <div className={`button-modify`}>
                                <Link to={{
                                    pathname:'/editInventory',
                                    state: { note: selectedNote }
                                }}> <button className='note_button'>Edit</button>
                                </Link>
                                
                                {/* <button className="note_button" onClick={(event) => editNoteRequest(event, props.note, context.editNote)}>Edit</button> */}
                                <button className="note_button" onClick={(event) => this.deleteNoteRequest(event, selectedNote, this.context.deleteNote)}>Delete</button>
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