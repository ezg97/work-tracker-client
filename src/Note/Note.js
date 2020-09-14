import React from 'react';
import { Link } from 'react-router-dom';
import './Note.css';
import ApiContext from '../ApiContext'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import config from '../config'

function deleteNoteRequest(event, note, callback) {
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
            callback(noteId)
        })
        .catch(error => console.log(error))
}

function editNoteRequest(event, note, callback) {
    event.preventDefault();
    let updatedNote = {};
    console.log('adding this note:  ',note);
    if (note.folderid === 1) {
        updatedNote = {product: note.name, quantity: note.quantity, size: note.size};
    }
    else {
        updatedNote = {cust_name: note.name, total: note.total, comment: note.content, paymentStatus: note.paymentStatus, };
    }
    console.log('beeeeee',updatedNote);

    const url = config.API_ENDPOINT + `/api/notes/${note.id}`;
    console.log('url', url);

    fetch(url, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            'folderid': `${note.folderid}`
        },
        body: JSON.stringify(updatedNote)
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
            callback(note.id)
        })
        .catch(error => console.log(error))
}

function Note(props) {
    var moment = require('moment');
    const formatTime = moment(props.note.date_published).format('MMMM Do YYYY h:mm a');
    const sortBy = props.note.sortBy;
    console.log('sortBy: ',props.note.sortBy);
    console.log('note name: ', props.note.name);
    console.log('equation: ',props.note.sortBy === props.note.name);

    // If empty string, then true because 'All' is selected;
    // Otherwise, if it's not an empty string and the sorted value equals the name, then it's true
    const sorted = sortBy === ""? true : sortBy === props.note.name;
    console.log(' - - sorted? ', sorted);
    if (props.note.folderid === 1) {
        if (sorted) {
        return (
            <ApiContext.Consumer>
                {(context) => {
                    return (
                    <div className="note">
                        {/* {console.log('test', props.note)} */}
                        {/* <div>
                            <select>
                                {}
                                <option></option>
                            </select>
                        </div> */}
                        <div className={"note-header"}>
                            <Link to={`/note/${props.note.id}/${props.note.folderid}`} className='note__link'>
                                <h3>{props.note.name}</h3> 
                            </Link>
                            {props.note.folderid === 1
                                ? <div className="inc_dec_buttons">
                                    <div>{props.note.quantity}</div>
                                    <button className="small">+</button>
                                    <button className="small">-</button>
                                </div>
                                : null
                            }
                            <div className={`button-modify`}>
                            <button className="note_button" onClick={(event) => editNoteRequest(event, props.note, context.editNote)}>Edit</button>
                            <button className="note_button" onClick={(event) => deleteNoteRequest(event, props.note, context.deleteNote)}>Delete</button>

                            </div>
                        </div>
                    </div>
                    )
                }}
            </ApiContext.Consumer>
        )
        }
        else{
            return(null);
        }
    }
    else if (props.note.folderid === 2) {
        if (sorted) {
        return(
        <ApiContext.Consumer>
                {(context) => {
                    return (
                    <div className="note">
                        <div className={"note-header"}>
                            <Link to={`/note/${props.note.id}/${props.note.folderid}`} className='note__link'>
                                <h3>{props.note.name}</h3> 
                            </Link>
                            <div className={`button-modify`}>
                            <button onClick={(event) => editNoteRequest(event, props.note, context.editNote)}>Edit</button>
                            <button onClick={(event) => deleteNoteRequest(event, props.note, context.deleteNote)}>Delete</button>
                            </div>
                        </div>
                        <p>{props.note.paymentStatus}</p>
                        <p>${props.note.total}</p>
                        <p>{formatTime}</p>
                        
                    </div>
                    )
                }}
            </ApiContext.Consumer>
        )
        }
        else{
            return(null);
        }
    }
    else{
        return (
            <ApiContext.Consumer>
                {(context) => {
                    return (
                    <div className="note">
                        <div className={"note-header"}>
                            <Link to={`/note/${props.note.id}/${props.note.folderid}`} className='note__link'>
                                <h3>{props.note.name}</h3> 
                            </Link>
                            <div className={`button-modify`}>
                                <button onClick={(event) => editNoteRequest(event, props.note, context.editNote)}>Edit</button>
                                <button onClick={(event) => deleteNoteRequest(event, props.note, context.deleteNote)}>Delete</button>

                            </div>
                        </div>
                        <p>{formatTime}</p>
                       
                    </div>
                    )
                }}
            </ApiContext.Consumer>
        )
    }
   
}

export default withRouter(Note);

Note.propTypes = {
    note: PropTypes.object,
}