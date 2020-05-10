import React from 'react';
import ApiContext from '../ApiContext'
import ValidationError from '../ValidationError'
import './AddFolder.css'
import config from '../config'

class AddFolder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            foldername: {
                value: ''
            },
            error: false
        }
    }

    static contextType = ApiContext;

    updateFolderName(foldername) {
        this.setState({foldername: {value: foldername, touched: true}})
    }

    handleSubmit(event) {
        event.preventDefault();
        const folder = {
            foldername: this.state.foldername.value,
        }
        const url = config.API_ENDPOINT + "/api/folders";
        fetch(url, {
            method:"POST",
            body: JSON.stringify(folder),
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
                foldername: {
                    value: '',
                    touched: false
                }
            })
            this.context.createFolder(data)
        })
        .catch(err => {
            this.setState({
                error: err.message
            })
        })
    }

    validateFolderName() {
        const foldername = this.state.foldername.value.trim();
        if (foldername.length === 0) {
            return "Foldername is required."
        }
    }

    render() {
        const foldernameError = this.validateFolderName();
        return (
            <form className="addfolder" onSubmit={(e) => this.handleSubmit(e)}>
                <h2>Add Folder</h2>
                <div className="form-group">
                    <label htmlFor="foldername">Folder Name:</label>{" "}
                    <input 
                        type="text"
                        className="addfolder__control"
                        name="foldername"
                        id="foldername"
                        value={this.state.foldername.value}
                        onChange={e => this.updateFolderName(e.target.value)}
                        />
                        {this.state.foldername.touched && <ValidationError message={foldernameError} />}
                </div>
                <div className="addfolder__button__group">
                    
                    <button 
                        type="submit"
                        className="addfolder__button"
                        disabled={
                            this.validateFolderName()
                        }
                    >
                        Save
                    </button>
                </div>
            </form>
        )
    }
}

export default AddFolder;