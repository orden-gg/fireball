export const GOTCHI_VAULT_ABI = [{
    "anonymous": false,
    "inputs": [{"indexed": false, "internalType": "address", "name": "_owner", "type": "address"}, {
        "indexed": false,
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
    }, {"indexed": false, "internalType": "uint256", "name": "_lockPeriod", "type": "uint256"}, {
        "indexed": false,
        "internalType": "bool",
        "name": "_isLocked",
        "type": "bool"
    }],
    "name": "Lock",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
    }, {"indexed": true, "internalType": "address", "name": "newOwner", "type": "address"}],
    "name": "OwnershipTransferred",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "internalType": "address", "name": "_owner", "type": "address"}, {
        "indexed": false,
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
    }, {"indexed": false, "internalType": "bool", "name": "_isPaused", "type": "bool"}],
    "name": "Pause",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "internalType": "address", "name": "account", "type": "address"}],
    "name": "Paused",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "internalType": "address", "name": "account", "type": "address"}],
    "name": "Unpaused",
    "type": "event"
}, {
    "inputs": [{"internalType": "uint32[]", "name": "_tokenIds", "type": "uint32[]"}],
    "name": "addGotchiLending",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256[]", "name": "_tokenIds", "type": "uint256[]"}, {
        "internalType": "uint256",
        "name": "_guild",
        "type": "uint256"
    }], "name": "assignGuild", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{"internalType": "uint256[]", "name": "_tokenIds", "type": "uint256[]"}],
    "name": "batchCompoundEscrow",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256[]", "name": "_tokenIds", "type": "uint256[]"}, {
        "internalType": "address",
        "name": "_erc20Contract",
        "type": "address"
    }, {"internalType": "address", "name": "_recipient", "type": "address"}],
    "name": "batchTransferEscrow",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256[]", "name": "_tokenIds", "type": "uint256[]"}, {
        "internalType": "address",
        "name": "_erc20Contract",
        "type": "address"
    }], "name": "batchTransferEscrowToSender", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{"internalType": "uint32", "name": "_listingId", "type": "uint32"}],
    "name": "cancelGotchiLending",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint32[]", "name": "_erc721TokenIds", "type": "uint32[]"}],
    "name": "cancelGotchiLendingByToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint32[]", "name": "_tokenIds", "type": "uint32[]"}],
    "name": "claimAndEndGotchiLending",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint32[]", "name": "_tokenIds", "type": "uint32[]"}],
    "name": "claimGotchiLending",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "_tokenId", "type": "uint256"}],
    "name": "compoundEscrow",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "creator",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_tokenAddress", "type": "address"}, {
        "internalType": "uint256[]",
        "name": "_tokenId",
        "type": "uint256[]"
    }], "name": "depositERC721", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [],
    "name": "getCustomSettingsFee",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "getDefaultRentalSettings",
    "outputs": [{
        "components": [{
            "internalType": "bool",
            "name": "initialized",
            "type": "bool"
        }, {"internalType": "uint96", "name": "initialCost", "type": "uint96"}, {
            "internalType": "uint32",
            "name": "period",
            "type": "uint32"
        }, {"internalType": "uint8[3]", "name": "revenueSplit", "type": "uint8[3]"}, {
            "internalType": "address",
            "name": "thirdParty",
            "type": "address"
        }, {"internalType": "uint32", "name": "whitelistId", "type": "uint32"}, {
            "internalType": "address[]",
            "name": "revenueTokens",
            "type": "address[]"
        }], "internalType": "struct RentalSettings", "name": "", "type": "tuple"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_tokenAddress", "type": "address"}, {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
    }],
    "name": "getDepositor",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "_skip", "type": "uint256"}, {
        "internalType": "uint256",
        "name": "_end",
        "type": "uint256"
    }],
    "name": "getDepositors",
    "outputs": [{"internalType": "address[]", "name": "", "type": "address[]"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "getFee",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "getFee721",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "_tokenId", "type": "uint256"}], "name": "getGotchi", "outputs": [{
        "components": [{
            "internalType": "address",
            "name": "DepositorAddress",
            "type": "address"
        }, {"internalType": "uint256", "name": "tokenId", "type": "uint256"}, {
            "internalType": "uint256",
            "name": "timeCheckedOut",
            "type": "uint256"
        }, {"internalType": "bool", "name": "locked", "type": "bool"}, {
            "internalType": "uint256",
            "name": "lastLocked",
            "type": "uint256"
        }, {"internalType": "uint256", "name": "lockPeriod", "type": "uint256"}, {
            "internalType": "uint256",
            "name": "assignedGuild",
            "type": "uint256"
        }, {"internalType": "bool", "name": "pauseLending", "type": "bool"}, {
            "components": [{
                "internalType": "bool",
                "name": "initialized",
                "type": "bool"
            }, {"internalType": "uint96", "name": "initialCost", "type": "uint96"}, {
                "internalType": "uint32",
                "name": "period",
                "type": "uint32"
            }, {"internalType": "uint8[3]", "name": "revenueSplit", "type": "uint8[3]"}, {
                "internalType": "address",
                "name": "thirdParty",
                "type": "address"
            }, {"internalType": "uint32", "name": "whitelistId", "type": "uint32"}, {
                "internalType": "address[]",
                "name": "revenueTokens",
                "type": "address[]"
            }], "internalType": "struct RentalSettings", "name": "preferredSettings", "type": "tuple"
        }], "internalType": "struct Gotchi", "name": "", "type": "tuple"
    }], "stateMutability": "view", "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "_guild", "type": "uint256"}],
    "name": "getGuildSettings",
    "outputs": [{
        "components": [{
            "internalType": "bool",
            "name": "initialized",
            "type": "bool"
        }, {"internalType": "uint96", "name": "initialCost", "type": "uint96"}, {
            "internalType": "uint32",
            "name": "period",
            "type": "uint32"
        }, {"internalType": "uint8[3]", "name": "revenueSplit", "type": "uint8[3]"}, {
            "internalType": "address",
            "name": "thirdParty",
            "type": "address"
        }, {"internalType": "uint32", "name": "whitelistId", "type": "uint32"}, {
            "internalType": "address[]",
            "name": "revenueTokens",
            "type": "address[]"
        }], "internalType": "struct RentalSettings", "name": "", "type": "tuple"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "_tokenId", "type": "uint256"}],
    "name": "getRentalSettingsByTokenId",
    "outputs": [{
        "components": [{
            "internalType": "bool",
            "name": "initialized",
            "type": "bool"
        }, {"internalType": "uint96", "name": "initialCost", "type": "uint96"}, {
            "internalType": "uint32",
            "name": "period",
            "type": "uint32"
        }, {"internalType": "uint8[3]", "name": "revenueSplit", "type": "uint8[3]"}, {
            "internalType": "address",
            "name": "thirdParty",
            "type": "address"
        }, {"internalType": "uint32", "name": "whitelistId", "type": "uint32"}, {
            "internalType": "address[]",
            "name": "revenueTokens",
            "type": "address[]"
        }], "internalType": "struct RentalSettings", "name": "", "type": "tuple"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_depositor", "type": "address"}, {
        "internalType": "address",
        "name": "_tokenAddress",
        "type": "address"
    }],
    "name": "getTokenIdsOfDepositor",
    "outputs": [{"internalType": "uint256[]", "name": "", "type": "uint256[]"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_tokenAddress", "type": "address"}, {
        "internalType": "address",
        "name": "_user",
        "type": "address"
    }, {"internalType": "uint256", "name": "_tokenId", "type": "uint256"}],
    "name": "getTokenIndex",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "getTotalFees",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "_tokenId", "type": "uint256"}],
    "name": "getUserSettings",
    "outputs": [{
        "components": [{
            "internalType": "bool",
            "name": "initialized",
            "type": "bool"
        }, {"internalType": "uint96", "name": "initialCost", "type": "uint96"}, {
            "internalType": "uint32",
            "name": "period",
            "type": "uint32"
        }, {"internalType": "uint8[3]", "name": "revenueSplit", "type": "uint8[3]"}, {
            "internalType": "address",
            "name": "thirdParty",
            "type": "address"
        }, {"internalType": "uint32", "name": "whitelistId", "type": "uint32"}, {
            "internalType": "address[]",
            "name": "revenueTokens",
            "type": "address[]"
        }], "internalType": "struct RentalSettings", "name": "", "type": "tuple"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_contractOwner", "type": "address"}, {
        "internalType": "address",
        "name": "_vGHST",
        "type": "address"
    }, {"internalType": "uint256", "name": "_feeBP", "type": "uint256"}, {
        "internalType": "uint256",
        "name": "_fee721",
        "type": "uint256"
    }], "name": "initialize", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{"internalType": "uint256[]", "name": "_tokenIds", "type": "uint256[]"}],
    "name": "interact",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_user", "type": "address"}],
    "name": "isApproved",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "_tokenId", "type": "uint256"}],
    "name": "isLocked",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}, {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "_tokenId", "type": "uint256"}],
    "name": "isPaused",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256[]", "name": "_tokenIds", "type": "uint256[]"}, {
        "internalType": "bool",
        "name": "_lock",
        "type": "bool"
    }, {"internalType": "uint256", "name": "_lockPeriod", "type": "uint256"}],
    "name": "lockGotchis",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "_tokenId", "type": "uint256"}],
    "name": "lockTimeRemaining",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "_guild", "type": "uint256"}, {
        "internalType": "uint96",
        "name": "_initialCost",
        "type": "uint96"
    }, {"internalType": "uint32", "name": "_period", "type": "uint32"}, {
        "internalType": "uint8[3]",
        "name": "_revenueSplit",
        "type": "uint8[3]"
    }, {"internalType": "address", "name": "_thirdParty", "type": "address"}, {
        "internalType": "uint32",
        "name": "_whitelistId",
        "type": "uint32"
    }, {"internalType": "address[]", "name": "_revenueTokens", "type": "address[]"}],
    "name": "modifyGuildSettings",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "operator", "type": "address"}, {
        "internalType": "address",
        "name": "from",
        "type": "address"
    }, {"internalType": "uint256[]", "name": "ids", "type": "uint256[]"}, {
        "internalType": "uint256[]",
        "name": "values",
        "type": "uint256[]"
    }, {"internalType": "bytes", "name": "data", "type": "bytes"}],
    "name": "onERC1155BatchReceived",
    "outputs": [{"internalType": "bytes4", "name": "", "type": "bytes4"}],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_operator", "type": "address"}, {
        "internalType": "address",
        "name": "_from",
        "type": "address"
    }, {"internalType": "uint256", "name": "_id", "type": "uint256"}, {
        "internalType": "uint256",
        "name": "_value",
        "type": "uint256"
    }, {"internalType": "bytes", "name": "_data", "type": "bytes"}],
    "name": "onERC1155Received",
    "outputs": [{"internalType": "bytes4", "name": "", "type": "bytes4"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "", "type": "address"}, {
        "internalType": "address",
        "name": "",
        "type": "address"
    }, {"internalType": "uint256", "name": "", "type": "uint256"}, {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
    }],
    "name": "onERC721Received",
    "outputs": [{"internalType": "bytes4", "name": "", "type": "bytes4"}],
    "stateMutability": "pure",
    "type": "function"
}, {
    "inputs": [],
    "name": "owner",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "pause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256[]", "name": "_tokenIds", "type": "uint256[]"}, {
        "internalType": "bool",
        "name": "_pause",
        "type": "bool"
    }], "name": "pauseLending", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [],
    "name": "paused",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint32", "name": "_tokenId", "type": "uint32"}],
    "name": "readyToRent",
    "outputs": [{"internalType": "bool", "name": "_ready", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256[]", "name": "_tokenIds", "type": "uint256[]"}],
    "name": "resetToDefaultRentalSettings",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_tokenAddress", "type": "address"}, {
        "internalType": "address",
        "name": "_user",
        "type": "address"
    }], "name": "resetUserArray", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [],
    "name": "setApprovals",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_user", "type": "address"}, {
        "internalType": "bool",
        "name": "_approval",
        "type": "bool"
    }], "name": "setApproved", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "_newFee", "type": "uint256"}],
    "name": "setCustomSettingsFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint96", "name": "_initialCost", "type": "uint96"}, {
        "internalType": "uint32",
        "name": "_period",
        "type": "uint32"
    }, {"internalType": "uint8[3]", "name": "_revenueSplit", "type": "uint8[3]"}, {
        "internalType": "address",
        "name": "_thirdParty",
        "type": "address"
    }, {"internalType": "uint32", "name": "_whitelistId", "type": "uint32"}, {
        "internalType": "address[]",
        "name": "_revenueTokens",
        "type": "address[]"
    }], "name": "setDefaultRentalSettings", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "_newFeeBP", "type": "uint256"}],
    "name": "setFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "_newFee721", "type": "uint256"}],
    "name": "setFee721",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256[]", "name": "_tokenIds", "type": "uint256[]"}, {
        "internalType": "uint96",
        "name": "_initialCost",
        "type": "uint96"
    }, {"internalType": "uint32", "name": "_period", "type": "uint32"}, {
        "internalType": "uint8[3]",
        "name": "_revenueSplit",
        "type": "uint8[3]"
    }, {"internalType": "address", "name": "_thirdParty", "type": "address"}, {
        "internalType": "uint32",
        "name": "_whitelistId",
        "type": "uint32"
    }, {"internalType": "address[]", "name": "_revenueTokens", "type": "address[]"}],
    "name": "setRentalSettings",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "bytes4", "name": "_interfaceId", "type": "bytes4"}],
    "name": "supportsInterface",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "_tokenId", "type": "uint256"}, {
        "internalType": "address",
        "name": "_erc20Contract",
        "type": "address"
    }, {"internalType": "address", "name": "_recipient", "type": "address"}],
    "name": "transferAllEscrow",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_newContractCreator", "type": "address"}],
    "name": "transferCreator",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "_tokenId", "type": "uint256"}, {
        "internalType": "address",
        "name": "_erc20Contract",
        "type": "address"
    }, {"internalType": "address", "name": "_recipient", "type": "address"}, {
        "internalType": "uint256",
        "name": "_transferAmount",
        "type": "uint256"
    }], "name": "transferEscrow", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_newContractOwner", "type": "address"}],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "unpause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_tokenAddress", "type": "address"}, {
        "internalType": "uint256[]",
        "name": "_tokenId",
        "type": "uint256[]"
    }], "name": "withdrawERC721", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{"internalType": "address[]", "name": "_revenueTokens", "type": "address[]"}],
    "name": "withdrawProfits",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}]
