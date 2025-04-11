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
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount") || 0
  );
  const [transactions, setTransactions] = useState([]);

  const getAllTransactions = async () => {
    try {
      const transactionContract = await createEthereumContract();
      const availableTransactions =
        await transactionContract.getAllTransactions();

      const structuredTransactions = availableTransactions.map(
        (transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(
            Number(transaction.timestamp) * 1000
          ).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: Number(transaction.amount) / 10 ** 18,
        })
      );

      setTransactions(structuredTransactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      const provider = getEthereumProvider();
      const accounts = await provider.send("eth_accounts", []);

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        await getAllTransactions();
      } else {
        console.log("No wallet connected.");
      }
    } catch (error) {
      console.error("Error checking wallet connection:", error);
    }
  };

  const checkIfTransactionsExist = async () => {
    try {
      const transactionContract = await createEthereumContract();
      const currentTransactionCount =
        await transactionContract.getTransactionCount();
      localStorage.setItem("transactionCount", currentTransactionCount);
    } catch (error) {
      console.error("Error checking transactions:", error);
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
      if (!currentAccount) throw new Error("No wallet connected.");

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

      const transactionHash = await transactionContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );
      console.log("Transaction in progress:", transactionHash.hash);

      await transactionHash.wait();
      console.log("Transaction successful:", transactionHash.hash);

      const updatedTransactionCount =
        await transactionContract.getTransactionCount();
      setTransactionCount(Number(updatedTransactionCount));
    } catch (error) {
      console.error("Error sending transaction:", error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfTransactionsExist();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        sendTransaction,
        transactionCount,
        transactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
