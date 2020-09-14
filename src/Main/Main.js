import React, { Component } from 'react'
import './Main.css'
import Note from '../Note/Note'
import ApiContext from '../ApiContext'
import { Link } from 'react-router-dom'

class Main extends Component {

    constructor(props){
        super(props)
        this.state = {
          inventorySort: '',
          transactionSort: '',
          sortByQuantity: '',
          sortByAmount: '',
          sortByPayment: '',
        }
      }

    static defaultProps = {
        match: {
            params: {}
        }
    }
    static contextType = ApiContext;

    handleSelectedSort = (sort, folderId) => {
        console.log('changed: ', sort);
        console.log('folder', folderId)
        console.log('folder', typeof folderId)

        
        if(Number(folderId) === 1) {
            if (sort !== '') {
                this.setState({ inventorySort: sort});
            }
            else this.setState({inventorySort: ""});
        }
        if(Number(folderId) === 2) {
            if (sort !== '') {
                this.setState({ transactionSort: sort});
            }
            else this.setState({transactionSort: ""});
        }
        
    }

    handleSortByNumber = (sort, folderId) => {
        console.log('changed: ', sort);
        console.log('folder', folderId)
        console.log('folder', typeof folderId)

        
        if(Number(folderId) === 1) {
            if (sort !== '') {
                this.setState({ sortByQuantity: sort});
            }
            else this.setState({sortByQuantity: ""});
        }
        if(Number(folderId) === 2) {
            if (sort !== '') {
                this.setState({ sortByAmount: sort});
            }
            else this.setState({sortByAmount: ""});
        }
        
    }

    render() {
        console.log('state update: ', this.state);
        const { notes = [] } = this.context;
        const { folderId } = this.props.match.params;
        return (
            <div className="main__container">
                {console.log('notes',notes)}

                {/* SELECT SORTING CRITERIA */}
                <div>
                    <h3>Sort: </h3>
                    <select id='note_options'
                    value={Number(folderId) === 1 ? this.state.inventorySort : this.state.transactionSort} 
                    onChange={(e) => this.handleSelectedSort(e.target.value, folderId)}>
                        <option value="">All</option>
                        {(notes.length > 0)
                            ? notes.map((noteObj, id) => 
                                Number(folderId) === noteObj.folderid
                                 ? <option key={id} value={noteObj.name}>{noteObj.name}</option> 
                                 : null
                            )
                            : null
                        }
                    </select>
                    
                    <select id='note_options'
                    value={Number(folderId) === 1 ? this.state.sortByQuantity : this.state.sortByAmount} 
                    onChange={(e) => this.handleSortByNumber(e.target.value, folderId)}>
                        <option value="">None</option>
                        <option value={'low'}>{"Low to High"}</option> 
                        <option value={'high'}>{"High to Low"}</option> 
                    </select>

                    {folderId !== 2
                        ? null
                        : <select id='note_options'
                            value={this.state.sortByPayment} 
                            onChange={(e) => this.handleSortByPayment(e.target.value, folderId)}>
                                <option value="">None</option>
                                <option value={'paid'}>{"Paid"}</option> 
                                <option value={'unpaid'}>{"Unpaid"}</option> 
                        </select>

                    }

                    
                </div>

                {/* DISPLAY NOTES */}
                <div className="main__notelist">
                    {console.log('issue? ',this.state.sortBy)}
                    {(notes.length > 0 && folderId === 2 && this.state.sortByPayment)
                    ?   (!folderId ? notes : notes.filter(note => note.folderid === Number(folderId))).map(note => {
                            return (<Note key={note.id} 
                                note={ 
                                {...note, 
                                sortBy: (Number(folderId) === 1) 
                                    ? this.state.inventorySort 
                                    : this.state.transactionSort} 
                            } />)
                        })
                    : (notes.length > 0)
                    ?   (!folderId ? notes : notes.filter(note => note.folderid === Number(folderId))).map(note => {
                            return (<Note key={note.id} 
                                note={ 
                                {...note, 
                                sortBy: (Number(folderId) === 1) 
                                    ? this.state.inventorySort 
                                    : this.state.transactionSort} 
                            } />)
                        })
                    :   <p>No inventory or purchases.</p>}
                    {/* */}
                </div>

                {/* ADD NOTE BUTTON */}
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