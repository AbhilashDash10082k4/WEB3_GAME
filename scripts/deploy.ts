import console from 'console';
import {ethers} from 'hardhat';

//specifies metadata for the AVAXGods smart contract.
const _metadataUri = 'https://gateway.pinata.cloud/ipfs/https://gateway.pinata.cloud/ipfs/QmX2ubhtBPtYw75Wrpv6HLb1fhbJqxrnbhDo1RViW3oVoi';

//A helper function to deploy a contract by its name and constructor parameters, name == contract's name, params = additional parameters,  function handles the deployment logic, simplifying repetitive tasks.
async function deploy(name: string, ...params: [string]) {
    //creates a factory for deploying the SC
    const contractFactory = await ethers.getContractFactory(name);

    //contractFactory.deploy(...params) = deploys the SC using the ocnstructor parameters .then((f) => f.deployed()) == waits for contract to be deployed
    return await contractFactory.deploy(...params).then((f) => f.deployed());
}

//Deploying the AVAXGODS contract and log the address
//main() is the entry point that orchestrates the deployment.
async function main() {

    //account that will deploy the contract
    const [admin] = await ethers.getSigners();
  
    console.log(`Deploying a smart contract...`);

    //calling the deploy fn t deploy the contract
    //connect(admin) = ensures the contract is assoaciated with admin accnt
    const AVAXGods = (await deploy('AVAXGods', _metadataUri)).connect(admin);

    console.log({ AVAXGods: AVAXGods.address });
}

main()
  .then(() => process.exit(0))
    .catch((error) => {
    console.error(error)
    process.exit(1)
})