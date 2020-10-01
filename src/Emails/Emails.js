import React, { Component } from 'react'
import './Emails.css'
import ApiContext from '../ApiContext'
import { Link } from 'react-router-dom'
import config from '../config'
import CKEditor from "react-ckeditor-component";

class Emails extends Component {

    constructor(props){
        super(props);
        this.updateContent = this.updateContent.bind(this);

        this.state = {
          selectedCount: 0,
          selectedChoice: 'none',
          emails: [],
          subject: '',
          message: '',
          content: '',
          attachments: '',
        }
      }

    static contextType = ApiContext;

    updateContent(newContent) {
        this.setState({
            content: newContent.editor.getData()
        })
    }

    onChange(evt){
        console.log("onChange fired with event info: ", evt.editor);
        let newContent = evt.editor.getData();
        console.log('quill mesage', newContent);
        this.setState({
          content: String(newContent)
        })
      }

      onBlur(evt){
        console.log("onBlur event called with event info: ", evt);
      }
      
      afterPaste(evt){
        console.log("afterPaste event called with event info: ", evt);
      }

    // - - Method
    onSend = (e) => {
        e.preventDefault();

        console.log('sent');

        const url = config.API_ENDPOINT + "/api/email/send";

        const email = {
            from: 'elijahguerrero97@fake.com',
            to: this.state.emails,
            subject: this.state.subject,
            message: this.state.content,
            attachments: ""
        };

        fetch(url, {
            method:"POST",
            body: JSON.stringify(email),
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
            console.log('sent complete');
            console.log(data);
        })
        .catch(err => {
            this.setState({
                error: err.message
            })
        })
    }

    selectProfile = (e) => {
        e.stopPropagation();
        console.log('target', e.target.innerText)
        let className = e.target.className;
        if(className.includes('prof_selected')) {
            console.log('class 1', e.currentTarget.className)
            e.currentTarget.className = '';
            this.setState({
                selectedCount: this.state.selectedCount - 1,
            });
            this.context.profiles.filter(obj => {
                if (obj.name === e.target.innerText) {
                    let index = this.state.emails.indexOf(obj.email);
                    if (index !== -1) {
                        let tempArray = this.state.emails;
                        tempArray.splice(index, 1);
                        this.setState({
                            emails: [...tempArray]
                        });
                    }
                }
            })
        }
        else {
            e.currentTarget.className = 'prof_selected';
            console.log('class 2', e.currentTarget.className);
            this.setState({
                selectedCount: this.state.selectedCount + 1,
            });   
            this.context.profiles.filter(obj => {
                if(obj.name === e.target.innerText) {
                    this.setState({
                        emails: [...this.state.emails, obj.email]
                    });
                }
            })
            
        }
        console.log('selected prof count', this.state.emails);
    }

    // INFINTE LOOP BC IT UPDATES THE STATE THEN THIS WHOLE THING RESTARTS OVER AND OVER
    // the reason it don't work is bc the states choice gets updated the moment its selected
    updateCount = (selectedChoice) => {
        console.log('y', selectedChoice)

        console.log('1 here',  ((selectedChoice === 'none' && this.state.selectedChoice !== 'none') || (selectedChoice === 'select' && this.state.selectedChoice !== 'select')));
        console.log((selectedChoice === 'all' && this.state.selectedChoice !== 'all' ) );
        console.log((selectedChoice === 'all') )
        console.log((this.state.selectedChoice !== 'all' ) )
        if ((selectedChoice === 'none' && this.state.selectedChoice !== 'none') || (selectedChoice === 'select' && this.state.selectedChoice !== 'select')) {
            console.log('2', (selectedChoice === 'none' && this.state.selectedChoice !== 'none') )
            console.log('3', (selectedChoice === 'select' && this.state.selectedChoice !== 'select'))
            // UPDATE COUNT
            this.setState({
                selectedCount: 0
            });
            // UPDATE EMAILS
            this.setState({
                emails: []
            });
        }
        else if (selectedChoice === 'all' && this.state.selectedChoice !== 'all' ) {
            console.log('made it to all')
            // UPDATE COUNT
            this.setState({
                selectedCount: Number(this.context.profiles.length)
            });
            // UPDATE EMAILS
            let tempArray = [];
            this.context.profiles.forEach(obj => {
                tempArray.push(obj.email);
            });
            this.setState({
                emails: [...tempArray]
            });
        }
        else if (selectedChoice === 'membership' && this.state.selectedChoice !== 'membership') {
            // UPDATE COUNT
            this.setState({
                selectedCount: Number(this.context.profiles.filter(prof => prof.membership === true).length)
            });
            // UPDATE EMAILS
            let tempArray = [];
            this.context.profiles.forEach(obj => {
                if (obj.membership === true) {
                    tempArray.push(obj.email);
                }
            });
            this.setState({
                emails: [...tempArray]
            });
        }
        else if (selectedChoice === 'er' && this.state.selectedChoice !== 'er') {
            // UPDATE COUNT
            this.setState({
                selectedCount: Number(this.context.profiles.filter(prof => prof.er === true).length)
            });
            // UPDATE EMAILS
            let tempArray = [];
            this.context.profiles.forEach(obj => {
                if (obj.er === true) {
                    tempArray.push(obj.email);
                }
            });
            this.setState({
                emails: [...tempArray]
            });
        }
        console.log('total tt',this.state.selectedCount, this.state.selectedChoice);
    }

