const hre = require("hardhat");
const fs = require("fs");
const { ethers } = require("hardhat");

async function main() {
    const Lottery = await hre.ethers.getContractFactory("Lottery");
    const lottery = await Lottery.deploy();

    await lottery.deployed();

    await lottery.startNewBid();

    console.log(`Lottery contact deployed to ${lottery.address}`);

    fs.writeFileSync(
        "./config.js",
        `const lotteryContractAddress = "${lottery.address}";
        module.exports = {lotteryContractAddress};
      `
    );
    fs.writeFileSync(
        "../lottery-ui/src/config.js",
        `export const lotteryContractAddress = "${lottery.address}"`
    );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
