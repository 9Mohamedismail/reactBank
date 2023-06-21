import React, { useState, useEffect } from "react";

function Credit(props) {
  const { credit, setCredit, balance, setBalance } = props;
  const [creditTransaction, setCreditTransaction] = useState([]);
  const [transactionsList, setTransactionsList] = useState([]);
  const [viewTransactions, setViewTransactions] = useState(false);
  const [value, setValue] = useState(0);

  function formatDate(date) {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return date.toLocaleDateString("en-US", options);
  }

  function formatTime(date) {
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleTimeString("en-US", options);
  }

  function transactions() {
    return (
      <div>
        {creditTransaction.map((transaction, index) => (
          <p key={index}>
            Description: {transaction.description} | Amount:{" "}
            {transaction.amount} | Date: {formatDate(new Date())} | Time:{" "}
            {formatTime(new Date())}
          </p>
        ))}
      </div>
    );
  }

  useEffect(() => {
    setTransactionsList(transactions());
  }, [creditTransaction]);

  useEffect(() => {
    setBalance(balance - value);
  }, [creditTransaction, value]);

  function handleSubmit(e) {
    e.preventDefault();
    const newValue = Number(e.target[1].value);
    const newCreditTransaction = {
      [e.target[0].name]: e.target[0].value,
      [e.target[1].name]: newValue,
    };

    setCreditTransaction([...creditTransaction, newCreditTransaction]);
    setCredit(credit + newValue);
    setValue(newValue);
    console.log(creditTransaction);
  }

  function handleClick(e) {
    setViewTransactions(!viewTransactions);
  }

  return (
    <div>
      <div>
        <h1>Welcome to Credit!</h1>
        <p id="balance">Account Balance is: ${balance} </p>
        <p id="total">Total Credit: ${credit}</p>
      </div>

      <div class="form-container">
        <form onSubmit={handleSubmit}>
          <label>Description:</label>
          <input required type="text" name="description" />
          <label>Amount: </label>
          <input required type="number" name="amount" />
          <button>Submit</button>
        </form>

        <button onClick={handleClick}>Show Transactions</button>
        {viewTransactions && transactionsList}
      </div>
    </div>
  );
}

export default Credit;
