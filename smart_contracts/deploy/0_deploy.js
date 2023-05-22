require("hardhat-deploy")
require("hardhat-deploy-ethers")

const { networkConfig } = require("../helper-hardhat-config")


const private_key = network.config.accounts[0]
const wallet = new ethers.Wallet(private_key, ethers.provider)

module.exports = async ({ deployments }) => {
    console.log("Wallet Ethereum Address:", wallet.address)
    
    //deploy DealClient
    // const DealClient = await ethers.getContractFactory('DealClient', wallet);
    // console.log('Deploying DealClient...');
    // const dc = await DealClient.deploy();
    // await dc.deployed()
    // console.log('DealClient deployed to:', dc.address);

    // const verifier = await ethers.getContractFactory('Verifier', wallet);
    // console.log('Deploying Verifier...');
    // const vf = await verifier.deploy();
    // await vf.deployed()
    // console.log('Verifier deployed to:', vf.address);

}