import * as React from 'react';
import Icon from 'react-crypto-icons';
import { MdAttachMoney } from 'react-icons/md';
import { Paper, Button, Box, TextField } from '@mui/material';

async function fetchPrice(ticker) {
  const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${ticker}`);
  const data = await response.json();
  return data;
}

export default function Transaction() {
  const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" };
  const [name, setName] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [transaction, setTransactions] = React.useState([]);
  const [btcPrice, setBtcPrice] = React.useState(null);
  const [ethPrice, setEthPrice] = React.useState(null);
  const [solPrice, setSolPrice] = React.useState(null);

  const addTransaction = (e) => {
    e.preventDefault();
    const transaction = { name, amount };
    console.log(transaction);
    fetch("http://localhost:8080/wallet/transaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transaction)
    }).then(() => {
      console.log("New transaction added.");
      window.location.reload();
    });
  };

  function deleteTransaction(id) {
    fetch(`http://localhost:8080/wallet/transaction/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        console.log("Transaction removed.");
        window.location.reload();
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }

  React.useEffect(() => {
    fetch("http://localhost:8080/wallet/transaction")
      .then(res => res.json())
      .then((result) => {
        setTransactions(result);
      });

    fetchPrice('BTCUSDT')
      .then(data => setBtcPrice(data.price))
      .catch(error => console.error('Error fetching BTC price:', error));

    fetchPrice('ETHUSDT')
      .then(data => setEthPrice(data.price))
      .catch(error => console.error('Error fetching ETH price:', error));

    fetchPrice('SOLUSDT')
      .then(data => setSolPrice(data.price))
      .catch(error => console.error('Error fetching ETH price:', error));
  }, []);

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <Paper elevation={3} style={paperStyle}>
        <h1>Market data</h1>
        <Icon name="btc" size={16} /> <b>BTC {btcPrice ? parseFloat(btcPrice).toFixed(2) : 'Loading...'}$</b> <br />
        <Icon name="eth" size={16} /> <b>ETH {ethPrice ? parseFloat(ethPrice).toFixed(2) : 'Loading...'}$</b> <br />
        <Icon name="sol" size={16} /> <b>SOL {solPrice ? parseFloat(solPrice).toFixed(2) : 'Loading...'}$</b> <br />
        <MdAttachMoney style={{ color: '#FFD700', fontSize: '1rem' }} /> <b>GOLD {  'Loading...'}$</b> <br />
        <MdAttachMoney style={{ color: '#C0C0C0', fontSize: '1rem' }} /> <b>SILVER { 'Loading...'}$</b> <br />
      </Paper>

      <Paper elevation={3} style={paperStyle}>
        <h1>New transaction</h1>
        <TextField id="outlined-basic" label="What you bought?" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '50%' }} />
        <TextField id="outlined-basic" label="How much you paid?" variant="outlined" value={amount} onChange={(e) => setAmount(e.target.value)} style={{ width: '50%' }} />
        <Button variant="contained" style={{ margin: '20px' }} onClick={addTransaction}>Create</Button>
      </Paper>

      <Paper elevation={3} style={paperStyle}>
        <h1>Transactions</h1>
        {transaction.map(transaction => (
          <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={transaction.id}>
            <b>{transaction.name}</b><br />
            {transaction.amount}zł<br />
            <Button variant="contained" style={{ margin: '20px' }} onClick={() => deleteTransaction(transaction.id)}>Remove</Button>
          </Paper>
        ))}
      </Paper>
    </Box>
  );
}
