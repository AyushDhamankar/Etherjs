import React, { useState } from "react";
import { ethers } from "ethers";
import abi from "./ABI.json";
import "./App.css";
import "./index.css";

const App = () => {
  const [Contract, setContract] = useState(null);
  const [Data, setData] = useState("Get Data");
  const [Num, setNum] = useState(0);
  const [Address, setAddress] = useState("");

  const contractaddress = "0x9dC023999b49ED340315DfeB69b6b62316f358cc";
  const privatekey =
    "9aa27caf06e2a94eef5d96b198fca96181aa123a311e6cc4a769da0f0e3be36b";
  const provider = new ethers.providers.JsonRpcProvider(
    "https://polygon-mumbai.infura.io/v3/cc249360d0e94ac0b60cbf3b77ee8248"
  );
  const contractabi = abi;
  const wallet = new ethers.Wallet(privatekey, provider);

  const connectcontractwithoutmetamask = async () => {
    const contract = new ethers.Contract(contractaddress, contractabi, wallet);
    setContract(contract);
    console.log(contract);
  };

  const getdata = async () => {
    const num = await Contract.getData();
    console.log(num.toString());
    setData(num.toString());
  };

  const setdata = async () => {
    try {
      // Call the setData function
      const transaction = await Contract.setData(Num);

      // Wait for the transaction to be mined
      await transaction.wait();

      console.log("setData function called successfully.");
    } catch (error) {
      console.error("Error calling setData function:", error.message);
    }
  };

  const sendether = async () => {
    try {
      //Wei to Ether
      const value = ethers.utils.formatEther("100000000000000");
      console.log(value);

      //Ether back to Wei
      const weiValue = ethers.utils.parseEther(value.toString());
      console.log(weiValue);

      const transaction = await Contract.sendEther(Address, {
        value: weiValue,
      });
      console.log(transaction);

      // Wait for the transaction to be mined
      await transaction.wait();

      console.log("sendEther function called successfully.");
    } catch (error) {
      console.error("Error calling setData function:", error.message);
    }
  };

  const connectcontractwithmetamask = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractaddress, contractabi, signer);
    setContract(contract);
    console.log(contract);
  };

  return (
    <>
    <div className="App">
      <h1>Contract Interaction Without Metamask</h1>
      <button onClick={connectcontractwithoutmetamask}>Connect Wallet</button>
    </div>

    <div className="App">
      <h1>Contract Interaction With Metamask</h1>
      <button onClick={connectcontractwithmetamask}>Connect Wallet</button>
    </div>

    <div className="App">
      <h1>Contract Function</h1>
      <input type="number" placeholder={Data} />
      <button onClick={getdata}>Get Data</button>
      <br/>
      <input
        type="number"
        placeholder="Enter number"
        onChange={(e) => {
          setNum(e.target.value);
        }}
      />
      <button onClick={setdata}>Set Data</button>
      <br/>
      <input
        type="text"
        placeholder="Enter address"
        onChange={(e) => {
          setAddress(e.target.value);
        }}
      />
      <button onClick={sendether}>Send Ether</button>
      <br/>
    </div>
    </>
  );
};

export default App;
