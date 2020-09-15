import React from 'react';
import { withRouter } from 'react-router-dom'


import ApiContext from '../ApiContext'
import ValidationError from '../ValidationError'

// import './AddPurchase.css'
import config from '../config'
import Note from '../Note/Note';

class EditPurchase extends React.Component {
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
            total: {
                value: String(note.total),
                touched: false
            },
            content: {
                value: note.content,
                touched: false
            },
            paymentStatus: {
                value: note.paymentStatus,
                touched: false
            },
            note: note
        });
        console.log('data is here', note);
        
    }

    editNoteRequest = (callback) => {
        let updatedNote = {};

        updatedNote = {
            cust_name: this.state.name.value, 
            total: this.state.total.value, 
            comment: this.state.content.value, 
            payment_status: this.state.paymentStatus.value
        };
        
        console.log('beeeeee',updatedNote);
    
        const url = config.API_ENDPOINT + `/api/notes/${this.state.note.id}`;
        console.log('url', url);
    
        fetch(url, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'folderid': `2`
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
                callback(2)
            })
            .catch(error => console.log(error))
    }

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
                    <label htmlFor="folderId">Total: </label>{" "}
                    <input
                        className="addnote__control"
                        placeholder="e.g. 5.00"
                        name="folderId"
                        id="folderId"
                        value={this.state.total.value}
                        onChange={e => this.updateTotal(e.target.value)}
                    />
                    {this.state.total.touched && <ValidationError message={totalError} />}

                </div>
                <div className="form-group note-content">
                    <textarea 
                        rows="5"
                        cols="30"
                        className="addnote__control"
                        name="content"
                        id="content"
                        value={this.state.content.value}
                        placeholder="e.g. Will pay on June 1st, 2020"
                        onChange={e => this.updateContent(e.target.value)}
                        />
                        {this.state.content.touched && <ValidationError message={contentError} />}
                </div>

                <div className="form-group">
                    <label htmlFor="folderId">Paid: </label>{" "}
                    <select
                        className="addnote__control"
                        name="folderId"
                        id="folderId"
                        value={this.state.paymentStatus.value}
                        onChange={e => this.updatePaymentStatus(e.target.value)}>
                            <option value="None">Select Payment Status</option>
                            <option key={1} value={true} >Paid</option>
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
                            this.validateContent() ||
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

export default EditPurchase;