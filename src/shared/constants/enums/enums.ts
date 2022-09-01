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

export enum Erc1155NumberCategories {
    Wearable = 0,
    Consumable = 2,
    Ticket = 3,
    Realm = 4,
    Tile = 5
}

export enum ItemTypes {
    Name = 0,
    Description = 1,
    Author = 2,
    //! [WEARABLE ONLY] How much the wearable modifies each trait
    // [NRG, AGG, SPK, BRN, EYS, EYC]
    TraitModifiers = 3,
    //! [WEARABLE ONLY] The slots that this wearable can be added to
    // [body, face, eyes, head, R hand, L hand, pet, background, + 8 undefined slots]
    SlotPositions = 4,
    //! [WEARABLE ONLY] The collaterals this wearable can be equipped to. An empty array is "any"
    AllowedCollaterals = 5,
    Dimensions = 6, //? SVG x,y,width,height
    GhstPrice = 7, //? How much GHST this item costs
    MaxQuantity = 8, //? Total number that can be minted of this item
    TotalQuantity = 9, //? The total quantity of this item minted so far
    SvgId = 10,
    RarityScoreModifier = 11, //? Number from 1-50
    CanPurchaseWithGhst = 12,
    MinLevel = 13, //? The minimum Aavegotchi level required to use this item. Default is 1
    CanBeTransferred = 14,
    Category = 15, //? 0 is wearable, 1 is badge, 2 is consumable
    KinshipBonus = 16, //! [CONSUMABLE ONLY]
    ExperienceBonus = 17 //! [CONSUMABLE ONLY]
}

export enum ItemTypeNames {
    Wearable = 'wearable',
    Badge = 'badge',
    Consumable = 'consumable',
}

export enum SetTypes {
    Name = 0,
    AllowedCollaterals = 1,
    WearableIds = 2,
    TraitsBonuses = 3
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

export enum HauntIds {
    Haunt1 = '1',
    Haunt2 = '2'
}

export enum WearableTypes {
    Body = 0,
    Face = 1,
    Eyes = 2,
    Head = 3,
    RHand = 4,
    LHand = 5,
    Pet = 6,
    Background = 7
}

export enum Erc1155DimensionsNumberTypes {
    X = 0,
    Y = 1,
    WIDTH = 2,
    HEIGHT = 3
}

export enum TypenameType {
    ERC1155Listing = 'ERC1155Listing'
}

export enum GotchiTypes {
    Id = 0,
    Name = 1,
    NumericTraits = 5,
    modifiedNumericTraits = 6,
    EquippedWearables = 7,
    Collateral = 8,
    Owner = 9,
    StakedAmount = 10,
    MinimumStake = 11,
    Kinship = 12,
    Experience = 14,
    ToNextLevel = 15,
    UsedSkillPoints = 16,
    Level = 17,
    HauntId = 18,
    BaseRarityScore = 19,
    ModifiedRarityScore = 20,
    Inventory = 22
}
