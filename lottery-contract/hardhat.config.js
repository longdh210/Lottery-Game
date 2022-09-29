require("@nomicfoundation/hardhat-toolbox");
const key = require("./key.json");

module.exports = {
    defaultNetwork: "goerli",
    networks: {
        hardhat: {
            chainId: 1337,
        },
        goerli: {
            url: "https://eth-goerli.g.alchemy.com/v2/BAexJjh839qZdzF1_CxPlqcd3WRQexU9",
            accounts: [key.PRIVATE_KEY],
        },
    },
    etherscan: {
        apiKey: key.API_KEY,
    },
    solidity: "0.8.4",
};
