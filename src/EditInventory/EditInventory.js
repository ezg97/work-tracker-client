import React from 'react';
import { withRouter } from 'react-router-dom'


import ApiContext from '../ApiContext'
import ValidationError from '../ValidationError'

// import './AddPurchase.css'
import config from '../config'
import Note from '../Note/Note';

class EditInventory extends React.Component {
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
            quantity: {
                value: 0,
                touched: false
            },
            size: {
                value: '',
                touched: false
            },
            note: {},
            error: false
        }
    }

    static contextType = ApiContext;

    componentDidMount () {
        const { note } = this.props.location.state;
        this.setState({
            name: {
                value: note.name,
                touched: false
            },
            quantity: {
                value: Number(note.quantity),
                touched: false
            },
            size: {
                value: String(note.size),
                touched: false
            },
            note: note
        });
        console.log('data is here', note);
        
    }

    editNoteRequest = (callback) => {
        let updatedNote = {};

        updatedNote = {
            product: this.state.name.value, 
            quantity: this.state.quantity.value, 
            size: this.state.size.value, 
        };
        
        console.log('beeeeee',updatedNote);
    
        const url = config.API_ENDPOINT + `/api/notes/${this.state.note.id}`;
        console.log('url', url);
    
        fetch(url, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'folderid': `1`
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
                callback(1)
            })
            .catch(error => console.log(error))
    }

    updateNoteName(name) {
        this.setState({name: {value: name, touched: true}})
    }

    updateQuantity(quantity) {
        this.setState({quantity: {value: quantity, touched: true}})
    }

    updateSize(size) {
        this.setState({size: {value: size, touched: true}})
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

    validateQuantity() {
       
        if (this.state.quantity.value < 0) {
            return "Cannot have a negative quantity."
        }
    }

    validateSize() {
        const size = this.state.size.value.trim();
        if (size.length === 0) {
            return "Folder name is required."
        }
    }

    render() {
        const nameError = this.validateNoteName();
        const sizeError = this.validateSize();
        const quantityError = this.validateQuantity();

        console.log(this.props.location.pathname);
 

        return (
            <form className="addnote" onSubmit={(e) => this.handleSubmit(e, this.context.editNote)}>
                <h2>Edit Transaction</h2>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>{" "}
                    <input 
                        type="text"
                        className="addnote__control"
                        placeholder="e.g. John Doe"
                        name="name"
                        id="name"
                        value={this.state.name.value}
                        onChange={e => this.updateNoteName(e.target.value)}
                        />
                        {this.state.name.touched && <ValidationError message={nameError} />}
                </div>
                <div className="form-group">
                    <label htmlFor="folderId">Quantity: </label>{" "}
                    <input
                        className="addnote__control"
                        type='number'
                        min={0}
                        max={1000}
                        placeholder="e.g. 3"
                        name="folderId"
                        id="folderId"
                        value={this.state.quantity.value}
                        onChange={e => this.updateQuantity(e.target.value)}
                    />
                    {this.state.quantity.touched && <ValidationError message={quantityError} />}

                </div>
                <div className="form-group note-content">
                    <input
                        className="addnote__control"
                        type='text'
                        placeholder="e.g. 5 ml"
                        name="folderId"
                        id="folderId"
                        value={this.state.size.value}
                        onChange={e => this.updateSize(e.target.value)}
                    />
                    {this.state.size.touched && <ValidationError message={sizeError} />}
                </div>

     

                <div className="addnote__button__group">
                   
                    <button 
                        type="submit"
                        className="addnote__button"
                        disabled={
                            this.validateNoteName() ||
                            this.validateQuantity() ||
                            this.validateSize() 
                        }
                    >
                        Save
                    </button>
                </div>
            </form>
        )
    }
}

export default EditInventory;