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
            callback(note.folderid)
        })
        .catch(error => console.log(error))
}

function handleMembershipBox(e) {
    e.preventDefault();
    console.log('called checkbox');
    console.log(e.target);
}

// function editNoteRequest(event, note, callback) {
//     event.preventDefault();
//     let updatedNote = {};
//     console.log('adding this note:  ',note);
//     if (note.folderid === 1) {
//         updatedNote = {product: note.name, quantity: note.quantity, size: note.size};
//     }
//     else {
//         updatedNote = {cust_name: 'Al Jones', total: note.total, comment: note.content, payment_status: note.paymentStatus, };
//     }
//     console.log('beeeeee',updatedNote);

//     const url = config.API_ENDPOINT + `/api/notes/${note.id}`;
//     console.log('url', url);

//     fetch(url, {
//         method: 'PATCH',
//         headers: {
//             'content-type': 'application/json',
//             'folderid': `${note.folderid}`
//         },
//         body: JSON.stringify(updatedNote)
//     })
//         .then(res => {
//             if (!res) {
//                 res.json().then(error => {
//                     throw error
//                 })
//             }
//             // return res.json()
//         })
//         .then(() => {
//             callback(Number(note.folderid))
//         })
//         .catch(error => console.log(error))
// }

function Note(props) {
    var moment = require('moment');
    const formatTime = moment(props.note.date_published).format('MMMM Do YYYY h:mm a');
    const sortBy = props.note.sortBy;
    console.log('sortBy: ',props.note.sortBy);
    console.log('note name: ', props.note.name);
    console.log('equation: ',props.note.sortBy === props.note.name);

    // If empty string, then true because 'All' is selected;
    // Otherwise, if it's not an empty string and the sorted value equals the name, then it's true
    let sorted = sortBy === ""? true : sortBy === props.note.name;
    console.log(' - - sorted? ', sorted);
    // "pass" is a prop that is passed to this component only if the individual note is being accessed or edited
    //  ... sorted is set to true because no sort is needed so if the note is requested then it should be displayed
    if (props.note.pass) {
        sorted = true;
    }
    if (props.note.folderid === 1) {
        // sorted will be true if this note is to be displayed (which was decided in the "Main.js" component)
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
                            
                            <div className={`button-modify`}>
                                <Link to={{
                                    pathname:'/editInventory',
                                    state: { note: props.note }
                                }}> <button className='note_button'>Edit</button>
                                </Link>
                                
                                {/* <button className="note_button" onClick={(event) => editNoteRequest(event, props.note, context.editNote)}>Edit</button> */}
                                <button className="note_button" onClick={(event) => deleteNoteRequest(event, props.note, context.deleteNote)}>Delete</button>
                            </div>

                            <div className="inc_dec_buttons">
                                <div>{props.note.quantity}</div>
                                <button className="small">+</button>
                                <button className="small">-</button>
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
                                <Link to={{
                                    pathname:'/editPurchase',
                                    state: {
                                        note: props.note
                                    }
                                }}><button className='note_button'>Edit</button></Link>
                            
                            {/* <button onClick={(event) => editNoteRequest(event, props.note, context.editNote)}>Edit</button> */}
                            <button className="note_button" onClick={(event) => deleteNoteRequest(event, props.note, context.deleteNote)}>Delete</button>
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
    else if (props.note.folderid === 3) {
        // sorted will be true if this note is to be displayed (which was decided in the "Main.js" component)
        if (sorted) {
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
                                <Link to={{
                                        pathname:'/editProfile',
                                        state: {
                                            note: props.note
                                        }
                                }}><button className='note_button'>Edit</button></Link>
                                
                                {/* <button className="note_button" onClick={(event) => editNoteRequest(event, props.note, context.editNote)}>Edit</button> */}
                                <button className="note_button" onClick={(event) => deleteNoteRequest(event, props.note, context.deleteNote)}>Delete</button>
                            </div>

                            <div className="radio_buttons">
                                    <label>Membership</label>
                                    <input type="checkbox" checked={true} readonly/>
                                    <label>ER</label>
                                    <input type="checkbox" checked={false} readonly/>
                                    {/* onChange={(e) => handleMembershipBox(e)} checked={false} */}
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
                            {(Number(props.note.folderid) === 1)
                                ? <Link to='/editInventory'><button className='addnote__button'>Add to inventory</button></Link>
                                : <Link to={{
                                    pathname:'/editPurchase',
                                    state: {
                                        note: props.note
                                    }
                                }}><button className='note_button'>Editz00</button></Link>
                            }
                                {/* <button onClick={(event) => editNoteRequest(event, props.note, context.editNote)}>Edit</button> */}
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