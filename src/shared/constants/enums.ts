export enum ListingTypes {
    ClosedPortal = 'erc721Listings-0',
    OpenedPortal = 'erc721Listings-2',
    Aavegotchi = 'erc721Listings-3',
    Wearable = 'erc1155Listings-0',
    Consumable = 'erc1155Listings-2',
    Tickets = 'erc1155Listings-3',
    Realm = 'erc721Listings-4',
    All = 'all',
    Activity = 'activity',
    Listing = 'listing',
    Sold = 'sold',
    Purchased = 'purchased'
}

export enum BaazaarFilteringTypes {
    Name = 'name',
    Id = 'id',
    Stats = 'stats'
}

export enum Erc721Categories {
    ClosedPortal = '0',
    OpenedPortal = '2',
    Aavegotchi = '3'
}

export enum Erc1155Categories {
    Wearable = '0',
    Consumable = '2',
    Ticket = '3',
    Realm = '4',
    Tile = '5'
}

export enum InstallationTypes {
    Width = 0,
    Height = 1,
    Type = 2,
    Level = 3,
    AlchemicaType = 4,
    SpillRadius = 5,
    SpillRate = 6,
    UpgradeQueueBoost = 7,
    CraftTime = 8,
    NextLevelId = 9,
    Deprecated = 10,
    AlchemicaCost = 11,
    HarvestRate = 12,
    Capacity = 13,
    Prerequisites = 14,
    Name = 15
}

export enum InstallationTypeNames {
    Altar = 'altar',
    Harvester = 'harvester',
    Reservoir = 'reservoir',
    GotchiLodge = 'gotchi lodge',
    Wall = 'wall',
    NFTDisplay = 'NFT display',
    BuildqueueBooster = 'buildqueue booster',
    Decoration = 'decoration'
}

export enum TileTypes {
    Width = 0,
    Height = 1,
    Deprecated = 2,
    Type = 3,
    CraftTime = 4,
    AlchemicaCost = 5,
    Name = 6
}

export enum TokenTypes {
    Fud = 'fud',
    Fomo = 'fomo',
    Alpha = 'alpha',
    Kek = 'kek',
    Gltr = 'gltr',
    Ghst = 'ghst'
}

export enum CountdownFormatNonZeroType {
    Y = 'y',
    MM = 'M',
    D = 'd',
    H = 'h',
    M = 'm',
    S = 's'
}

export enum CountdownFormatZeroType {
    Y = 'yy',
    MM = 'MM',
    D = 'dd',
    H = 'hh',
    M = 'mm',
    S = 'ss'
}

export enum RarityTypes {
    Godlike = 'godlike',
    Mythical = 'mythical',
    Legendary = 'legendary',
    Rare = 'rare',
    Uncommon = 'uncommon',
    Common = 'common',
    Drop = 'drop'
}

export enum DataReloadType {
    Client = 'client',
    Lend = 'lend',
    Map = 'map',
    Explorer = 'explorer'
}
