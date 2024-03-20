import { useState } from 'react';
import { ethers } from 'ethers';

function WalletBalance() {

    const [balance, setBalance] = useState();
    
    const getBalance = async () => {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const balance = await provider.getBalance(account);
        console.log(balance);
        setBalance(ethers.formatEther(balance));
    };
  
    return (
      <div style={{display:'flex', justifyContent: 'center', alignItems: 'center'}}>
          <div style={{marginRight:'15px'}}><h2 >Your Balance : {balance}</h2></div>
          <div><button onClick={() => getBalance()}>Show My Balance</button></div>
      </div>
    );
  };
  
  export default WalletBalance;