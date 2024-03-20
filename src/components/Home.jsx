import WalletBalance from './WalletBalance';
import { useEffect, useState } from 'react';

import { ethers } from 'ethers';
import mintopia from '../artifacts/contracts/mintopia.sol/mintopia.json';

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
// const contractAddress = '0x2a3bEFfbaE1A8DF307d653BBfe8E0d7579864667';



const provider = new ethers.BrowserProvider(window.ethereum);

// get the end user
const signer = await provider.getSigner();

// get the smart contract
const contract = new ethers.Contract(contractAddress, mintopia.abi, signer);


function Home() {

    const [totalMinted, setTotalMinted] = useState(0);
    useEffect(() => {
        getCount();
    }, []);

    const getCount = async () => {
        console.log("ABOUT TO CALL COUNT");
        const count = await contract.count();
        // const count = 1;
        console.log("the count is ",parseInt(count));
        setTotalMinted(parseInt(count));
    };

    return (
<div style={{ display: 'flex', flexWrap: 'wrap',justifyContent:'space-between'}}>
    <div style={{width: '100%'}}><WalletBalance /></div>
    

    {Array(totalMinted + 1)
        .fill(1)
        .map((_, i) => (
            <div key={i} style={{ flex: '0 0 auto', margin: '40px', width: '230px' }}>
                <NFTImage tokenId={i} getCount={getCount} />
            </div>
        ))}
</div>
    );
}

function NFTImage({ tokenId, getCount }) {
    const contentId = 'QmRVUVKA1qPWButmtZs658rX4akZUEHqihEHK1p6fKtAPJ';
    const metadataURI = `${contentId}/${tokenId}.json`;
    const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/${tokenId}.png`;

    const [isMinted, setIsMinted] = useState(false);
    useEffect(() => {
        getMintedStatus();
    }, [isMinted]);

    const getMintedStatus = async () => {
        console.log("ABOUT TO CALL ISCONTENT OWNED");
        const result = await contract.isContentOwned(metadataURI);
        contract.isContentOwned
        console.log(result)
        setIsMinted(result);
    };

    const mintToken = async () => {
        const connection = contract.connect(signer);
        const addr = signer.getAddress(); //retunrs the address
        console.log("calling the payToMint");
        const result = await contract.payToMint(addr, metadataURI, {
            value: ethers.parseEther('0.05'),
        });
        console.log("awaiting result");
        await result.wait();
        console.log("got the result");
        getMintedStatus();
        getCount();
    };

    async function getURI() {
        const uri = await contract.tokenURI(tokenId);
        alert(uri);
    }
    return (
        <div>
            <img src={isMinted ? `NFTS/${tokenId}.png` : 'img/placeholder.png'} style={{ maxWidth: '100%', height: 'auto' }} />
            <h5>ID #{tokenId}</h5>
            {!isMinted ? (
                <button onClick={mintToken}>
                    Mint
                </button>
            ) : (
                <button onClick={getURI}>
                    Taken! Show URI
                </button>
            )}
        </div>
    );
}

export default Home;