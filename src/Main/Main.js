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

    handleSortByPayment = (sort) => {
        console.log('changed: ', sort);
        
        if (sort !== '') {
            this.setState({ sortByPayment: sort});
        }
        else this.setState({sortByPayment: ""});
       
    }

    render() {
        console.log('state update: ', this.state);
        // const { notes = [] } = this.context;
        const { folderId } = this.props.match.params;
        console.log('get the notes corresponding with: ',folderId)
        let notes = [];
        if (Number(folderId) === 1) {
            console.log('inventory chosen');
            const { inventory = [] } = this.context;
            notes = inventory;
        }
        else if (Number(folderId) === 2) {
            console.log('transaction chosen');
            const { transactions = [] } = this.context;
            notes = transactions;
            console.table(notes,['id','name']);
        }
        
        if (folderId === undefined) {
            console.log('dashboard displayed');
            return(
                <div className="main__container">
                    <div>
                        <h2>Dashboard:</h2>
                    </div>
                </div>
            )
        }
        else {
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

                        {(Number(folderId) !== 2)
                            ? null
                            : <select id='note_options'
                                value={this.state.sortByPayment} 
                                onChange={(e) => this.handleSortByPayment(e.target.value)}>
                                    <option value="">None</option>
                                    <option value={'paid'}>{"Paid"}</option> 
                                    <option value={'unpaid'}>{"Unpaid"}</option> 
                            </select>
                        }

                    </div>

                    {/* DISPLAY NOTES */}
                    <div className="main__notelist">
                        {console.log('issue? ',this.state.sortByPayment)}
                        {console.log('payment status', notes)}
                        {console.log('testing algo: ',(notes.length > 0 && Number(folderId) === 2 && this.state.sortByPayment !== ""))}
                        
                        {/* 1) Has notes && 2) Folder: Transactions && 3) A sort by payment method (paid or unpaid) has been selected */}
                        {(notes.length > 0 && Number(folderId) === 2 && this.state.sortByPayment !== "")
                            // If "paid" was selected
                            ? (this.state.sortByPayment === 'paid')
                                // If sort by price option hasn't been selected "amount" 
                                ? this.state.sortByAmount === ''
                                    ? (!folderId ? notes : notes.filter(note => note.folderid === Number(folderId)))
                                                            .filter(note => note.paymentStatus === true)
                                                            .map(note => {
                                                                return (<Note key={note.id} 
                                                                    note={ 
                                                                    {...note, 
                                                                    sortBy: (Number(folderId) === 1) 
                                                                        ? this.state.inventorySort 
                                                                        : this.state.transactionSort} 
                                                                } />)
                                    })

                                    // Otherwise, sort by price option has been selected
                                    : this.state.sortByAmount === 'high'
                                        //sort by High to Low
                                        ? (!folderId ? notes : notes.filter(note => note.folderid === Number(folderId)))
                                            .filter(note => note.paymentStatus === true)
                                            .sort((a, b) => Number(a.total) - Number(b.total))
                                            .map(note => {
                                                return (<Note key={note.id} 
                                                    note={ 
                                                    {...note, 
                                                    sortBy: (Number(folderId) === 1) 
                                                        ? this.state.inventorySort 
                                                        : this.state.transactionSort} 
                                                } />)
                                                
                                            })

                                        //sort by Low to High
                                        : (!folderId ? notes : notes.filter(note => note.folderid === Number(folderId)))
                                            .filter(note => note.paymentStatus === true)
                                            .sort((a, b) => Number(b.total) - Number(a.total))
                                            .map(note => {
                                                return (<Note key={note.id} 
                                                    note={ 
                                                    {...note, 
                                                    sortBy: (Number(folderId) === 1) 
                                                        ? this.state.inventorySort 
                                                        : this.state.transactionSort} 
                                                } />)
                                                
                                            })

                                // Otherwise, "UNpaid" was selected
                                : this.state.sortByAmount === ''
                                    ? (!folderId ? notes : notes.filter(note => note.folderid === Number(folderId)))
                                        .filter(note => note.paymentStatus === false)
                                        .map(note => {
                                            return (<Note key={note.id} 
                                                note={ 
                                                {...note, 
                                                sortBy: (Number(folderId) === 1) 
                                                    ? this.state.inventorySort 
                                                    : this.state.transactionSort} 
                                            } />)
                                        })
                                    // Otherwise, sort by price option has been selected
                                    : this.state.sortByAmount === 'high'
                                        //sort by High to Low
                                        ? (!folderId ? notes : notes.filter(note => note.folderid === Number(folderId)))
                                            .filter(note => note.paymentStatus === false)
                                            .sort((a, b) => Number(b.total) - Number(a.total))
                                            .map(note => {
                                                return (<Note key={note.id} 
                                                    note={ 
                                                    {...note, 
                                                    sortBy: (Number(folderId) === 1) 
                                                        ? this.state.inventorySort 
                                                        : this.state.transactionSort} 
                                                } />)
                                                
                                            })

                                        //sort by Low to High
                                        : (!folderId ? notes : notes.filter(note => note.folderid === Number(folderId)))
                                            .filter(note => note.paymentStatus === false)
                                            .sort((a, b) => Number(a.total) - Number(b.total)) 
                                            .map(note => {
                                                return (<Note key={note.id} 
                                                    note={ 
                                                    {...note, 
                                                    sortBy: (Number(folderId) === 1) 
                                                        ? this.state.inventorySort 
                                                        : this.state.transactionSort} 
                                                } />)
                                                
                                            })

                        
                            // WITHOUT paid and unpaid filter
                            : (notes.length > 0)
                                // If sort by price option or sort by quantity hasn't been selected "amount" 
                                ? ((this.state.sortByQuantity === '' && Number(folderId) === 1) || this.state.sortByAmount === '' && Number(folderId) === 2)
                                    ? (!folderId ? notes : notes.filter(note => note.folderid === Number(folderId)))
                                                            .map(note => {
                                                                return (<Note key={note.id} 
                                                                    note={ 
                                                                    {...note, 
                                                                    sortBy: (Number(folderId) === 1) 
                                                                        ? this.state.inventorySort 
                                                                        : this.state.transactionSort} 
                                                                } />)
                                    })

                                    // Otherwise, sort by price option has been selected
                                    : ((this.state.sortByQuantity === 'high' && Number(folderId) === 1) || (this.state.sortByAmount === 'high' && Number(folderId) === 2))
                                        //sort by High to Low
                                        ? (!folderId ? notes : notes.filter(note => note.folderid === Number(folderId)))
                                            .sort((a, b) => (Number(folderId) === 1) ? (Number(b.quantity) - Number(a.quantity)) : (Number(b.total) - Number(a.total)))
                                            .map(note => {
                                                return (<Note key={note.id} 
                                                    note={ 
                                                    {...note, 
                                                    sortBy: (Number(folderId) === 1) 
                                                        ? this.state.inventorySort 
                                                        : this.state.transactionSort} 
                                                } />)
                                                
                                            })

                                        //sort by Low to High
                                        : (!folderId ? notes : notes.filter(note => note.folderid === Number(folderId)))
                                            .sort((a, b) => (Number(folderId) === 1) ? (Number(a.quantity) - Number(b.quantity)) : (Number(a.total) - Number(b.total)))
                                            .map(note => {
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
}


export default Main;