export const TILES_ABI = [
    {
        inputs: [
            { internalType: 'address', name: '_owner', type: 'address' },
            { internalType: 'uint256', name: '_id', type: 'uint256' }
        ],
        name: 'balanceOf',
        outputs: [{ internalType: 'uint256', name: 'bal_', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            { internalType: 'address[]', name: '_owners', type: 'address[]' },
            { internalType: 'uint256[]', name: '_ids', type: 'uint256[]' }
        ],
        name: 'balanceOfBatch',
        outputs: [{ internalType: 'uint256[]', name: 'bals', type: 'uint256[]' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            { internalType: 'address', name: 'account', type: 'address' },
            { internalType: 'address', name: 'operator', type: 'address' }
        ],
        name: 'isApprovedForAll',
        outputs: [{ internalType: 'bool', name: 'operators_', type: 'bool' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            { internalType: 'address', name: '_from', type: 'address' },
            { internalType: 'address', name: '_to', type: 'address' },
            { internalType: 'uint256[]', name: '_ids', type: 'uint256[]' },
            { internalType: 'uint256[]', name: '_values', type: 'uint256[]' },
            { internalType: 'bytes', name: '_data', type: 'bytes' }
        ],
        name: 'safeBatchTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            { internalType: 'address', name: '_from', type: 'address' },
            { internalType: 'address', name: '_to', type: 'address' },
            { internalType: 'uint256', name: '_id', type: 'uint256' },
            { internalType: 'uint256', name: '_value', type: 'uint256' },
            { internalType: 'bytes', name: '_data', type: 'bytes' }
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            { internalType: 'address', name: '_operator', type: 'address' },
            { internalType: 'bool', name: '_approved', type: 'bool' }
        ],
        name: 'setApprovalForAll',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    { inputs: [{ internalType: 'string', name: '_value', type: 'string' }], name: 'setBaseURI', outputs: [], stateMutability: 'nonpayable', type: 'function' },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'uint256', name: '_queueId', type: 'uint256' },
            { indexed: true, internalType: 'uint256', name: '_tileId', type: 'uint256' },
            { indexed: false, internalType: 'uint256', name: '_readyBlock', type: 'uint256' },
            { indexed: false, internalType: 'address', name: '_sender', type: 'address' }
        ],
        name: 'AddedToQueue',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            { indexed: false, internalType: 'address', name: '_aavegotchiDiamond', type: 'address' },
            { indexed: false, internalType: 'address', name: '_realmDiamond', type: 'address' },
            { indexed: false, internalType: 'address', name: '_gltr', type: 'address' }
        ],
        name: 'AddressesUpdated',
        type: 'event'
    },
    { anonymous: false, inputs: [{ indexed: true, internalType: 'uint256', name: '_queueId', type: 'uint256' }], name: 'QueueClaimed', type: 'event' },
    {
        inputs: [
            {
                components: [
                    { internalType: 'uint8', name: 'width', type: 'uint8' },
                    { internalType: 'uint8', name: 'height', type: 'uint8' },
                    { internalType: 'bool', name: 'deprecated', type: 'bool' },
                    { internalType: 'uint16', name: 'tileType', type: 'uint16' },
                    { internalType: 'uint32', name: 'craftTime', type: 'uint32' },
                    { internalType: 'uint256[4]', name: 'alchemicaCost', type: 'uint256[4]' },
                    { internalType: 'string', name: 'name', type: 'string' }
                ],
                internalType: 'struct TileType[]',
                name: '_tileTypes',
                type: 'tuple[]'
            }
        ],
        name: 'addTileTypes',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            { internalType: 'address', name: '_tokenContract', type: 'address' },
            { internalType: 'uint256', name: '_tokenId', type: 'uint256' },
            { internalType: 'uint256', name: '_id', type: 'uint256' }
        ],
        name: 'balanceOfToken',
        outputs: [{ internalType: 'uint256', name: 'value', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function'
    },
    { inputs: [{ internalType: 'uint256[]', name: '_queueIds', type: 'uint256[]' }], name: 'claimTiles', outputs: [], stateMutability: 'nonpayable', type: 'function' },
    { inputs: [{ internalType: 'uint16[]', name: '_tileTypes', type: 'uint16[]' }], name: 'craftTiles', outputs: [], stateMutability: 'nonpayable', type: 'function' },
    { inputs: [{ internalType: 'uint256[]', name: '_tileIds', type: 'uint256[]' }], name: 'deprecateTiles', outputs: [], stateMutability: 'nonpayable', type: 'function' },
    {
        inputs: [
            { internalType: 'uint256', name: '_typeId', type: 'uint256' },
            {
                components: [
                    { internalType: 'uint8', name: 'width', type: 'uint8' },
                    { internalType: 'uint8', name: 'height', type: 'uint8' },
                    { internalType: 'bool', name: 'deprecated', type: 'bool' },
                    { internalType: 'uint16', name: 'tileType', type: 'uint16' },
                    { internalType: 'uint32', name: 'craftTime', type: 'uint32' },
                    { internalType: 'uint256[4]', name: 'alchemicaCost', type: 'uint256[4]' },
                    { internalType: 'string', name: 'name', type: 'string' }
                ],
                internalType: 'struct TileType',
                name: '_tileType',
                type: 'tuple'
            }
        ],
        name: 'editTileType',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'address', name: '_owner', type: 'address' }],
        name: 'getCraftQueue',
        outputs: [
            {
                components: [
                    { internalType: 'uint256', name: 'id', type: 'uint256' },
                    { internalType: 'uint40', name: 'readyBlock', type: 'uint40' },
                    { internalType: 'uint16', name: 'tileType', type: 'uint16' },
                    { internalType: 'bool', name: 'claimed', type: 'bool' },
                    { internalType: 'address', name: 'owner', type: 'address' }
                ],
                internalType: 'struct QueueItem[]',
                name: 'output_',
                type: 'tuple[]'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'uint256', name: '_tileTypeId', type: 'uint256' }],
        name: 'getTileType',
        outputs: [
            {
                components: [
                    { internalType: 'uint8', name: 'width', type: 'uint8' },
                    { internalType: 'uint8', name: 'height', type: 'uint8' },
                    { internalType: 'bool', name: 'deprecated', type: 'bool' },
                    { internalType: 'uint16', name: 'tileType', type: 'uint16' },
                    { internalType: 'uint32', name: 'craftTime', type: 'uint32' },
                    { internalType: 'uint256[4]', name: 'alchemicaCost', type: 'uint256[4]' },
                    { internalType: 'string', name: 'name', type: 'string' }
                ],
                internalType: 'struct TileType',
                name: 'tileType',
                type: 'tuple'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'uint256[]', name: '_tileTypeIds', type: 'uint256[]' }],
        name: 'getTileTypes',
        outputs: [
            {
                components: [
                    { internalType: 'uint8', name: 'width', type: 'uint8' },
                    { internalType: 'uint8', name: 'height', type: 'uint8' },
                    { internalType: 'bool', name: 'deprecated', type: 'bool' },
                    { internalType: 'uint16', name: 'tileType', type: 'uint16' },
                    { internalType: 'uint32', name: 'craftTime', type: 'uint32' },
                    { internalType: 'uint256[4]', name: 'alchemicaCost', type: 'uint256[4]' },
                    { internalType: 'string', name: 'name', type: 'string' }
                ],
                internalType: 'struct TileType[]',
                name: 'tileTypes_',
                type: 'tuple[]'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            { internalType: 'address', name: '_aavegotchiDiamond', type: 'address' },
            { internalType: 'address', name: '_realmDiamond', type: 'address' },
            { internalType: 'address', name: '_gltr', type: 'address' },
            { internalType: 'address', name: '_pixelcraft', type: 'address' },
            { internalType: 'address', name: '_aavegotchiDAO', type: 'address' }
        ],
        name: 'setAddresses',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'address', name: '_account', type: 'address' }],
        name: 'tilesBalances',
        outputs: [
            {
                components: [
                    { internalType: 'uint256', name: 'tileId', type: 'uint256' },
                    { internalType: 'uint256', name: 'balance', type: 'uint256' }
                ],
                internalType: 'struct TileFacet.TileIdIO[]',
                name: 'bals_',
                type: 'tuple[]'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'address', name: '_owner', type: 'address' }],
        name: 'tilesBalancesWithTypes',
        outputs: [
            {
                components: [
                    { internalType: 'uint256', name: 'balance', type: 'uint256' },
                    { internalType: 'uint256', name: 'itemId', type: 'uint256' },
                    {
                        components: [
                            { internalType: 'uint8', name: 'width', type: 'uint8' },
                            { internalType: 'uint8', name: 'height', type: 'uint8' },
                            { internalType: 'bool', name: 'deprecated', type: 'bool' },
                            { internalType: 'uint16', name: 'tileType', type: 'uint16' },
                            { internalType: 'uint32', name: 'craftTime', type: 'uint32' },
                            { internalType: 'uint256[4]', name: 'alchemicaCost', type: 'uint256[4]' },
                            { internalType: 'string', name: 'name', type: 'string' }
                        ],
                        internalType: 'struct TileType',
                        name: 'tileType',
                        type: 'tuple'
                    }
                ],
                internalType: 'struct TileFacet.ItemTypeIO[]',
                name: 'output_',
                type: 'tuple[]'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        anonymous: false,
        inputs: [
            {
                components: [
                    { internalType: 'address', name: 'facetAddress', type: 'address' },
                    { internalType: 'enum IDiamondCut.FacetCutAction', name: 'action', type: 'uint8' },
                    { internalType: 'bytes4[]', name: 'functionSelectors', type: 'bytes4[]' }
                ],
                indexed: false,
                internalType: 'struct IDiamondCut.FacetCut[]',
                name: '_diamondCut',
                type: 'tuple[]'
            },
            { indexed: false, internalType: 'address', name: '_init', type: 'address' },
            { indexed: false, internalType: 'bytes', name: '_calldata', type: 'bytes' }
        ],
        name: 'DiamondCut',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'address', name: '_toContract', type: 'address' },
            { indexed: true, internalType: 'uint256', name: '_toTokenId', type: 'uint256' },
            { indexed: true, internalType: 'uint256', name: '_tokenTypeId', type: 'uint256' },
            { indexed: false, internalType: 'uint256', name: '_value', type: 'uint256' }
        ],
        name: 'TransferToParent',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'address', name: '_operator', type: 'address' },
            { indexed: true, internalType: 'address', name: '_from', type: 'address' },
            { indexed: true, internalType: 'address', name: '_to', type: 'address' },
            { indexed: false, internalType: 'uint256[]', name: '_ids', type: 'uint256[]' },
            { indexed: false, internalType: 'uint256[]', name: '_values', type: 'uint256[]' }
        ],
        name: 'TransferBatch',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'address', name: '_owner', type: 'address' },
            { indexed: true, internalType: 'address', name: '_approved', type: 'address' },
            { indexed: true, internalType: 'uint256', name: '_tokenId', type: 'uint256' }
        ],
        name: 'Approval',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'address', name: 'previousOwner', type: 'address' },
            { indexed: true, internalType: 'address', name: 'newOwner', type: 'address' }
        ],
        name: 'OwnershipTransferred',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'address', name: '_owner', type: 'address' },
            { indexed: true, internalType: 'uint256', name: '_installationType', type: 'uint256' },
            { indexed: false, internalType: 'uint256', name: '_installationId', type: 'uint256' }
        ],
        name: 'MintInstallation',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'address', name: '_fromContract', type: 'address' },
            { indexed: true, internalType: 'uint256', name: '_fromTokenId', type: 'uint256' },
            { indexed: true, internalType: 'uint256', name: '_tokenTypeId', type: 'uint256' },
            { indexed: false, internalType: 'uint256', name: '_value', type: 'uint256' }
        ],
        name: 'TransferFromParent',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'address', name: '_owner', type: 'address' },
            { indexed: true, internalType: 'address', name: '_operator', type: 'address' },
            { indexed: false, internalType: 'bool', name: '_approved', type: 'bool' }
        ],
        name: 'ApprovalForAll',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'address', name: '_owner', type: 'address' },
            { indexed: true, internalType: 'uint256', name: '_tileType', type: 'uint256' },
            { indexed: false, internalType: 'uint256', name: '_tileId', type: 'uint256' }
        ],
        name: 'MintTile',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'address', name: '_operator', type: 'address' },
            { indexed: true, internalType: 'address', name: '_from', type: 'address' },
            { indexed: true, internalType: 'address', name: '_to', type: 'address' },
            { indexed: false, internalType: 'uint256', name: '_id', type: 'uint256' },
            { indexed: false, internalType: 'uint256', name: '_value', type: 'uint256' }
        ],
        name: 'TransferSingle',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            { indexed: false, internalType: 'string', name: '_value', type: 'string' },
            { indexed: true, internalType: 'uint256', name: '_tokenId', type: 'uint256' }
        ],
        name: 'URI',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'address', name: '_owner', type: 'address' },
            { indexed: true, internalType: 'uint256', name: '_tokenId', type: 'uint256' }
        ],
        name: 'MintParcel',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'address', name: '_from', type: 'address' },
            { indexed: true, internalType: 'address', name: '_to', type: 'address' },
            { indexed: true, internalType: 'uint256', name: '_tokenId', type: 'uint256' }
        ],
        name: 'Transfer',
        type: 'event'
    }
];