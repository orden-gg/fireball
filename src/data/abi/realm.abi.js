export const REALM_ABI = [
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
      "inputs": [
        {
          "internalType": "address",
          "name": "_approved",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "approve",
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
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "balance_",
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
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "getApproved",
      "outputs": [
        {
          "internalType": "address",
          "name": "approved_",
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
          "name": "_owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
      "outputs": [
        {
          "internalType": "bool",
          "name": "approved_",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "ownerOf",
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
          "name": "_tokenIds",
          "type": "uint256[]"
        },
        {
          "internalType": "bytes",
          "name": "_data",
          "type": "bytes"
        }
      ],
      "name": "safeBatchTransfer",
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
          "name": "_tokenId",
          "type": "uint256"
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
          "name": "_tokenId",
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
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_index",
          "type": "uint256"
        }
      ],
      "name": "tokenByIndex",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "tokenId_",
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
      "name": "tokenIdsOfOwner",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "tokenIds_",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "tokenURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
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
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
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
        }
      ],
      "name": "AavegotchiDiamondUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_realmId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_installationId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_x",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_y",
          "type": "uint256"
        }
      ],
      "name": "EquipInstallation",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_realmId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_tileId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_x",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_y",
          "type": "uint256"
        }
      ],
      "name": "EquipTile",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_realmId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_prevInstallationId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_nextInstallationId",
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
        }
      ],
      "name": "InstallationUpgraded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_realmId",
          "type": "uint256"
        }
      ],
      "name": "ResyncParcel",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_realmId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_installationId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_x",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_y",
          "type": "uint256"
        }
      ],
      "name": "UnequipInstallation",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_realmId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_tileId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_x",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_y",
          "type": "uint256"
        }
      ],
      "name": "UnequipTile",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_realmId",
          "type": "uint256"
        }
      ],
      "name": "addUpgradeQueueLength",
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
          "name": "_district",
          "type": "uint256"
        }
      ],
      "name": "batchGetDistrictParcels",
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
          "internalType": "uint256[]",
          "name": "_parcelIds",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256",
          "name": "_gridType",
          "type": "uint256"
        }
      ],
      "name": "batchGetGrid",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256[64][64]",
              "name": "coords",
              "type": "uint256[64][64]"
            }
          ],
          "internalType": "struct RealmFacet.ParcelCoordinates[]",
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
          "name": "_realmId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_coordinateX",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_coordinateY",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_installationId",
          "type": "uint256"
        }
      ],
      "name": "checkCoordinates",
      "outputs": [],
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
        },
        {
          "internalType": "uint256",
          "name": "_x",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_y",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "_signature",
          "type": "bytes"
        }
      ],
      "name": "equipInstallation",
      "outputs": [],
      "stateMutability": "nonpayable",
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
          "name": "_tileId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_x",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_y",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "_signature",
          "type": "bytes"
        }
      ],
      "name": "equipTile",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_parcelId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_gridType",
          "type": "uint256"
        }
      ],
      "name": "getHumbleGrid",
      "outputs": [
        {
          "internalType": "uint256[8][8]",
          "name": "output_",
          "type": "uint256[8][8]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_parcelId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_gridType",
          "type": "uint256"
        }
      ],
      "name": "getPaartnerGrid",
      "outputs": [
        {
          "internalType": "uint256[64][64]",
          "name": "output_",
          "type": "uint256[64][64]"
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
        }
      ],
      "name": "getParcelInfo",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "parcelId",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "parcelAddress",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "coordinateX",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "coordinateY",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "size",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "district",
              "type": "uint256"
            },
            {
              "internalType": "uint256[4]",
              "name": "boost",
              "type": "uint256[4]"
            },
            {
              "internalType": "uint256",
              "name": "timeRemainingToClaim",
              "type": "uint256"
            }
          ],
          "internalType": "struct RealmFacet.ParcelOutput",
          "name": "output_",
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
          "name": "_parcelId",
          "type": "uint256"
        }
      ],
      "name": "getParcelUpgradeQueueCapacity",
      "outputs": [
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
          "name": "_parcelId",
          "type": "uint256"
        }
      ],
      "name": "getParcelUpgradeQueueLength",
      "outputs": [
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
          "internalType": "uint256[]",
          "name": "_parcelIds",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256[]",
          "name": "_actionRights",
          "type": "uint256[]"
        }
      ],
      "name": "getParcelsAccessRights",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "output_",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_parcelId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_gridType",
          "type": "uint256"
        }
      ],
      "name": "getReasonableGrid",
      "outputs": [
        {
          "internalType": "uint256[16][16]",
          "name": "output_",
          "type": "uint256[16][16]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_parcelId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_gridType",
          "type": "uint256"
        }
      ],
      "name": "getSpaciousHorizontalGrid",
      "outputs": [
        {
          "internalType": "uint256[64][32]",
          "name": "output_",
          "type": "uint256[64][32]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_parcelId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_gridType",
          "type": "uint256"
        }
      ],
      "name": "getSpaciousVerticalGrid",
      "outputs": [
        {
          "internalType": "uint256[32][64]",
          "name": "output_",
          "type": "uint256[32][64]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "maxSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256[]",
          "name": "_tokenIds",
          "type": "uint256[]"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "coordinateX",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "coordinateY",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "district",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "parcelId",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "parcelAddress",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "size",
              "type": "uint256"
            },
            {
              "internalType": "uint256[4]",
              "name": "boost",
              "type": "uint256[4]"
            }
          ],
          "internalType": "struct RealmFacet.MintParcelInput[]",
          "name": "_metadata",
          "type": "tuple[]"
        }
      ],
      "name": "mintParcels",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256[]",
          "name": "_tokenIds",
          "type": "uint256[]"
        }
      ],
      "name": "resyncParcel",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bool",
          "name": "_gameActive",
          "type": "bool"
        }
      ],
      "name": "setGameActive",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256[]",
          "name": "_realmIds",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256[]",
          "name": "_actionRights",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256[]",
          "name": "_accessRights",
          "type": "uint256[]"
        }
      ],
      "name": "setParcelsAccessRights",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_realmId",
          "type": "uint256"
        }
      ],
      "name": "subUpgradeQueueLength",
      "outputs": [],
      "stateMutability": "nonpayable",
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
        },
        {
          "internalType": "uint256",
          "name": "_x",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_y",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "_signature",
          "type": "bytes"
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
          "internalType": "uint256",
          "name": "_realmId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_tileId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_x",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_y",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "_signature",
          "type": "bytes"
        }
      ],
      "name": "unequipTile",
      "outputs": [],
      "stateMutability": "nonpayable",
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
          "name": "_prevInstallationId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_nextInstallationId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_coordinateX",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_coordinateY",
          "type": "uint256"
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
          "indexed": true,
          "internalType": "uint256",
          "name": "_realmId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "_gotchiId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "_alchemicaType",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_spilloverRate",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_spilloverRadius",
          "type": "uint256"
        }
      ],
      "name": "AlchemicaClaimed",
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
          "indexed": true,
          "internalType": "uint256",
          "name": "_gotchiId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256[4]",
          "name": "_alchemica",
          "type": "uint256[4]"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_spilloverRate",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_spilloverRadius",
          "type": "uint256"
        }
      ],
      "name": "ChannelAlchemica",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "_gotchiId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "_alchemica",
          "type": "uint256[]"
        }
      ],
      "name": "ExitAlchemica",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "_newRound",
          "type": "uint256"
        }
      ],
      "name": "SurveyingRoundProgressed",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "_targets",
          "type": "address[]"
        },
        {
          "internalType": "uint256[4][]",
          "name": "_amounts",
          "type": "uint256[4][]"
        }
      ],
      "name": "batchTransferAlchemica",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256[]",
          "name": "_gotchiIds",
          "type": "uint256[]"
        },
        {
          "internalType": "address[]",
          "name": "_tokenAddresses",
          "type": "address[]"
        },
        {
          "internalType": "uint256[][]",
          "name": "_amounts",
          "type": "uint256[][]"
        }
      ],
      "name": "batchTransferTokensToGotchis",
      "outputs": [],
      "stateMutability": "nonpayable",
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
          "name": "_alchemicaType",
          "type": "uint256"
        }
      ],
      "name": "calculateSpilloverForReservoir",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "rate",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "radius",
              "type": "uint256"
            }
          ],
          "internalType": "struct AlchemicaFacet.SpilloverIO",
          "name": "spillover_",
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
          "name": "_realmId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_gotchiId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_lastChanneled",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "_signature",
          "type": "bytes"
        }
      ],
      "name": "channelAlchemica",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAlchemicaAddresses",
      "outputs": [
        {
          "internalType": "address[4]",
          "name": "",
          "type": "address[4]"
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
        }
      ],
      "name": "getAvailableAlchemica",
      "outputs": [
        {
          "internalType": "uint256[4]",
          "name": "_availableAlchemica",
          "type": "uint256[4]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_gotchiId",
          "type": "uint256"
        }
      ],
      "name": "getLastChanneled",
      "outputs": [
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
          "name": "_parcelId",
          "type": "uint256"
        }
      ],
      "name": "getParcelLastChanneled",
      "outputs": [
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
        }
      ],
      "name": "getRealmAlchemica",
      "outputs": [
        {
          "internalType": "uint256[4]",
          "name": "",
          "type": "uint256[4]"
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
          "name": "_roundId",
          "type": "uint256"
        }
      ],
      "name": "getRoundAlchemica",
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
          "internalType": "uint256",
          "name": "_realmId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_roundId",
          "type": "uint256"
        }
      ],
      "name": "getRoundBaseAlchemica",
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
      "inputs": [],
      "name": "getTotalAlchemicas",
      "outputs": [
        {
          "internalType": "uint256[4][5]",
          "name": "",
          "type": "uint256[4][5]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256[]",
          "name": "_altarLevel",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256[]",
          "name": "_limits",
          "type": "uint256[]"
        }
      ],
      "name": "setChannelingLimits",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256[4][5]",
          "name": "_alchemicas",
          "type": "uint256[4][5]"
        },
        {
          "internalType": "uint256[4]",
          "name": "_boostMultipliers",
          "type": "uint256[4]"
        },
        {
          "internalType": "uint256[4]",
          "name": "_greatPortalCapacity",
          "type": "uint256[4]"
        },
        {
          "internalType": "address",
          "name": "_installationsDiamond",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_vrfCoordinator",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_linkAddress",
          "type": "address"
        },
        {
          "internalType": "address[4]",
          "name": "_alchemicaAddresses",
          "type": "address[4]"
        },
        {
          "internalType": "address",
          "name": "_gltrAddress",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "_backendPubKey",
          "type": "bytes"
        },
        {
          "internalType": "address",
          "name": "_gameManager",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_tileDiamond",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_aavegotchiDiamond",
          "type": "address"
        }
      ],
      "name": "setVars",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
];