    optionSelect = (value) => {
        this.setState({
            selectedChoice: value,
        });

        this.updateCount(value);
    }

    updateSubject = (value) => {
        this.setState({
            subject: value
        });
    }

    updateAttachments = (val) => {
        let files = document.getElementById("file_attachments").files;
        console.log('attached', files);
        // console.log('attached', val);
        // this.setState({
        //     attachments: val
        // });
    }

    // updateMessage = (value) => {
    //     this.setState({
    //         message: value
    //     });
    // }

    render() {

        return (
            <div className="main__container">
                {console.log('EMAIL STATE', this.state)}

                <div className='profile__container'>
                    {/* NONE */}
                    {(this.state.selectedChoice === 'none')
                        ? null
                        : null
                    }
                    {/* ALL */}
                    {(this.state.selectedChoice === 'all')
                        ? <>
                            <ul>
                                {this.context.profiles.map((prof, i) => 
                                    <li key={i} 
                                        className={'prof_selected'}
                                        onClick={(e) => this.selectProfile(e)}>{prof.name}
                                    </li>
                                )}
                            </ul>
                            <span>Recipients: {this.state.selectedCount}</span>
                        </>
                        : null
                    }
                    {/* SELECT */}
                    {(this.state.selectedChoice === 'select')
                        ? <>
                            <ul>
                                {this.context.profiles.map((prof, i) => 
                                    <li key={i} 
                                        onClick={(e) => this.selectProfile(e)}>{prof.name}
                                    </li>
                                )}
                            </ul>
                            <span>Recipients: {this.state.selectedCount}</span>
                        </>
                        : null
                    }

                    {/* MEMBERSHIP */}
                    {(this.state.selectedChoice === 'membership')
                        ? <>
                            <ul>
                                {this.context.profiles.map((prof, i) => 
                                    (prof.membership === true) 
                                        ?<li key={i} 
                                            className={'prof_selected'}
                                            onClick={(e) => this.selectProfile(e)}>{prof.name}
                                        </li>
                                        :<li key={i} 
                                            onClick={(e) => this.selectProfile(e)}>{prof.name}
                                        </li>
                                )}
                            </ul>
                            <span>Recipients: {this.state.selectedCount}</span>
                        </>
                        : null
                    }

                    {/* ER */}
                    {(this.state.selectedChoice === 'er')
                        ? <>
                            <ul>
                                {this.context.profiles.map((prof, i) => 
                                    (prof.er === true) 
                                        ?<li key={i} 
                                            className={'prof_selected'}
                                            onClick={(e) => this.selectProfile(e)}>{prof.name}
                                        </li>
                                        :<li key={i} 
                                            onClick={(e) => this.selectProfile(e)}>{prof.name}
                                        </li>
                                )}
                            </ul>
                            <span>Recipients: {this.state.selectedCount}</span>
                        </>
                        : null
                    }
                </div>

                <div className="email__container">
                    <div>
                        <h2>Email</h2>
                    </div>

                    <form>
                        <label>To:</label>
                        <br></br>
                        <select onChange={(e) => this.optionSelect(e.target.value)}>
                            <option value={'none'}>None</option>
                            <option value={'all'}>All</option>
                            <option value={'select'}>Select</option>
                            <option value={'membership'}>Membership</option>
                            <option value={'er'}>ER</option>

                        </select>
                        <br></br>

                        <label>Subject:</label>
                        <br></br>
                        <input type='email' 
                                value={this.state.subject}
                                onChange={(e) => this.updateSubject(e.target.value)}>
                                </input>
                        <br></br>

                        <label>Message:</label>
                        <br></br>
                        {/* <textarea rows={10} col={30} 
                                  value={this.state.message}
                                  onChange={(e) => this.updateMessage(e.target.value)}>
                                  ></textarea> */}
                        
                      
                        <CKEditor 
                            activeClass="p10" 
                            content={this.state.content} 
                            events={{
                                "blur": this.onBlur,
                                "afterPaste": this.afterPaste,
                                "change": this.updateContent
                            }}
                        />
                        <br></br>
                        <input type="file" 
                                id="file_attachments" 
                                name="files"
                                value={this.state.attachments}
                                onChange={(e) => this.updateAttachments(e)} 
                                multiple>
                        </input>
                        <br></br>
                        <button type="submit" onClick={(e) => this.onSend(e)}>Send Email</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Emails;