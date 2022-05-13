const INSTALLATIONS_ABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "_queueId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "_installationType",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_readyBlock",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "_sender",
                "type": "address"
            }
        ],
        "name": "AddedToQueue",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "_queueId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_blocks",
                "type": "uint256"
            }
        ],
        "name": "CraftTimeReduced",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "_queueId",
                "type": "uint256"
            }
        ],
        "name": "QueueClaimed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "_toContract",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "_toTokenId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "_tokenTypeId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "TransferToParent",
        "type": "event"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint16",
                        "name": "installationType",
                        "type": "uint16"
                    },
                    {
                        "internalType": "uint16",
                        "name": "level",
                        "type": "uint16"
                    },
                    {
                        "internalType": "uint256",
                        "name": "width",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "height",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint16",
                        "name": "alchemicaType",
                        "type": "uint16"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "alchemicaCost",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "installationsVars",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "craftTime",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct InstallationType[]",
                "name": "_installationTypes",
                "type": "tuple[]"
            }
        ],
        "name": "addInstallationTypes",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "bal_",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address[]",
                "name": "_owners",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "_ids",
                "type": "uint256[]"
            }
        ],
        "name": "balanceOfBatch",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "bals",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_tokenContract",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "balanceOfToken",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256[]",
                "name": "_queueIds",
                "type": "uint256[]"
            }
        ],
        "name": "claimInstallations",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256[]",
                "name": "_installationTypes",
                "type": "uint256[]"
            }
        ],
        "name": "craftInstallations",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAlchemicaAddresses",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_installationTypeId",
                "type": "uint256"
            }
        ],
        "name": "getInstallationType",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint16",
                        "name": "installationType",
                        "type": "uint16"
                    },
                    {
                        "internalType": "uint16",
                        "name": "level",
                        "type": "uint16"
                    },
                    {
                        "internalType": "uint256",
                        "name": "width",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "height",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint16",
                        "name": "alchemicaType",
                        "type": "uint16"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "alchemicaCost",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "installationsVars",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "craftTime",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct InstallationType",
                "name": "installationType",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256[]",
                "name": "_installationTypeIds",
                "type": "uint256[]"
            }
        ],
        "name": "getInstallationTypes",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint16",
                        "name": "installationType",
                        "type": "uint16"
                    },
                    {
                        "internalType": "uint16",
                        "name": "level",
                        "type": "uint16"
                    },
                    {
                        "internalType": "uint256",
                        "name": "width",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "height",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint16",
                        "name": "alchemicaType",
                        "type": "uint16"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "alchemicaCost",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "installationsVars",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "craftTime",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct InstallationType[]",
                "name": "installationTypes_",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_tokenContract",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
            }
        ],
        "name": "installationBalancesOfToken",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "installationId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "balance",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct InstallationFacet.InstallationIdIO[]",
                "name": "bals_",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_tokenContract",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
            }
        ],
        "name": "installationBalancesOfTokenWithTypes",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "balance",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "itemId",
                        "type": "uint256"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint16",
                                "name": "installationType",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint16",
                                "name": "level",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint256",
                                "name": "width",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "height",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint16",
                                "name": "alchemicaType",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint256[]",
                                "name": "alchemicaCost",
                                "type": "uint256[]"
                            },
                            {
                                "internalType": "uint256[]",
                                "name": "installationsVars",
                                "type": "uint256[]"
                            },
                            {
                                "internalType": "uint256",
                                "name": "craftTime",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct InstallationType",
                        "name": "installationType",
                        "type": "tuple"
                    }
                ],
                "internalType": "struct ItemTypeIO[]",
                "name": "installationBalancesOfTokenWithTypes_",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_account",
                "type": "address"
            }
        ],
        "name": "installationsBalances",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "installationId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "balance",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct InstallationFacet.InstallationIdIO[]",
                "name": "bals_",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "installationsBalancesWithTypes",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "balance",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "itemId",
                        "type": "uint256"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint16",
                                "name": "installationType",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint16",
                                "name": "level",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint256",
                                "name": "width",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "height",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint16",
                                "name": "alchemicaType",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint256[]",
                                "name": "alchemicaCost",
                                "type": "uint256[]"
                            },
                            {
                                "internalType": "uint256[]",
                                "name": "installationsVars",
                                "type": "uint256[]"
                            },
                            {
                                "internalType": "uint256",
                                "name": "craftTime",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct InstallationType",
                        "name": "installationType",
                        "type": "tuple"
                    }
                ],
                "internalType": "struct ItemTypeIO[]",
                "name": "output_",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256[]",
                "name": "_queueIds",
                "type": "uint256[]"
            },
            {
                "internalType": "uint256[]",
                "name": "_amounts",
                "type": "uint256[]"
            }
        ],
        "name": "reduceCraftTime",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address[]",
                "name": "_addresses",
                "type": "address[]"
            }
        ],
        "name": "setAlchemicaAddresses",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_value",
                "type": "string"
            }
        ],
        "name": "setBaseURI",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "uri",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

export default INSTALLATIONS_ABI;
