import React from 'react';

import ApiContext from '../ApiContext'
import ValidationError from '../ValidationError'

import './AddInventory.css'
import config from '../config'

class AddInventory extends React.Component {
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
                quantity: '',
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



    updateNoteName(name) {
        this.setState({name: {value: name, touched: true}})
    }

    updateQuantity(quantity) {
        this.setState({quantity: {value: quantity, touched: true}})
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
            folderId: 1,
            quantity: this.state.quantity.value,
            size: this.state.content.value,
        }
        const url = config.API_ENDPOINT + "/api/notes/inventory";

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
                quantity: {
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
            return "Item name is required."
        }
    
    }

    validateQuantity() {
        const quantity = this.state.quantity.value;
        if (quantity === undefined || quantity === '') {
            return "Quantity is required."
        }
    }

    validateContent() {
        const content = this.state.content.value.trim();
        if (content.length === 0) {
            return "Size is required."
        }
    }

    render() {
        const nameError = this.validateNoteName();
        const contentError = this.validateContent();
        const QuantityError = this.validateQuantity();

        return (
            <form className="addnote" onSubmit={(e) => this.handleSubmit(e)}>
                <h2>Add Item</h2>
                <div className="form-group">
                    <span className='before_input'>
                        <input 
                            type="text"
                            className="addnote__control"
                            name="name"
                            id="name"
                            placeholder="e.g. Peppermint Oil"
                            minLength={1}
                            // placeholder="e.g. Peppermint oil"
                            value={this.state.name.value}
                            onChange={e => this.updateNoteName(e.target.value)}
                            required/>
                            <label className="label" htmlFor="name">Item</label>{" "}
                        </span>
                        {this.state.name.touched && <ValidationError message={nameError} />}
                </div>

                <div className="form-group">
                    <span className='before_input'>
                        <input
                            className="addnote__control"
                            name="folderId"
                            id="folderId"
                            type="number"
                            min="0"
                            max="1000"
                            step="0.01"
                            placeholder="Number"
                            value={this.state.quantity.value}
                            onChange={e => this.updateQuantity(e.target.value)}
                            required
                        />
                        <label className="label" htmlFor="folderId">Quantity</label>{" "}
                    </span>
                    {this.state.quantity.touched && <ValidationError message={QuantityError} />}
                </div>
                
                <div className="form-group">
                        <span className='before_input'>
                            <input 
                                className="addnote__control"
                                name="folderId"
                                id="folderId"
                                placeholder="e.g. 5 ml"
                                value={this.state.content.value}
                                minLength={1}
                                onChange={e => this.updateContent(e.target.value)}
                                required
                            />
                            <label className="label" htmlFor="folderId">Size</label>{" "}

                        </span>
                        {this.state.content.touched && <ValidationError message={contentError} />}
                </div>


                <div className="addnote__button__group">
                   
                    <button 
                        type="submit"
                        className="addnote__button"
                        disabled={
                            this.validateNoteName() ||
                            this.validateQuantity() ||
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

export default AddInventory;