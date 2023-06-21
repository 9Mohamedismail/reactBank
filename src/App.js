import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./components/Home";
import Debt from "./components/Debt";
import Credit from "./components/Credit";

function App() {
  const [debtAmount, setDebtAmount] = useState("");
  const [creditAmount, setCreditAmount] = useState("");
  const [balanceAmount, setBalanceAmount] = useState("52830");

  useEffect(() => {
    async function fetchDebt() {
      try {
        const result = await axios.get(
          "https://bank-of-react-b745wfs0u-ajlapid718.vercel.app/debits"
        );
        setDebtAmount(result.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchDebt();
  }, []);

  useEffect(() => {
    async function fetchCredit() {
      try {
        const result = await axios.get(
          "https://bank-of-react-b745wfs0u-ajlapid718.vercel.app/credits"
        );
        setCreditAmount(result.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCredit();
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Navigation */}
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Debt">Debt</Link>
            </li>
            <li>
              <Link to="/Credit">Credit</Link>
            </li>
          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home balance={balanceAmount} />} />
          <Route
            path="/Debt/*"
            element={
              <Debt
                debt={debtAmount}
                setDebt={setDebtAmount}
                balance={balanceAmount}
                setBalance={setBalanceAmount}
              />
            }
          />
          <Route
            path="/Credit/*"
            element={
              <Credit
                credit={creditAmount}
                setCredit={setCreditAmount}
                balance={balanceAmount}
                setBalance={setBalanceAmount}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
