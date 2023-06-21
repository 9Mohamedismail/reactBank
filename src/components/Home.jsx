import React from "react";
import logo from "../bank.png";

function Home(props) {
  const { balance } = props;
  return (
    <div>
      <h1>Welcome to Home!</h1>
      <p id="balance">Account Balance is: ${balance} </p>
      <img src={logo} />
    </div>
  );
}

export default Home;
