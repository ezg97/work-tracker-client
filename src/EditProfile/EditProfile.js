import React from 'react';
import { withRouter } from 'react-router-dom';


import ApiContext from '../ApiContext';
import ValidationError from '../ValidationError';

import config from '../config';
import Note from '../Note/Note';

class EditProfile extends React.Component {
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
            email: {
                value: '',
                touched: false
            },
            phone: {
                value: '',
                touched: false
            },
            membership: {
                value: false,
                touched: false
            },
            er: {
                value: false,
                touched: false
            },
            content: {
                value: "",
                touched: false
            },
            note: {},
            error: false
        }
    }

    static contextType = ApiContext;

    componentDidMount () {
        const { note } = this.props.location.state;
        console.log('BELOW v=');
        console.log(note);
        console.log(console.table(note));
        this.setState({
            name: {
                value: note.name,
                touched: false
            },
            email: {
                value: note.email,
                touched: false
            },
            phone: {
                value: note.phone,
                touched: false
            },
            membership: {
                value: note.membership,
                touched: false
            },
            er: {
                value: note.er,
                touched: false
            },
            content: {
                value: note.content,
                touched: false
            },
            note: note,
            error: false
        });
        console.log('data is here', note);
        
    }

    editNoteRequest = (callback) => {
        var moment = require('moment');
        const now = moment().format();
        let updatedNote = {};
        console.log('id',this.state.note.id)

        updatedNote = {
            cust_name: this.state.name.value,
            modified: now,
            email: this.state.email.value,
            phone: this.state.phone.value,
            membership: this.state.membership.value,
            er: this.state.er.value,
            comment: this.state.content.value,
        };
        
        console.log('beeeeee',updatedNote);
    
        const url = config.API_ENDPOINT + `/api/notes/${this.state.note.id}`;
        console.log('url', url);
    
        fetch(url, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'folderid': `3`
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
                callback(3)
            })
            .catch(error => console.log(error))
    }

    updateNoteName(name) {
        this.setState({name: {value: name, touched: true}})
    }

    updateModified(modified) {
        this.setState({modified: {value: modified, touched: true}})
    }

    updateEmail(email) {
        this.setState({email: {value: email, touched: true}})
    }

    updatePhone(phone) {
        this.setState({phone: {value: phone, touched: true}})
    }

    updateMembership(membership) {
        this.setState({membership: {value: membership, touched: true}})
    }

    updateEr(er) {
        this.setState({er: {value: er, touched: true}})
    }

    updateContent(content) {
        this.setState({content: {value: content, touched: true}})
    }

    handleSubmit(event, callback) {
        event.preventDefault();

        this.editNoteRequest(callback);
    }

    validateNoteName() {
        const name = this.state.name.value.trim();
        if (name.length === 0) {
            return "Note name is required."
        }
    
    }

    validateEmail() {
        const email = this.state.email.value.trim();;
        if (email.length === 0) {
            return "Email is required."
        }
    }    

    validatePhone() {
        // const phone = this.state.phone.value.trim();
        // if (phone.length === 0) {
        //     return "Phone number is required."
        // }
    }    

    // don't need to validate ER or membership because there are only two states and the default is "false"

    validateContent() {
        const content = this.state.content.value.trim();
        if (content.length === 0) {
            return "Notes are required."
        }
    }

    render() {
        const nameError = this.validateNoteName();
        const emailError = this.validateEmail();
        const phoneError = this.validatePhone();
        const contentError = this.validateContent();

        console.log(this.props.location.pathname);
 

        return (
            <form className="addnote" onSubmit={(e) => this.handleSubmit(e, this.context.editNote)}>
                <h2>Edit Profile</h2>
                <div className="form-group">
                    <span className='before_input'>
                        <input 
                            type="text"
                            className="addnote__control"
                            name="name"
                            id="name"
                            placeholder="John Doe"
                            minLength={2}
                            value={this.state.name.value}
                            onChange={e => this.updateNoteName(e.target.value)}
                            required
                            />
                            <label className="label" htmlFor="name">Name</label>{" "}
                        </span>

                        {this.state.name.touched && <ValidationError message={nameError} />}
                </div>

                <div className="form-group">
                    <span className='before_input'>
                        <input
                            className="addnote__control"
                            type="email"
                            placeholder="john.doe@email.com"
                            size="50"
                            name="folderId"
                            id="folderId"
                            value={this.state.email.value}
                            onChange={e => this.updateEmail(e.target.value)}
                            required
                        />
                        <label className="label" htmlFor="folderId">Email</label>{" "}
                    </span>
                    {this.state.email.touched && <ValidationError message={emailError} />}
                </div>

                <div className="form-group">
                    <span className='before_input'>

                        <input
                            className="addnote__control"
                            placeholder="123-45-678" 
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            type="tel"
                            name="folderId"
                            id="folderId"
                            value={this.state.phone.value}
                            onChange={e => this.updatePhone(e.target.value)}
                            required
                        />
                        <label className="label" htmlFor="folderId">Phone</label>{" "}
                    </span>

                    {this.state.phone.touched && <ValidationError message={phoneError} />}
                </div>

                <div className="radio_group">
                        <input
                            className="radio"
                            type="checkbox"
                            name="folderId"
                            id="folderId"
                            checked={this.state.membership.value}
                            onChange={e => this.updateMembership(!this.state.membership.value)}
                            
                        />
                        <label className="radio_label" htmlFor="folderId">Membership</label>{" "}
                    {this.state.membership.touched}
                </div>

                <div className="radio_group">

                        <input
                            className="radio"
                            type="checkbox"
                            name="folderId"
                            id="folderId"
                            checked={this.state.er.value}
                            onChange={e => this.updateEr(!this.state.er.value)}
                            
                        />
                        <label className="radio_label" htmlFor="folderId">ER</label>{" "}
                    {this.state.er.touched}
                </div>

                <div className="form-group note-content">
                    <textarea 
                        rows="5"
                        cols="30"
                        name="content"
                        id="content"
                        value={this.state.content.value}
                        placeholder="e.g. Will pay on June 1st, 2020"
                        onChange={e => this.updateContent(e.target.value)}
                        />
                </div>



                <div className="addnote__button__group">
                   
                    <button 
                        type="submit"
                        className="addnote__button"
                        disabled={
                            this.validateNoteName() 
                        }
                    >
                        Save
                    </button>
                </div>
            </form>
        )
    }
}

export default EditProfile;