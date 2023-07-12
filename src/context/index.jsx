import React, {
  useState,
  useContext,
  createContext,
  useRef,
  useEffect,
} from "react";
import { ethers } from "ethers";
import { Alchemy } from "alchemy-sdk";
const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [showAlert, setShowAlert] = useState({
    status: false,
    type: "info",
    message: "",
  });
  const [walletAddress, setWalletAddress] = useState();
  const [signer, setSigner] = useState(null);
  const [provider, setProvider] = useState(null);
  const [balance, setBalance] = useState(0);
  const alchemy = new Alchemy();

  const getBalance = async (address) => {
    const data = await alchemy.core.getTokenBalances(address);
    setBalance(parseInt(data.tokenBalances[0].tokenBalance, 16));
  };

  const connectWallet = async () => {
    // First make sure we have access to window.ethereum
    if (!window.ethereum) {
      // Request account access if needed
      alert("Please install MetaMask first.");
    }
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setWalletAddress(address);
    setSigner(signer);
    setProvider(provider);
    getBalance(address);
  };
  

  useEffect(() => {
    const resolveENSName = async (ensName) => {
      const address = await provider.getResolver(ensName);
      return address;
    };
    resolveENSName("vitalik.eth");
  },[walletAddress])

  

  return (
    <GlobalContext.Provider
      value={{
        showAlert,
        setShowAlert,
        connectWallet,
        walletAddress,
        balance,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
