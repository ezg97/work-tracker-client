import React from 'react';

import ApiContext from '../ApiContext'
import ValidationError from '../ValidationError'

import './AddNote.css'
import config from '../config'

class AddNote extends React.Component {
    /*
    SET STATE
    */
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: '',
                touched: false
            },
            folderId: {
                value: '',
                touched: false
            },
            content: {
                value: '',
                touched: false
            },
            error: false
        }
    }

    static contextType = ApiContext;

    getFolderFromNote(noteId) {
        const note = this.context.notes.find(note => note.id === Number(noteId));
        const folder = this.context.folders.find(folder => folder.id === note.folderId);
        return folder;
    }

    updateNoteName(name) {
        this.setState({name: {value: name, touched: true}})
    }

    updateFolderId(folderId) {
        this.setState({folderId: {value: folderId, touched: true}})
    }

    updateContent(content) {
        this.setState({content: {value: content, touched: true}})
    }

    handleSubmit(event) {
        var moment = require('moment');
        const now = moment().format();
        event.preventDefault();
        const note = {
            name: this.state.name.value,
            modified: now,
            folderId: this.state.folderId.value,
            content: this.state.content.value,
        }
        const url = config.API_ENDPOINT + "/api/notes";
        fetch(url, {
            method:"POST",
            body: JSON.stringify(note),
            headers: {
                "Content-Type": "application/json"
        }})
        .then(res => {
            if (!res.ok) {
                res.json().then(error => {
                    throw error
                })
            }
            return res.json()
        })
        .then(data => {
            this.setState({
                name: {
                    value: '',
                    touched: false
                },
                folderId: {
                    value: '',
                    touched: false
                },
                content: {
                    value: '',
                    touched: false
                },
            })
            this.context.createNote(data)
        })
        .catch(err => {
            this.setState({
                error: err.message
            })
        })
    }

    validateNoteName() {
        const name = this.state.name.value.trim();
        if (name.length === 0) {
            return "Note name is required."
        }
    }

    validateFolderId() {
        const folderId = this.state.folderId.value.trim();
        if (folderId.length === 0) {
            return "Folder name is required."
        }
    }

    validateContent() {
        const content = this.state.content.value.trim();
        if (content.length === 0) {
            return "Folder name is required."
        }
    }

    render() {
        const nameError = this.validateNoteName();
        const folderIdError = this.validateFolderId();
        const contentError = this.validateContent();

        return (
            <form className="addnote" onSubmit={(e) => this.handleSubmit(e)}>
                <h2>Add Note</h2>
                <div className="form-group">
                    <label htmlFor="name">Note Name:</label>{" "}
                    <input 
                        type="text"
                        className="addnote__control"
                        name="name"
                        id="name"
                        value={this.state.name.value}
                        onChange={e => this.updateNoteName(e.target.value)}
                        />
                        {this.state.name.touched && <ValidationError message={nameError} />}
                </div>
                <div className="form-group">
                    <label htmlFor="folderId">Folder Name: </label>{" "}
                    <select
                        className="addnote__control"
                        name="folderId"
                        id="folderId"
                        onChange={e => this.updateFolderId(e.target.value)}>
                            <option value="None">Select Folder</option>
                        {this.context.folders.map(folder => {
                            return (
                                <option key={folder.id} value={folder.id}>{folder.foldername}</option>
                            )
                        })}
                    </select>
                        {this.state.folderId.touched && <ValidationError message={folderIdError} />}
                </div>
                <div className="form-group note-content">
                    <textarea 
                        rows="5"
                        cols="30"
                        className="addnote__control"
                        name="content"
                        id="content"
                        value={this.state.content.value}
                        placeholder="A long time ago in a galaxy far, far away..."
                        onChange={e => this.updateContent(e.target.value)}
                        />
                        {this.state.content.touched && <ValidationError message={contentError} />}
                </div>
                <div className="addnote__button__group">
                   
                    <button 
                        type="submit"
                        className="addnote__button"
                        disabled={
                            this.validateNoteName() ||
                            this.validateFolderId() ||
                            this.validateContent()
                        }
                    >
                        Save
                    </button>
                </div>
            </form>
        )
    }
}

export default AddNote;