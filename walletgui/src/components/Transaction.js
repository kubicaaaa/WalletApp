import * as React from 'react';
import { Paper, Button, Box, TextField} from '@mui/material';

export default function Transaction() {

  const paperStyle = {padding: '50px 20px', width:600, margin: "20px auto" }
  const[name,setName] = React.useState('')
  const[amount,setAmount] = React.useState('')
  const[transaction, setTransactions] = React.useState([])

  const handleClick = (e)=>{
    e.preventDefault()
    const transaction = {name, amount}
    console.log(transaction)
    fetch("http://localhost:8080/transaction/add",
    {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(transaction)
    }).then(()=>{
      console.log("New transaction added.")
    })
  }

  React.useEffect(()=>{
    fetch("http://localhost:8080/transaction/getAll")
    .then(res=>res.json())
    .then((result)=>{
      setTransactions(result)
    }
  )
  },[]) 

  return (
    <Box
      
      component="form"
      sx={{
        '& > :not(style)': { m: 1},
      }}
      noValidate
      autoComplete="off"
    > 
      <Paper elevation={3} style={paperStyle}>  
        <h1>Add transaction</h1>
        <TextField id="outlined-basic" label="Transaction Name" variant="outlined" value={name} onChange={(e)=>setName(e.target.value)} style={{width:'50%'}}  />
        <TextField id="outlined-basic" label="Transaction Value" variant="outlined" value={amount} onChange={(e)=>setAmount(e.target.value)} style={{width:'50%'}} />
        <Button variant="contained" style={{margin: '20px'}} onClick={handleClick}>Create</Button>
      </Paper>

      <h1>List of transactions</h1>
      <Paper elevation={3} style={paperStyle}>
        {transaction.map(transaction=>(
          <Paper elevation={6} style={{margin:"10px", padding:"15px", textAlign:"left"}} key={transaction.id}>
          Name: {transaction.name}<br/>
          Value: {transaction.amount}zł<br/>
          </Paper>
        ))
        }
      </Paper>

    </Box>
  );
}