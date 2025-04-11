import React, { createContext, useState, useEffect } from "react";
import { BrowserProvider, Contract, parseEther } from "ethers";
import { contractABI, contractAddress } from "../utils/constants.js";

export const TransactionContext = createContext();

const getEthereumProvider = () => {
  if (!window.ethereum) {
    alert("Please install MetaMask.");
    throw new Error("Ethereum object not found.");
  }
  return new BrowserProvider(window.ethereum);
};

const createEthereumContract = async () => {
  const provider = getEthereumProvider();
  const signer = await provider.getSigner();
  return new Contract(contractAddress, contractABI, signer);
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount") || 0
  );

  const checkIfWalletIsConnected = async () => {
    try {
      const provider = getEthereumProvider();
      const accounts = await provider.send("eth_accounts", []);

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        console.log("Wallet connected:", accounts[0]);
      } else {
        console.log("No wallet connected.");
      }
    } catch (error) {
      console.error("Error checking wallet connection:", error);
    }
  };

  const connectWallet = async () => {
    try {
      const provider = getEthereumProvider();
      const accounts = await provider.send("eth_requestAccounts", []);
      setCurrentAccount(accounts[0]);
      console.log("Wallet connected:", accounts[0]);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const sendTransaction = async (addressTo, amount, keyword, message) => {
    try {
      const provider = getEthereumProvider();
      const transactionContract = await createEthereumContract();

      const parsedAmount = parseEther(amount.toString());

      await provider.send("eth_sendTransaction", [
        {
          from: currentAccount,
          to: addressTo,
          gas: "0x5208", // 21000 Gwei
          value: parsedAmount.toString(),
        },
      ]);

      const transactionHash = await transactionContract.addToBlockChain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );

      setIsLoading(true);
      console.log("Transaction in progress:", transactionHash.hash);

      await transactionHash.wait();
      setIsLoading(false);
      console.log("Transaction successful:", transactionHash.hash);

      const updatedTransactionCount = await transactionContract.getTransactionCount();
      setTransactionCount(updatedTransactionCount.toNumber());
    } catch (error) {
      console.error("Error sending transaction:", error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        sendTransaction,
        isLoading,
        transactionCount,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
