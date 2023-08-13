const { network } = require("hardhat")
const {
    networkConfig,
    developmentChains,
    DECIMALS,
    INITIAL_ANSWER,
} = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    // getpricefeed
    if (developmentChains.includes(network.name)) {
        log("Local network detected! Deploying mocks ...")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            //to get args we should check github or node modulus and serach which arguments are passed in the consturtor
            args: [DECIMALS, INITIAL_ANSWER],
        })
        log("Mocks deployed!")
        log("--------------------------------------")
    }
}
module.exports.tags = ["all", "mocks"]
