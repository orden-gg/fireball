const INSTALLATIONS_ABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "facetAddress",
              "type": "address"
            },
            {
              "internalType": "enum IDiamondCut.FacetCutAction",
              "name": "action",
              "type": "uint8"
            },
            {
              "internalType": "bytes4[]",
              "name": "functionSelectors",
              "type": "bytes4[]"
            }
          ],
          "indexed": false,
          "internalType": "struct IDiamondCut.FacetCut[]",
          "name": "_diamondCut",
          "type": "tuple[]"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_init",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bytes",
          "name": "_calldata",
          "type": "bytes"
        }
      ],
      "name": "DiamondCut",
      "type": "event"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "facetAddress",
              "type": "address"
            },
            {
              "internalType": "enum IDiamondCut.FacetCutAction",
              "name": "action",
              "type": "uint8"
            },
            {
              "internalType": "bytes4[]",
              "name": "functionSelectors",
              "type": "bytes4[]"
            }
          ],
          "internalType": "struct IDiamondCut.FacetCut[]",
          "name": "_diamondCut",
          "type": "tuple[]"
        },
        {
          "internalType": "address",
          "name": "_init",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "_calldata",
          "type": "bytes"
        }
      ],
      "name": "diamondCut",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "_functionSelector",
          "type": "bytes4"
        }
      ],
      "name": "facetAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "facetAddress_",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "facetAddresses",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "facetAddresses_",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_facet",
          "type": "address"
        }
      ],
      "name": "facetFunctionSelectors",
      "outputs": [
        {
          "internalType": "bytes4[]",
          "name": "_facetFunctionSelectors",
          "type": "bytes4[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "facets",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "facetAddress",
              "type": "address"
            },
            {
              "internalType": "bytes4[]",
              "name": "functionSelectors",
              "type": "bytes4[]"
            }
          ],
          "internalType": "struct IDiamondLoupe.Facet[]",
          "name": "facets_",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "_interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "owner_",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
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
          "indexed": true,
          "internalType": "uint256",
          "name": "_installationId",
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
          "name": "_blocksReduced",
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
          "internalType": "uint256",
          "name": "_realmId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_coordinateX",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_coordinateY",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "blockInitiated",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "readyBlock",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "installationId",
          "type": "uint256"
        }
      ],
      "name": "UpgradeInitiated",
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
          "indexed": true,
          "internalType": "uint256",
          "name": "_realmId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_coordinateX",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_coordinateY",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_blocksReduced",
          "type": "uint256"
        }
      ],
      "name": "UpgradeTimeReduced",
      "type": "event"
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
          "internalType": "uint16[]",
          "name": "_installationTypes",
          "type": "uint16[]"
        },
        {
          "internalType": "uint40[]",
          "name": "_gltr",
          "type": "uint40[]"
        }
      ],
      "name": "craftInstallations",
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
          "name": "_realmId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_installationId",
          "type": "uint256"
        }
      ],
      "name": "equipInstallation",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllUpgradeQueue",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "uint16",
              "name": "coordinateX",
              "type": "uint16"
            },
            {
              "internalType": "uint16",
              "name": "coordinateY",
              "type": "uint16"
            },
            {
              "internalType": "uint40",
              "name": "readyBlock",
              "type": "uint40"
            },
            {
              "internalType": "bool",
              "name": "claimed",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "parcelId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "installationId",
              "type": "uint256"
            }
          ],
          "internalType": "struct UpgradeQueue[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_altarId",
          "type": "uint256"
        }
      ],
      "name": "getAltarLevel",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "altarLevel_",
          "type": "uint256"
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
      "name": "getCraftQueue",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "uint16",
              "name": "installationType",
              "type": "uint16"
            },
            {
              "internalType": "bool",
              "name": "claimed",
              "type": "bool"
            },
            {
              "internalType": "uint40",
              "name": "readyBlock",
              "type": "uint40"
            },
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            }
          ],
          "internalType": "struct QueueItem[]",
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
              "internalType": "uint8",
              "name": "width",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "height",
              "type": "uint8"
            },
            {
              "internalType": "uint16",
              "name": "installationType",
              "type": "uint16"
            },
            {
              "internalType": "uint8",
              "name": "level",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "alchemicaType",
              "type": "uint8"
            },
            {
              "internalType": "uint32",
              "name": "spillRadius",
              "type": "uint32"
            },
            {
              "internalType": "uint16",
              "name": "spillRate",
              "type": "uint16"
            },
            {
              "internalType": "uint8",
              "name": "upgradeQueueBoost",
              "type": "uint8"
            },
            {
              "internalType": "uint32",
              "name": "craftTime",
              "type": "uint32"
            },
            {
              "internalType": "uint32",
              "name": "nextLevelId",
              "type": "uint32"
            },
            {
              "internalType": "bool",
              "name": "deprecated",
              "type": "bool"
            },
            {
              "internalType": "uint256[4]",
              "name": "alchemicaCost",
              "type": "uint256[4]"
            },
            {
              "internalType": "uint256",
              "name": "harvestRate",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "capacity",
              "type": "uint256"
            },
            {
              "internalType": "uint256[]",
              "name": "prerequisites",
              "type": "uint256[]"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
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
              "internalType": "uint8",
              "name": "width",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "height",
              "type": "uint8"
            },
            {
              "internalType": "uint16",
              "name": "installationType",
              "type": "uint16"
            },
            {
              "internalType": "uint8",
              "name": "level",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "alchemicaType",
              "type": "uint8"
            },
            {
              "internalType": "uint32",
              "name": "spillRadius",
              "type": "uint32"
            },
            {
              "internalType": "uint16",
              "name": "spillRate",
              "type": "uint16"
            },
            {
              "internalType": "uint8",
              "name": "upgradeQueueBoost",
              "type": "uint8"
            },
            {
              "internalType": "uint32",
              "name": "craftTime",
              "type": "uint32"
            },
            {
              "internalType": "uint32",
              "name": "nextLevelId",
              "type": "uint32"
            },
            {
              "internalType": "bool",
              "name": "deprecated",
              "type": "bool"
            },
            {
              "internalType": "uint256[4]",
              "name": "alchemicaCost",
              "type": "uint256[4]"
            },
            {
              "internalType": "uint256",
              "name": "harvestRate",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "capacity",
              "type": "uint256"
            },
            {
              "internalType": "uint256[]",
              "name": "prerequisites",
              "type": "uint256[]"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
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
          "internalType": "uint256",
          "name": "_installationId",
          "type": "uint256"
        }
      ],
      "name": "getLodgeLevel",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "lodgeLevel_",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_installationId",
          "type": "uint256"
        }
      ],
      "name": "getReservoirCapacity",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "capacity_",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_installationId",
          "type": "uint256"
        }
      ],
      "name": "getReservoirStats",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "spillRate",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "spillRadius",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "capacity",
              "type": "uint256"
            }
          ],
          "internalType": "struct InstallationFacet.ReservoirStats",
          "name": "reservoirStats_",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_queueId",
          "type": "uint256"
        }
      ],
      "name": "getUpgradeQueueId",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "uint16",
              "name": "coordinateX",
              "type": "uint16"
            },
            {
              "internalType": "uint16",
              "name": "coordinateY",
              "type": "uint16"
            },
            {
              "internalType": "uint40",
              "name": "readyBlock",
              "type": "uint40"
            },
            {
              "internalType": "bool",
              "name": "claimed",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "parcelId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "installationId",
              "type": "uint256"
            }
          ],
          "internalType": "struct UpgradeQueue",
          "name": "",
          "type": "tuple"
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
      "name": "getUserUpgradeQueue",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "uint16",
              "name": "coordinateX",
              "type": "uint16"
            },
            {
              "internalType": "uint16",
              "name": "coordinateY",
              "type": "uint16"
            },
            {
              "internalType": "uint40",
              "name": "readyBlock",
              "type": "uint40"
            },
            {
              "internalType": "bool",
              "name": "claimed",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "parcelId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "installationId",
              "type": "uint256"
            }
          ],
          "internalType": "struct UpgradeQueue[]",
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
        },
        {
          "internalType": "uint256[]",
          "name": "_ids",
          "type": "uint256[]"
        }
      ],
      "name": "installationBalancesOfTokenByIds",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
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
                  "internalType": "uint8",
                  "name": "width",
                  "type": "uint8"
                },
                {
                  "internalType": "uint8",
                  "name": "height",
                  "type": "uint8"
                },
                {
                  "internalType": "uint16",
                  "name": "installationType",
                  "type": "uint16"
                },
                {
                  "internalType": "uint8",
                  "name": "level",
                  "type": "uint8"
                },
                {
                  "internalType": "uint8",
                  "name": "alchemicaType",
                  "type": "uint8"
                },
                {
                  "internalType": "uint32",
                  "name": "spillRadius",
                  "type": "uint32"
                },
                {
                  "internalType": "uint16",
                  "name": "spillRate",
                  "type": "uint16"
                },
                {
                  "internalType": "uint8",
                  "name": "upgradeQueueBoost",
                  "type": "uint8"
                },
                {
                  "internalType": "uint32",
                  "name": "craftTime",
                  "type": "uint32"
                },
                {
                  "internalType": "uint32",
                  "name": "nextLevelId",
                  "type": "uint32"
                },
                {
                  "internalType": "bool",
                  "name": "deprecated",
                  "type": "bool"
                },
                {
                  "internalType": "uint256[4]",
                  "name": "alchemicaCost",
                  "type": "uint256[4]"
                },
                {
                  "internalType": "uint256",
                  "name": "harvestRate",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "capacity",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256[]",
                  "name": "prerequisites",
                  "type": "uint256[]"
                },
                {
                  "internalType": "string",
                  "name": "name",
                  "type": "string"
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
                  "internalType": "uint8",
                  "name": "width",
                  "type": "uint8"
                },
                {
                  "internalType": "uint8",
                  "name": "height",
                  "type": "uint8"
                },
                {
                  "internalType": "uint16",
                  "name": "installationType",
                  "type": "uint16"
                },
                {
                  "internalType": "uint8",
                  "name": "level",
                  "type": "uint8"
                },
                {
                  "internalType": "uint8",
                  "name": "alchemicaType",
                  "type": "uint8"
                },
                {
                  "internalType": "uint32",
                  "name": "spillRadius",
                  "type": "uint32"
                },
                {
                  "internalType": "uint16",
                  "name": "spillRate",
                  "type": "uint16"
                },
                {
                  "internalType": "uint8",
                  "name": "upgradeQueueBoost",
                  "type": "uint8"
                },
                {
                  "internalType": "uint32",
                  "name": "craftTime",
                  "type": "uint32"
                },
                {
                  "internalType": "uint32",
                  "name": "nextLevelId",
                  "type": "uint32"
                },
                {
                  "internalType": "bool",
                  "name": "deprecated",
                  "type": "bool"
                },
                {
                  "internalType": "uint256[4]",
                  "name": "alchemicaCost",
                  "type": "uint256[4]"
                },
                {
                  "internalType": "uint256",
                  "name": "harvestRate",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "capacity",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256[]",
                  "name": "prerequisites",
                  "type": "uint256[]"
                },
                {
                  "internalType": "string",
                  "name": "name",
                  "type": "string"
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
          "internalType": "uint40[]",
          "name": "_amounts",
          "type": "uint40[]"
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
          "internalType": "uint256",
          "name": "_queueId",
          "type": "uint256"
        },
        {
          "internalType": "uint40",
          "name": "_amount",
          "type": "uint40"
        }
      ],
      "name": "reduceUpgradeTime",
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
      "name": "spilloverRateAndRadiusOfId",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_realmId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_installationId",
          "type": "uint256"
        }
      ],
      "name": "unequipInstallation",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "uint16",
              "name": "coordinateX",
              "type": "uint16"
            },
            {
              "internalType": "uint16",
              "name": "coordinateY",
              "type": "uint16"
            },
            {
              "internalType": "uint40",
              "name": "readyBlock",
              "type": "uint40"
            },
            {
              "internalType": "bool",
              "name": "claimed",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "parcelId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "installationId",
              "type": "uint256"
            }
          ],
          "internalType": "struct UpgradeQueue",
          "name": "_upgradeQueue",
          "type": "tuple"
        },
        {
          "internalType": "bytes",
          "name": "_signature",
          "type": "bytes"
        },
        {
          "internalType": "uint40",
          "name": "_gltr",
          "type": "uint40"
        }
      ],
      "name": "upgradeInstallation",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "_aavegotchiDiamond",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_realmDiamond",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_gltr",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_pixelcraft",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_aavegotchiDAO",
          "type": "address"
        }
      ],
      "name": "AddressesUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "_aavegotchiDiamond",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_realmDiamond",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_gltr",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_pixelcraft",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_aavegotchiDAO",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bytes",
          "name": "_backendPubKey",
          "type": "bytes"
        }
      ],
      "name": "AddressesUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "_realmId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_coordinateX",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_coordinateY",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_newInstallationId",
          "type": "uint256"
        }
      ],
      "name": "UpgradeFinalized",
      "type": "event"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "uint8",
              "name": "width",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "height",
              "type": "uint8"
            },
            {
              "internalType": "uint16",
              "name": "installationType",
              "type": "uint16"
            },
            {
              "internalType": "uint8",
              "name": "level",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "alchemicaType",
              "type": "uint8"
            },
            {
              "internalType": "uint32",
              "name": "spillRadius",
              "type": "uint32"
            },
            {
              "internalType": "uint16",
              "name": "spillRate",
              "type": "uint16"
            },
            {
              "internalType": "uint8",
              "name": "upgradeQueueBoost",
              "type": "uint8"
            },
            {
              "internalType": "uint32",
              "name": "craftTime",
              "type": "uint32"
            },
            {
              "internalType": "uint32",
              "name": "nextLevelId",
              "type": "uint32"
            },
            {
              "internalType": "bool",
              "name": "deprecated",
              "type": "bool"
            },
            {
              "internalType": "uint256[4]",
              "name": "alchemicaCost",
              "type": "uint256[4]"
            },
            {
              "internalType": "uint256",
              "name": "harvestRate",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "capacity",
              "type": "uint256"
            },
            {
              "internalType": "uint256[]",
              "name": "prerequisites",
              "type": "uint256[]"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
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
          "internalType": "uint256[]",
          "name": "_installationIds",
          "type": "uint256[]"
        }
      ],
      "name": "deprecateInstallations",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_typeId",
          "type": "uint256"
        },
        {
          "internalType": "uint40",
          "name": "_deprecateTime",
          "type": "uint40"
        }
      ],
      "name": "editDeprecateTime",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256[]",
          "name": "_ids",
          "type": "uint256[]"
        },
        {
          "components": [
            {
              "internalType": "uint8",
              "name": "width",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "height",
              "type": "uint8"
            },
            {
              "internalType": "uint16",
              "name": "installationType",
              "type": "uint16"
            },
            {
              "internalType": "uint8",
              "name": "level",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "alchemicaType",
              "type": "uint8"
            },
            {
              "internalType": "uint32",
              "name": "spillRadius",
              "type": "uint32"
            },
            {
              "internalType": "uint16",
              "name": "spillRate",
              "type": "uint16"
            },
            {
              "internalType": "uint8",
              "name": "upgradeQueueBoost",
              "type": "uint8"
            },
            {
              "internalType": "uint32",
              "name": "craftTime",
              "type": "uint32"
            },
            {
              "internalType": "uint32",
              "name": "nextLevelId",
              "type": "uint32"
            },
            {
              "internalType": "bool",
              "name": "deprecated",
              "type": "bool"
            },
            {
              "internalType": "uint256[4]",
              "name": "alchemicaCost",
              "type": "uint256[4]"
            },
            {
              "internalType": "uint256",
              "name": "harvestRate",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "capacity",
              "type": "uint256"
            },
            {
              "internalType": "uint256[]",
              "name": "prerequisites",
              "type": "uint256[]"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            }
          ],
          "internalType": "struct InstallationType[]",
          "name": "_installationTypes",
          "type": "tuple[]"
        }
      ],
      "name": "editInstallationTypes",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "finalizeUpgrade",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_aavegotchiDiamond",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_realmDiamond",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_gltr",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_pixelcraft",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_aavegotchiDAO",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "_backendPubKey",
          "type": "bytes"
        }
      ],
      "name": "setAddresses",
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
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
      "outputs": [
        {
          "internalType": "bool",
          "name": "operators_",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256[]",
          "name": "_ids",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256[]",
          "name": "_values",
          "type": "uint256[]"
        },
        {
          "internalType": "bytes",
          "name": "_data",
          "type": "bytes"
        }
      ],
      "name": "safeBatchTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_value",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "_data",
          "type": "bytes"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_operator",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "_approved",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
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
