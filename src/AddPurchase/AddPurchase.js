import React from 'react';
import { withRouter } from 'react-router-dom'


import ApiContext from '../ApiContext'
import ValidationError from '../ValidationError'

import './AddPurchase.css'
import config from '../config'

class AddPurchase extends React.Component {
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
            total: {
                value: '',
                touched: false
            },
            content: {
                value: '',
                touched: false
            },
            paymentStatus: {
                value: 'None',
                touched: false
            },
            error: false
        }
    }

    static contextType = ApiContext;



    updateNoteName(name) {
        this.setState({name: {value: name, touched: true}})
    }

    updateTotal(total) {
        this.setState({total: {value: total, touched: true}})
    }

    updateContent(content) {
        this.setState({content: {value: content, touched: true}})
    }

    updatePaymentStatus(paymentStatus) {
        this.setState({paymentStatus: {value: paymentStatus, touched: true}})
    }

    handleSubmit(event) {
        var moment = require('moment');
        const now = moment().format();
        event.preventDefault();
        const note = {
            name: this.state.name.value,
            modified: now,
            folderId: 2,
            total: this.state.total.value,
            content: this.state.content.value,
            paymentStatus: this.state.paymentStatus.value,
        }
        const url = config.API_ENDPOINT + "/api/notes/purchase";

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
                total: {
                    value: '',
                    touched: false
                },
                content: {
                    value: '',
                    touched: false
                },
                paymentStatus: {
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

    validatePaymentStatus() {
        const paymentStatus = this.state.paymentStatus.value;
        if (paymentStatus === "None") {
            return "Payment Status is required."
        }
     
    }    

    validateTotal() {
        const total = this.state.total.value.trim();
        let regexp1 = /^\d+\.\d{0,2}$/;
        let regexp2 = /^\d{0,8}$/;
        if (total.length === 0 || !(regexp1.test(total) || regexp2.test(total))) {
            return "Total must contain an amount."
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
        const contentError = this.validateContent();
        const totalError = this.validateTotal();
        const paymentStatusError = this.validatePaymentStatus();

        console.log(this.props.location.pathname);
 

        return (
            <form className="addnote" onSubmit={(e) => this.handleSubmit(e)}>
                <h2>Add Transaction</h2>
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
                            required/>
                        <label className="label" htmlFor="name">Name</label>{" "}
                    </span>
                    {this.state.name.touched && <ValidationError message={nameError} />}
                </div>
                <div className="form-group">
                    <span className='before_input'>
                        <input
                            className="addnote__control"
                            type='number'
                            name="folderId"
                            id="folderId"
                            onChange={e => this.updateTotal(e.target.value)}
                            min="0"
                            max="1000"
                            step="0.01"
                            required
                        />
                        <label className="label" htmlFor="folderId">Total</label>{" "}

                    </span>
                    {this.state.total.touched && <ValidationError message={totalError} />}

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

                <div className="form-group">
                    <select
                        name="folderId"
                        id="folderId"
                        onChange={e => this.updatePaymentStatus(e.target.value)}>
                            <option value="None">Select Payment Status</option>
                            <option key={1} value={true}>Paid</option>
                            <option key={2} value={false}>Unpaid</option>
                    </select>
                    {this.state.paymentStatus.touched && <ValidationError message={paymentStatusError} />}

                </div>

                <div className="addnote__button__group">
                   
                    <button 
                        type="submit"
                        className="addnote__button"
                        disabled={
                            this.validateNoteName() ||
                            this.validateTotal() ||
                            this.validatePaymentStatus()
                        }
                    >
                        Save
                    </button>
                </div>
            </form>
        )
    }
}

export default AddPurchase;