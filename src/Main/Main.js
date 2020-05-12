import React, { Component } from 'react'
import './Main.css'
import Note from '../Note/Note'
import ApiContext from '../ApiContext'
import { Link } from 'react-router-dom'

class Main extends Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }
    static contextType = ApiContext;

    render() {
        const { notes = [] } = this.context;
        const { folderId } = this.props.match.params;
        return (
            <div className="main__container">
                <div className="main__notelist">
                    {(notes.length > 0)
                    ?   (!folderId ? notes : notes.filter(note => note.folderid === Number(folderId))).map(note => {
                            return (<Note key={note.id} note={note} />)
                        })
                    :   <p>No inventory or purchases.</p>}
                    {/* */}
                </div>

                {(this.props.match.path === '/')
                    ? null 
                    : (Number(folderId) === 1)
                        ? <Link to='/addInventory'><button className='addnote__button'>Add to inventory</button></Link>
                        : <Link to='/addPurchase'><button className='addnote__button'>Add to Purchases</button></Link>
                }

            </div>
        )
    }
}


export default Main;