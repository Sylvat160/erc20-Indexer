import React from 'react'
import { Flex, Button } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { useGlobalContext } from '../context';

const Header = () => {
  const { connectWallet, walletAddress, balance } = useGlobalContext();
  const shortenAddress = (address) => {
    // If the address is not defined, return null
    if (!address) return null;

    // Otherwise, return the shortened version of the address
    return `${address.slice(0, 10)}...${address.slice(-3)}`;
  };
  
  return (
    <div className="w-full px-10">
      <div className="w-full flex flex-row justify-between items-center h-16 ">
        <div className="flex flex-row items-center">
          <img src="/favicon.png" alt="logo" className="w-14 mr-2" />

          <hr className=" border-[0.1px] h-7 mr-2" />
          <span className="font-serif"> ERC-20 Token Indexer </span>
        </div>
        <div className="flex">
          {!walletAddress ? (
            <>
              <Button
                fontSize={20}
                mt={5}
                ml={5}
                onClick={connectWallet}
                bgColor="blue"
              >
                Connect Wallet
              </Button>
            </>
          ) : (
            <>
              <div className="bg-[#111111] p-1 rounded-md mx-2">
                {" "}
                {shortenAddress(walletAddress)}{" "}
              </div>
              <div className="bg-[#111111] p-1 rounded-md mx-2"> {balance} Eth</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header