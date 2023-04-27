import './App.css';
import React, {useEffect, useState} from 'react';
  const base_Url = "http://localhost:3000/transactions"

  function AddTransaction({inputs}){
    const [formData, setFormData] = useState ({
        date:"",
        category:"",
        amount:0,
        description:""
    })

    // this enables us to add transactions onto form area
    function handleAdditions(e){
      setFormData({
        ...formData,
        [e.target.name]:e.target.value
      })
    }

    function handleSubmit(event){
      event.preventDefault()
      inputs(formData)
      setFormData({
        date:"",
        category:"",
        amount:0,
        description:""
      })
    }

    return (
      <form onChange={handleAdditions} onSubmit = {handleSubmit} id="added-transaction" >
        <div className='input-transactions' >
        <label htmlFor="date">Date</label>
        <input value={formData.date} name="date" type="date" id="date" />
          <input value={formData.description} name="description" type="text" className="text-input" placeholder="Description..." />                
          <input value={formData.category} name="category" type="text" className="text-input" placeholder="Category..." />
          <input value={formData.amount} name="amount" type="number" />
        </div>
        <button>Add Transaction</button>
        </form>
    )
  }

  function SearchAreaForm({searching}){
    const [search, setSearch] = useState("")
    function handleSearch(event){
      event.preventDefault()
      setSearch(event.target.value)
      searching(search)
    }

    return (
      <form onchange = {handleSearch} id = "search-form" >
        <input type="text" id = "recent-transactions" placeholder = "Search your recent transactions"
        value = {search} />
        <button>Search</button>
      
      </form>
    )
  }



  function Transact({date, description, category, amount}){
  return (
    <tr>
      <td>{date}</td>
      <td>{category}</td>
      <td>{description}</td>
      <td>{amount}</td>
    </tr>
  )
  }

  function Transactions(props){
    const {transactions} = props
    return (
      <table>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Category</th>
          <th>Amount</th>
          </tr>
          {transactions.map(item => {
          return <Transact
          date = {item.date}
          description = {item.description}
          category = {item.category}
          amount = {item.amount}
          key = {item.id}
          />
          })}
        </table>
    )
  }

function App() {
  const [transactions, setTransactions] = useState([])
  useEffect(() => {
    fetch(base_Url)
    .then(res => res.json())
    .then(data => setTransactions(data))
  },[])
  //console.log(transactions)
  //posting data to server
  function handlePost(UpdateTransactions){
    setTransactions(transactions => [...transactions, UpdateTransactions])
    fetch(base_Url,{
    method:"POST",
    headers:{
      "content-type": "application/json"
    },
    body:JSON.stringify(UpdateTransactions)
  })
    .then(res => res.json())
    .then(data => console.log(data))
  }
  





  function handleSearching(search){
  setTransactions(transactions => transactions.filter(transaction => transaction.description.includes(search)))
  }

  
  return (
    <div className="App">
      <h3>The Royal Bank of Flatiron</h3>
      <SearchAreaForm searching={handleSearching}/>
      <AddTransaction inputs = {handlePost} />
      <Transactions transactions = {transactions} />
      </div>
  );
}

export default App;
