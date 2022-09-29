import logo from "./logo.svg";
import "./App.css";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import ContractABI from "./artifacts/contracts/Lottery.sol/Lottery.json";
import { lotteryContractAddress } from "./config";
import { useEffect, useState } from "react";

function App() {
    const [number, setNumber] = useState(-1);
    const [currentAddress, setCurrentAddress] = useState(null);

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum
                .request({ method: "eth_requestAccounts" })
                .then(async (res) => {
                    setCurrentAddress(res[0]);
                });
        }
    }, []);

    window.ethereum.on("accountsChanged", async function (accounts) {
        setCurrentAddress(accounts[0]);
    });

    const handleBuyClick = async () => {
        if (isNaN(number)) {
            alert("Please enter number !");
        } else if (!number) {
            alert("Enter amount");
        } else if (Number(number) > 99 || Number(number) < 0) {
            alert("Betting number from 00 -> 99");
        } else {
            const web3modal = new Web3Modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();

            const valueAmount = 0.1;

            let valuePass = ethers.utils.parseUnits(`${valueAmount}`, "ether");
            valuePass = valuePass.toString();

            let contract = new ethers.Contract(
                lotteryContractAddress,
                ContractABI.abi,
                signer
            );
            let transaction = await contract.play(number, {
                value: valuePass,
            });
            await transaction.wait();

            alert("Buy lottery successfully");
        }
    };

    return (
        <div className='App'>
            <div className='content'>
                <h1
                    style={{
                        color: "white",
                        fontSize: "100px",
                    }}
                >
                    Lottery game
                </h1>
                <h2
                    style={{
                        color: "white",
                    }}
                >
                    Hi {currentAddress}
                </h2>
                <br></br>
                <input
                    placeholder='Choose your number from 00 -> 99'
                    style={{
                        height: "30px",
                        width: "250px",
                    }}
                    onChange={(e) => setNumber(e.target.value)}
                ></input>
                <br></br>
                <button
                    style={{
                        height: "60px",
                        width: "120px",
                        background: "#4DC1BF",
                        borderRadius: "10px",
                        marginTop: "10px",
                        color: "white",
                        fontWeight: "bold",
                    }}
                    onClick={handleBuyClick}
                >
                    Buy lottery
                </button>
            </div>
        </div>
    );
}

export default App;
