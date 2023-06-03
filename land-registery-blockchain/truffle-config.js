module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
	compilers: {
    solc: {
      version: "0.8.0", // Solidity compiler version
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
        evmVersion: "istanbul",
        // Add experimental features here
        evmVersion: "istanbul",
      },
    },
	},
}